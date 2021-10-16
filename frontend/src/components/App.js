import React from 'react';
import Header from './Header.js';
import Login from './Login.js';
import Register from './Register.js'
import Main from './Main.js';
import Footer from './Footer.js';
import api from '../utils/api.js';
import * as Auth from '../utils/auth.js';
import ImagePopup from './ImagePopup.js';
import ProtectedRoute from "./ProtectedRoute.js"
import { Route, Link, useHistory, Switch } from 'react-router-dom';
import PopupWithForm from './PopupWithForm.js';
import AddPlacePopup from './AddPlacePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import InfoTooltip from './InfoTooltip.js';
import * as Utils from '../utils/constants.js';
import imageErrRegister from '../images/Union.svg';
import imageGoodRegister from '../images/icon.svg';

function App() {
    const [cards, setCards] = React.useState([]);
    const [currentUser, setCurrentUser] = React.useState({});
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
    const [isInfoTooltip, setInfoTooltip] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
    const [isEditAgreePopupOpen, setEditAgreePopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({ bool: false, link: '' });
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [image, setImage] = React.useState('');
    const [status, setStatus] = React.useState('');
    const history = useHistory();

    React.useEffect(() => {
        if (loggedIn) {
            function initialCards() {
                api.initCardsFromServer()
                    .then((result) => {
                        setCards([...result.data])
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
            initialCards();
        }
    }, [loggedIn]);

    React.useEffect(() => {
        if (loggedIn) {
            function getUserInfo() {
                api.initialUsers()
                    .then((result) => {
                        setCurrentUser(
                            result.data
                        );
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
            getUserInfo();
        }
    }, [loggedIn]);


    function handleCardClick(props) {
        setSelectedCard({
            bool: true,
            link: props
        });
    }
    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setAddPlacePopupOpen(true);
    }

    function closeAllPopups() {
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setEditAvatarPopupOpen(false);
        setEditAgreePopupOpen(false);
        setInfoTooltip(false);
        setSelectedCard({
            bool: false,
            link: '',
        });
    }

    function handleUpdateUser(data) {
        api.loadingUserInfoOnServer({ name: data.name, about: data.about }).then((result) => {
            setCurrentUser(result.data);
            closeAllPopups();
        }).catch((err) => {
            console.log(err);
        })
    }

    function handleUpdateAvatar(data) {
        api.loadingNewAvatarOnServer(data).then((result) => {
            setCurrentUser(result.data);
            closeAllPopups();
        }).catch((err) => {
            console.log(err);
        })
    }


    function handleCardLike(card) {

        const isLiked = card.likes.some(i => i === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        }).catch((err) => {
            console.log(err);
        });
    }

    function handleCardDelete(card) {
        api.deleteCardFromServer(card._id).then(() => {
            setCards((state) => state.filter((c) => c._id !== card._id));
        }).catch((err) => {
            console.log(err);
        });
    }


    function handleAddPlaceSubmit(data) {
        api.loadingNewCardOnServer(data).then((newCard) => {
            setCards([...cards, newCard]);
            closeAllPopups();
        }).catch((err) => {
            console.log(err);
        });
    }

    function handleLogin(email, password) {
        Auth.authorize(email, password)
            .then((data) => {
                if (data.token) {
                    setEmail(email)
                    setLoggedIn(true);
                    history.push('/');
                }
            })
            .catch(err => console.log(err));
    }

    React.useEffect(() => {
        function tokenCheck() {
            const jwt = localStorage.getItem('jwt');
            if (jwt) {
                Auth.getContent(jwt).then((res) => {
                    if (res) {
                        setEmail(res.data.email);
                        setLoggedIn(true);
                        history.push('/');
                    }
                }).catch((err) => {
                    console.log(err)
                })
            }
        }
        tokenCheck();
    }, [history]);


    function signOut() {
        localStorage.removeItem('jwt');
        setLoggedIn(false);
    }

    function handleInfoTooltip(image, status) {
        setInfoTooltip(true);
        setImage(image);
        setStatus(status);
    }


    function handleRegister(email, password) {
        Auth.register(email, password)
            .then((res) => {
                if (res) {
                    handleInfoTooltip(imageGoodRegister, Utils.statusGood);
                    history.push('/sign-in');

                } else {
                    handleInfoTooltip(imageErrRegister, Utils.statusErr);
                }
            }).catch((err) => {
                console.log(err);
            });
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <InfoTooltip image={image} status={status} onClose={closeAllPopups} isOpen={isInfoTooltip ? 'popup_opened' : ''} />
                <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
                <AddPlacePopup onAddPlaceSubmit={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
                <ImagePopup card={selectedCard} onClose={closeAllPopups} />
                <PopupWithForm type="deletion" isOpen={isEditAgreePopupOpen ? 'popup_opened' : ''} name="formAgree" title="Вы уверены?" text="Да" />
                <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
                <Switch>
                    <Route path="/sign-up">
                        <Register onRegister={handleRegister} />
                    </Route>
                    <Route path="/sign-in">
                        <Login onLogin={handleLogin} />
                    </Route>
                </Switch>
                <ProtectedRoute
                    exact path="/"
                    children={
                        <>
                            <h2 className="header__email-info">{email}</h2>
                            <Link onClick={signOut} className="header__link" to="/sign-in">
                                Выйти
                            </Link>
                        </>
                    }
                    loggedIn={loggedIn}
                    component={Header}
                />
                <ProtectedRoute
                    exact path="/"
                    onEditAvatar={handleEditAvatarClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditProfile={handleEditProfileClick}
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    loggedIn={loggedIn}
                    component={Main}
                />
                <ProtectedRoute
                    exact path="/"
                    loggedIn={loggedIn}
                    component={Footer}
                />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
