import React, {Fragment} from "react";
const dateFormat = require('dateformat');

const OwnMessage = ({item}) => {
    return (
        <Fragment>
            <div className="massages__message own-messages">
                <div className="own-messages__message-body message-body-own">
                    <div className="message-body-own__message-block message-block-own">
                        <span className="message-block-own__massage">
                            {item.message}
                        </span>
                    </div>
                    <span className="message-body-own__time">
                            {`${dateFormat(new Date(item.createdAt), 'dd/mm/yy HH:MM')}`}
                    </span>
                </div>
            </div>
        </Fragment>
    );
};

export default React.memo(OwnMessage);



