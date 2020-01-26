const connect = require("./db-connection");
const Model = require("./models");
const Chat = Model.Chat;
const Users = Model.Users;

const port = process.env.PORT || 3001;
const session = require('express-session');
const express = require("express");
const requestIp = require('request-ip');
const WebSocket = require("ws");
const passwordHash = require('password-hash');

const app = express();
const server = require("http").Server(app);
const wss = new WebSocket.Server({server});
const jsonParser = express.json();

server.listen(port);
app.use(express.static('./build'));

let onlineUsers = [];

app.use(session({
    secret: '7djh347dkkhs98fjk21f',
    maxAge: new Date(Date.now() + 3600000),
    expires: new Date(Date.now() + 3600000),
    resave: true,
    saveUninitialized: true,
}));

setInterval(function () {
    const data = {
        forList: true,
        users: onlineUsers.sort(),
    };

    wss.clients.forEach(client => {
        client.send(JSON.stringify(data));
    });

}, 5100);

wss.on("connection", (ws, request, response) => {
    const clientIp = requestIp.getClientIp(request);
    ws.onclose = () => {
        console.log("user disconnected");
    };

    ws.on("message", function (msg) {
        msg = JSON.parse(msg);
        const nickname = msg.nickname;
        const chatMessage = new Chat({
            message: msg.message,
            userIp: clientIp,
            nickname: nickname,
            createdAt: msg.createdAt
        });

        chatMessage.save();
        console.log(chatMessage);

        wss.clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(chatMessage));
                console.log(chatMessage)
            }
        });

        console.log("message: " + msg);
        connect.then(db => {
            console.log("connected to the db");

            Chat.find({}, function (err, docs) {
                if (err) return console.log(err);
            });
        });
    });
});

app.post("/name", jsonParser, function (request, response) {
    if (!request.body) return response.sendStatus(400);
    if (isSessionInvalid(request)) {
        return response.sendStatus(403);
    }

    if (onlineUsers.indexOf(request.body.name) == -1) {
        onlineUsers.push(request.body.name);
        response.send({status: "added"})
    } else {
        response.send({status: "cancel"})
    }
});

app.get("/history", jsonParser, function (request, response) {
    if (!request.body) return response.sendStatus(400);
    if (isSessionInvalid(request)) {
        return response.sendStatus(403);
    }
    console.log("your ses req iss auth" + request.session.userId);
    Chat.find({}, null, {sort: 'createdAt'}, function (err, docs) {
        if (err) return console.log(err);
        response.send(JSON.stringify({
            docs: docs.slice(docs.length - 50, docs.length),
            ip: requestIp.getClientIp(request)
        }));
    });
});

app.post("/change-name", jsonParser, function (request, response) {
    if (!request.body) return response.sendStatus(400);
    if (isSessionInvalid(request, request.body.oldNickname)) {
        return response.sendStatus(403);
    }
    Users.find({nickname: request.body.newNickname}, function (err, docs) {
        if (docs.length != 0) {
            response.send(JSON.stringify({
                status: false,
                name: request.body.newNickname
            }));
        } else {
            Users.find({nickname: request.body.oldNickname}, function (err, docs) {
                if (err) return console.log(err);
                if (docs.length == 0) {
                    response.send(JSON.stringify({
                        status: false,
                        name: request.body.newNickname
                    }));
                } else {
                    Users.updateMany({nickname: request.body.oldNickname}, {nickname: request.body.newNickname}, function (err, docs) {
                        if (err) return console.log(err);
                    });
                    Chat.updateMany({nickname: request.body.oldNickname}, {nickname: request.body.newNickname}, function (err, docs) {
                        if (err) return console.log(err);
                    });

                    const id = onlineUsers.indexOf(request.body.oldNickname);
                    if(id != -1){
                        onlineUsers[id] = request.body.newNickname;
                    }
                    response.send(JSON.stringify({
                        status: true,
                        name: request.body.newNickname
                    }));
                }
            })
        }
    });
});

app.post('/signup-user', jsonParser, function (request, response) {
    const user = new Users({
        nickname: request.body.nickname,
        password: passwordHash.generate(request.body.password)
    });
    Users.find({nickname: request.body.nickname}, async function (err, docs) {
        if (err) return console.log(err);
        if (docs.length > 0) {
            response.send(JSON.stringify({
                status: false,
                nickname: request.body.nickname,
                error: 'user exists',
            }));
        } else {
            const savedUser = await user.save();
            request.session.userId = savedUser._id;
            response.send(JSON.stringify({
                status: true,
                nickname: request.body.nickname,
                password: request.body.password
            }));
        }
    });
});

app.post("/load-history", jsonParser, function (request, response) {
    if (!request.body) return response.sendStatus(400);
    if (isSessionInvalid(request)) {
        return response.sendStatus(403);
    }

    Chat.find({}, null, {sort: 'createdAt'}, function (err, docs) {
        if (err) return console.log(err);
        const counter = request.body.count;
        response.send(JSON.stringify({
            docs: docs.slice(docs.length - 50 * counter, docs.length - 50 * (counter - 1)),
            ip: requestIp.getClientIp(request)
        }));
    });
});

app.post('/authenticate-user', jsonParser, function (request, response) {
    Users.find({nickname: request.body.nickname}, function (err, docs) {
        if (err) return console.log(err);
        if (docs.length == 0) {
            response.send(JSON.stringify({
                status: false,
                name: request.body.nickname,
            }));
        } else {
            if (passwordHash.verify(request.body.password, docs[0].password)) {
                request.session.userId = docs[0]._id;
                response.send(JSON.stringify({
                    status: true,
                    nickname: request.body.nickname,
                    password: request.body.password
                }));
            } else {
                response.send(JSON.stringify({
                    status: false,
                    name: request.body.nickname,
                    message: 'invalid password',
                }));
            }
        }
    })
});

function isSessionInvalid(request, requestBodyNickname) {
    if (!request.session.userId) {
        return true;
    } else if (requestBodyNickname) {
        Users.find({nickname: requestBodyNickname}, function (err, docs) {
            if (!docs || docs.length === 0 || !docs[0] || docs[0]._id !== request.session.userId) {
                return true;
            }
        });
    }
    return false;
}