import React from "react";

const History = (props) => {
    return (
        <div className="history__messages" id={"messageHistory"}>
            {props.children}
        </div>
    );
};

export default React.memo(History);



