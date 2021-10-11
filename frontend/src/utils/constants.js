export const formEditProfile = document.querySelector('#profile');
export const formAddCard = document.querySelector('#addCard');
export const formRedactAvatar = document.querySelector('#redactAvatar');
export const openEditProfilePopupBtn = document.querySelector('.profile-info__edit-button');
export const openAddCardPopupBtn = document.querySelector('.profile__add-button');
export const openRedactAvatarPopupBtn = document.querySelector('.profile-avatar__redact-button');
export const popupProfileRedact = document.querySelector('.popup_type_redact');
export const popupAvatarRedact = document.querySelector('.popup_type_redact-avatar');
export const popupAddNewCard = document.querySelector('.popup_type_add-card');
export const nameInput = document.querySelector('.form__input_type_name');
export const jobInput = document.querySelector('.form__input_type_job');
export const statusGood = 'Вы успешно зарегистрировались!';
export const statusErr = 'Что-то пошло не так! Попробуйте ещё раз.';

export const selectorsAll = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__save-button',
    inactiveButtonClass: 'form__save-button_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_type_active',
    infoRedactName: '.form__input_type_name',
    infoName: '.profile-info__name',
    infoRedactJob: '.form__input_type_job',
    infoJob: '.profile-info__job',
    infoAvatar: '.profile-avatar__image',
    infoNewAvatar: '.form__input_type_avatar',
    elements: '.elements',
    infoTitle: '.form__input_type_title',
    infoLink: '.form__input_type_link',
    formloading: '.form__loading'
};