import React from 'react';
import PopupWithForm from './PopupWithForm.js';


function EditAvatarPopup(props) {
    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: avatarRef.current.value
        });
    }

    return (
        <PopupWithForm onSubmit={handleSubmit} type="redact-avatar" isOpen={props.isOpen ? 'popup_opened' : ''} onClose={props.onClose} name="redactAvatar" title="Обновить аватар" text="Сохранить" children={
            <>
                <input id="link-input" ref={avatarRef} name="avatar" type="url" className="form__input form__input_type_avatar" placeholder="Ссылка на картинку" required />
                <span className="form__input-error link-input-error"></span>
            </>} />
    );
}

export default EditAvatarPopup;