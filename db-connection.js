const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
const conString = "mongodb+srv://root:root@cluster0-ixdh5.mongodb.net/test?retryWrites=true&w=majority";
const connect = mongoose.connect(conString, { useNewUrlParser: true });
//connect.db.dropCollection('thechats', function(err, result) {});
module.exports = connect;

