import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup(props) {

    const [title, setTitle] = React.useState('');
    const [link, setLink] = React.useState('');

    function changeTitle(e) {
        setTitle(e.target.value);
    }

    function changeLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onAddPlaceSubmit({
            name: title,
            link: link
          });
    }
    return (
        <PopupWithForm onSubmit={handleSubmit} type="add-card" isOpen={props.isOpen ? 'popup_opened' : ''} onClose={props.onClose} name="addCard" title="Новое место" text="Сохранить" children={
            <>
                <input id="title-input" value={ title } name="title" type="text" onChange={changeTitle} className="form__input form__input_type_title" placeholder="Название" required minLength="2" maxLength="30" />
                <span className="form__input-error title-input-error"></span>
                <input id="url-input" value={ link } name="link" type="url" onChange={changeLink} className="form__input form__input_type_link" placeholder="Ссылка на картинку" required />
                <span className="form__input-error url-input-error"></span>
            </>} />
    );
}

export default AddPlacePopup;