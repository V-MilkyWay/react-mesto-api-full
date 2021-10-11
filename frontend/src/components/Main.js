import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);


  return (
    <main className="main">
      <section className="profile">
        <div className="profile-avatar">
          <img id="avatar" className="profile-avatar__image" src={currentUser.avatar} alt='Аватарка' />
          <button onClick={props.onEditAvatar} type="button" className="profile-avatar__redact-button"></button>
        </div>
        <div className="profile-info">
          <h1 id="name" className="profile-info__name">{currentUser.name}</h1>
          <p id="about" className="profile-info__job">{currentUser.about}</p>
          <button onClick={props.onEditProfile} type="button" className="profile-info__edit-button"></button>
        </div>
        <button onClick={props.onAddPlace} type="button" className="profile__add-button"></button>
      </section>
      <section className="elements">
        {props.cards.map((card) => (
          <Card key={card._id} card={card} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />
        )).reverse()}
      </section>
    </main>
  );
}

export default Main;