export function validation(name, password) {
    if (name.length < 1 || password.length < 1) {
        return {
            status: false,
            error: "Заполните поля"
        };
    }

    if (password.length < 6) {
        return {
            status: false,
            error: "Длина пароля должна быть не менее 6 символов"
        };
    }

    if (password.indexOf(" ") != -1) {
        return {
            status: false,
            error: "Пароль не может содержать пробелы"
        };
    }

    if (!/[a-zа-яёії]/i.test(name)) {
        return {
            status: false,
            error: "Имя должно содержать как минимум одну букву"
        };
    }

    return {status: true};
}