import React, {Fragment} from "react";
import ModalWindow from "./components/ModalWindow";
import UserList from "./components/UserList";
import History from "./components/History";
import OtherMessage from "./components/OtherMessage";
import OwnMessage from "./components/OwnMessage";

const dateFormat = require('dateformat');

const Body = (props) => {
    const {isSuccessEntry, history, name, message, usersList} = props.data;
    if (isSuccessEntry) {
        return (
            <Fragment>
                <div className="body__history history" onScroll={props.actions.loadHistory}>
                    <History>
                        {history.map(item => {
                                if (item.nickname == name) {
                                    return (<OwnMessage item={item}/>)
                                } else {
                                    return (<OtherMessage item={item}/>)
                                }
                            }
                        )}
                    </History>
                    <div className="history__footer footer">
                        <div className="footer__field field">
                            <textarea
                                className="field__input"
                                placeholder="Введите сообщение"
                                maxLength="500"
                                value={message}
                                onChange={(e) => {
                                    props.actions.setMessage(e.target.value)
                                }}
                            >
                            </textarea>
                            <div className="field__button" title="Отправить" onClick={() => {
                                props.actions.sendMessage(props.actions.addMessageToHistory);
                                props.actions.setMessage("");
                            }}></div>
                        </div>
                    </div>
                </div>
                <UserList data={props.data}>
                    {usersList.map(item => (
                        <div className="container-for-item">
                            <div className="container-for-item__image-for-list">{item[0]}</div>
                            <span className="container-for-item__user-id-text">{item}</span>
                        </div>)
                    )}
                </UserList>
            </Fragment>
        );
    } else {
        return (
            <ModalWindow data={props.data} actions={props.actions}/>
        )
    }
};

export default Body;



