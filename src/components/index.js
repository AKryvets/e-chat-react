import './style.less';
import Header from './Header/Header';
import React, {Component} from "react";
import Model from "./Model";
import Body from "./Body/Body";
import ModalChangeName from "./Body/components/ModalChangeName";
import Actions from "./Actions";
import Overlay from "./Body/components/Overlay";

class Containers extends Component {
    constructor(props) {
        super(props);
        this.state = new Model();
        this.actions = new Actions();


        this.auth = this.actions.auth.bind(this);
        this.signUp = this.actions.signUp.bind(this);
        this.setName = this.actions.setName.bind(this);
        this.setCount = this.actions.setCount.bind(this);
        this.openEntry = this.actions.openEntry.bind(this);
        this.setNewName = this.actions.setNewName.bind(this);
        this.getHistory = this.actions.getHistory.bind(this);
        this.changeName = this.actions.changeName.bind(this);
        this.setMessage = this.actions.setMessage.bind(this);
        this.sendMessage = this.actions.sendMessage.bind(this);
        this.loadHistory = this.actions.loadHistory.bind(this);
        this.setPassword = this.actions.setPassword.bind(this);
        this.setUsersList = this.actions.setUsersList.bind(this);
        this.setErrorEntry = this.actions.setErrorEntry.bind(this);
        this.setErrorChange = this.actions.setErrorChange.bind(this);
        this.toggleUserList = this.actions.toggleUserList.bind(this);
        this.setSuccessEntry = this.actions.setSuccessEntry.bind(this);
        this.openRegistration = this.actions.openRegistration.bind(this);
        this.toggleModalChange = this.actions.toggleModalChange.bind(this);
        this.addMessageToHistory = this.actions.addMessageToHistory.bind(this);

        this.state.ws.onmessage = response => {
            try {
                const data = JSON.parse(response.data);
                if (data._id) {
                    this.addMessageToHistory(JSON.parse(response.data));
                }

                if (data.forList) {
                    this.setUsersList(data.users);
                    this.setCount(data.users.length);
                }
            } catch (e) {
                console.log("Ошибка: " + e)
            }
        };

    }

    render() {
        const {logoName, ...data} = this.state;
        const actions = {
            auth: this.auth,
            signUp: this.signUp,
            setName: this.setName,
            openEntry: this.openEntry,
            setNewName: this.setNewName,
            setMessage: this.setMessage,
            changeName: this.changeName,
            getHistory: this.getHistory,
            setPassword: this.setPassword,
            loadHistory: this.loadHistory,
            sendMessage: this.sendMessage,
            setErrorEntry: this.setErrorEntry,
            setErrorChange: this.setErrorChange,
            toggleUserList: this.toggleUserList,
            setSuccessEntry: this.setSuccessEntry,
            openRegistration: this.openRegistration,
            toggleModalChange: this.toggleModalChange,
            addMessageToHistory: this.addMessageToHistory
        };
        return (
            <div className="wrapper">
                <div className="container">
                    <div className="container__header header">
                        <Header text={logoName} data={data} actions={actions}/>
                    </div>
                    <Overlay data={data} actions={actions}/>
                    <div className="container__body">
                        <Body data={data} actions={actions}/>
                        <ModalChangeName data={data} actions={actions}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Containers;
