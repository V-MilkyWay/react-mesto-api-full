import React from 'react';

function ImagePopup(props) {
  return (
    <div className={`popup popup_type_image ${props.card.bool? ('popup_opened') : ''}`}>
        <div className="popup__container">
        <button onClick={props.onClose} type="button" className="popup__close-button"></button>
            <div className="form-image">
                <img className="form-image__image" src={props.card.link} alt="Изображение" />
                <p className="form-image__text">Картинка</p>
            </div>
        </div>
    </div>
  );
}

export default ImagePopup;