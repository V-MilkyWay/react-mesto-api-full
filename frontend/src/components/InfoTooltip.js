import React from 'react';


function InfoTooltip(props) {
    return (
        <div className={`popup popup_type_infoTooltip ${props.isOpen}`} >
            <div className="popup__container">
                <button onClick={props.onClose} type="button" className="popup__close-button"></button>
                <div className="form">
                    <img className="form__image" src={props.image} alt="Изображение" />
                    <h2 className="form__status">{props.status}</h2>
                </div>
            </div>
        </div>
    );
}

export default InfoTooltip;