import React, {Fragment} from "react";

const Header = ({text, data, actions}) => {
    const {toggleUserList, toggleModalChange} = actions;
    if (data.isSuccessEntry) {
        return (
            <Fragment>
                <div className="header__logo logo">
                    <div className="logo__logo"></div>
                    <div className="logo__name">{text}</div>
                </div>
                <div className="header__menu menu">
                    <div className="menu__settings button" title="Изменить имя пользователя" onClick={toggleModalChange}>
                        <div className="button__img"></div>
                    </div>
                    <div className="menu__users-list button" title="Список пользователей online" onClick={toggleUserList}>{data.count}
                    </div>
                </div>
            </Fragment>
        );
    } else {
        return (
            <div className="header__logo logo">
                <div className="logo__logo"></div>
                <div className="logo__name">{text}</div>
            </div>
        );
    }
};


export default Header;



