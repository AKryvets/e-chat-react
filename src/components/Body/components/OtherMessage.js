import React, {Fragment} from "react";
const dateFormat = require('dateformat');

const OtherMessage = ({item}) => {
        return (
            <Fragment>
                    <div className="massages__message other-messages" key={item._id}>
                        <div className="other-message__image-block">
                            <div className="image-block__image">{item.nickname[0]}</div>
                        </div>
                        <div className="other-messages__message-body message-body">
                            <span className="message-body__nickname">{item.nickname}</span>
                            <div className="message-body__message-block message-block">
                                <span className="message-block__massage">{item.message}</span>
                            </div>
                            <span className="message-body__time">
                                {`${dateFormat(new Date(item.createdAt), 'dd/mm/yy HH:MM')}`}
                            </span>
                        </div>
                    </div>
            </Fragment>
        );
};

export default React.memo(OtherMessage);



