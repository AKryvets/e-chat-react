import React, {Fragment} from "react";

const UserList = (props) => {
    const {isActive} = props.data;
    if (isActive) {
        return (
            <div className="body__users-list">
                {props.children}
            </div>
        );
    } else {
        return (
            <div className="body__users-list hidden">
                {props.children}
            </div>
        )
    }
};

export default React.memo(UserList);



