import React from 'react';

function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.type} ${props.isOpen}`} >
        <div className="popup__container">
        <button onClick={props.onClose} type="button" className="popup__close-button"></button>
            <form id={`${props.name}`} onSubmit={props.onSubmit} name={`${props.name}`} className="form" noValidate>
                <h2 className="form__title">{props.title}</h2>
                {props.children}
                <button type="submit" className="form__save-button">{props.text}</button>
                <div className="form__loading">Загрузка...</div>
            </form>
        </div>
    </div>
  );
}

export default PopupWithForm;