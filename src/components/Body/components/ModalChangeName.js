import React, {Fragment} from "react";

const ModalChangeName = (props) => {
    const {toggleModalChange, setNewName, changeName, setErrorChange} = props.actions;
    const {isOpen, name, errorChange} = props.data;
    const classStatus = isOpen ? "container__modal-window modal-window" : "container__modal-window modal-window hidden";
    return (
        <Fragment>
            <div className={classStatus}>
                <span className="modal-window__close" onClick={toggleModalChange}>✖</span>
                <div className="modal-window__label">ИЗМЕНИТЬ ИМЯ</div>
                <div className="modal-window__form forms">
                    <div className="forms__input form">
                        <input type="text" className="form__input" placeholder={name}
                               maxLength="12"
                               onChange={(e) => {
                                   setNewName(e.target.value)
                               }}
                               required/>
                        <div className="form__error">{errorChange}</div>
                    </div>
                    <div className="forms__label label">
                        <button className="label__submit" onClick={() => {
                            changeName(toggleModalChange, setErrorChange)
                        }}>OK
                        </button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
};

export default React.memo(ModalChangeName);



