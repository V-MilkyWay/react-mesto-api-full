import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `element__button-trash ${isOwn ? '' : 'element__button-trash_hidden '}`
  );
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some(i => i === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `element-like__like ${isLiked ? 'element-like__like_active' : ''}`
  );
  function handleClick() {
    props.onCardClick(props.card.link);
  }
  function handleLikeClick() {
    props.onCardLike(props.card)
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }
  return (
    <div className="element">
      <button type="button" onClick={handleDeleteClick} className={cardDeleteButtonClassName}></button>
      <img onClick={handleClick} src={props.card.link} alt={props.card.name} className="element__image" />
      <p className="element__text">{props.card.name}</p>
      <div className="element-like">
        <button type="button" onClick={handleLikeClick} className={cardLikeButtonClassName}></button>
        <p id="number" className="element-like__number">{props.card.likes.length}</p>
      </div>
    </div>
  );
}

export default Card;