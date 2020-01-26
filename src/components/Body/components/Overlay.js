import React, {Fragment} from "react";

const Overlay = ({data, actions}) => {
    const {isOpen} = data;
    const classNameOverlay = isOpen? "container__overlay overlay":"container__overlay overlay hidden";
        return (
            <Fragment>
                <div
                    className={classNameOverlay}
                    onClick={actions.toggleModalChange}
                ></div>
            </Fragment>
        );
};


export default React.memo(Overlay);



