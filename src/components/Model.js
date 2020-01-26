export default class State {
    constructor() {
        this.ws = new WebSocket('ws://localhost:3001');

        this.isOpen = false;
        this.isEntry = true;
        this.isActive = false;
        this.isSuccessEntry = false;

        this.name = "";
        this.count = 0;
        this.newName = "";
        this.message = "";
        this.password = "";
        this.logoName = "e-chat";
        this.errorEntry = "";
        this.errorChange = "";
        this.scrollPosition = null;

        this.history = [];
        this.usersList = [];

        this.entryLabels = {
            title: "ДОБРО ПОЖАЛОВАТЬ!",
            labelButton: "Войти",
            linkLabel: "Нет аккаунта?",
            linkButton: " Зарегистрироваться"

        };
        this.regLabels = {
            title: "РЕГИСТРАЦИЯ",
            labelButton: "Зарегистрироваться",
            linkLabel: "Уже зарегистрированы?",
            linkButton: " Войти"
        }

    }
}
