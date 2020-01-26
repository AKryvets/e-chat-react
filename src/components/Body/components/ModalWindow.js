import React, {Fragment} from "react";

const ModalWindow = (props) => {
    const {entryLabels, regLabels, isEntry, name, password, errorEntry} = props.data;
    const {openRegistration, openEntry, setName, setPassword, auth, setSuccessEntry, signUp, getHistory, setErrorEntry} = props.actions;
    const {title, labelButton, linkLabel, linkButton} = isEntry ? entryLabels : regLabels;
    const clickLink = isEntry ? openRegistration : openEntry;
    const clickButton = isEntry ? auth : signUp;
    return (
        <Fragment>
            <div className="container__modal-entry-window modal-entry-window">
                <div className="modal-entry-window__label">{title}</div>
                <div className="modal-entry-window__form forms">
                    <div className="forms__input form">
                        <input
                            type="text"
                            value={name}
                            className="form__input"
                            placeholder="Введите имя"
                            maxLength="12"
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                            required/>
                        <input
                            type="password"
                            value={password}
                            className="form__input"
                            placeholder="Введите пароль"
                            maxLength="12"
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                            required/>
                        <div className="form__error">{errorEntry}</div>
                        <div className="form__link link">
                            <div className="link__label">{linkLabel}</div>
                            <div className="link__button" onClick={() =>{
                                clickLink(setErrorEntry);
                            }}>{linkButton}</div>
                        </div>
                    </div>
                    <div className="forms__label label">
                        <button className="label__submit" onClick={(e) => {
                            e.preventDefault();
                            clickButton(name, password, setSuccessEntry, getHistory, setErrorEntry);
                        }}>{labelButton}</button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
};

export default React.memo(ModalWindow);



