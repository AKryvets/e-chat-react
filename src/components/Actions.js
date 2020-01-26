import {sendName} from "../js/send-name";
import {signUpUser} from "../js/sign-up";
import {loadHistory} from "../js/load-history";
import {authenticateUser} from "../js/auth";
import {changeName} from "../js/change-name";
import {validation} from "../js/validation";

export default class Actions {
    openRegistration(setErrorEntry) {
        this.setName("");
        this.setPassword("");
        this.setState({isEntry: false});
        this.setErrorEntry("")
    };

    openEntry(setErrorEntry) {
        this.setName("");
        this.setPassword("");
        this.setState({isEntry: true});
        this.setErrorEntry("")
    };

    toggleUserList() {
        this.setState({isActive: !this.state.isActive})
    }

    toggleModalChange() {
        this.setState({isOpen: !this.state.isOpen})
    }

    setName(value) {
        this.setState({name: value})
    }

    setUsersList(value) {
        this.setState({usersList: value})
    }

    setCount(value) {
        this.setState({count: value})
    }

    setPassword(value) {
        this.setState({password: value})
    }

    setMessage(value) {
        this.setState({message: value})
    }

    setSuccessEntry(value) {
        this.setState({isSuccessEntry: value});
    }

    setErrorEntry(value) {
        this.setState({errorEntry: value});
    }

    setErrorChange(value) {
        this.setState({errorChange: value});
    }

    setNewName(value) {
        this.setState({newName: value});
    }

    addMessageToHistory(message) {
        this.setState({history: this.state.history.concat(message)})
    }

    auth(name, password, setSuccessEntry, loadHistory, setErrorEntry) {
        const checking = validation(name, password);
        if (checking.status) {
            authenticateUser(name, password).then((response) => {
                if (response.status) {
                    setSuccessEntry(true);
                    loadHistory();
                    sendName(name);
                } else {
                    setErrorEntry("Пользаветаль с таким логином и паролем не найден!")
                }
            });
        } else {
            setErrorEntry(checking.error)
        }
    }

    signUp(name, password, setSuccessEntry, loadHistory, setErrorEntry) {
        const checking = validation(name, password);
        if (checking.status) {
            signUpUser(name, password).then((response) => {
                if (response.status) {
                    setSuccessEntry(true);
                    loadHistory();
                    sendName(name);
                } else {
                    setErrorEntry("Такое имя пользователь уже занято: " + name)
                }
            });
        } else {
            setErrorEntry(checking.error)
        }
    }

    loadHistory() {
        const history = document.getElementById("messageHistory");

        if (history.scrollTop == 0) {
            loadHistory().then((response) => {
                this.setState({history: response.docs.concat(this.state.history)})
            });
        }
    }

    getHistory() {
        const history = document.getElementById("messageHistory");
        loadHistory().then((response) => {
            this.setState({history: response.docs});
            history.scrollTop = history.scrollHeight;
        });
    }

    changeName(toggleModalChange, setErrorChange) {
        const checking = validation(this.state.newName, "password");
        if (checking.status) {
            changeName(this.state.name, this.state.newName).then((response) => {
                if (response.status) {
                    this.setState({name: this.state.newName});
                    sendName(this.state.name);
                    toggleModalChange();
                } else {
                    setErrorChange("Имя уже занято другим пользователем: " + this.state.newName);
                }
            });
        } else {
            setErrorChange(checking.error)
        }
    }

    sendMessage(addMessageToHistory) {
        if (this.state.message === "" || !this.state.message.replace(/\s/g, '').length) return -1;
        const data = {
            nickname: this.state.name,
            message: this.state.message.trim(),
            createdAt: new Date().toUTCString()
        };
        this.state.ws.send(JSON.stringify(data));
        addMessageToHistory(data);
    }

}
