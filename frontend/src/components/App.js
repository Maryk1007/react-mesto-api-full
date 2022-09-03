import React, { useState, useEffect } from 'react';
import { Route, Redirect, Switch, useHistory } from 'react-router-dom';
import { api } from "../utils/api.js";
import * as auth from "../utils/auth.js"
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import EditProfilePopup from "./EditProfilePopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import ConfirmDeletePopup from "./ConfirmDeletePopup.js";
import ImagePopup from "./ImagePopup.js";
import Login from "./Login.js";
import Register from "./Register.js";
import InfoTooltip from "./InfoTooltip.js";
import ProtectedRoute from './ProtectedRoute.js'
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function App() {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isPopupProfileOpen, setIsPopupProfileOpen] = useState(false);
  const [isPopupPhotoOpen, setIsPopupPhotoOpen] = useState(false);
  const [isPopupAvatarOpen, setIsPopupAvatarOpen] = useState(false);
  const [isPopupConfirmDelete, setIsPopupConfirmDelete] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] = useState();
  const [selectCard, setSelectCard] = useState({});
  const [cardDelete, setCardDelete] = useState({});

  // использование токена при возврате на сайт
  useEffect(() => {
    tokenCheck();
  }, [])

  // при успешной авторизации переход на основную страницу
  useEffect(() => {
    if (loggedIn) {
      history.push('/');
    }
  }, [loggedIn])

  // при успешном входе получение данных пользователя и массива карточек
  useEffect(() => {
    if(loggedIn) {
      Promise.all([api.getProfile(), api.getCardItems()])
      .then(([res, cards]) => {
        setCurrentUser(res);
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [loggedIn]);

  // регистрация пользователей
  const handleRegister = (updateRegister) => {
    return auth.register(updateRegister.email, updateRegister.password)
      .then(() => {
        setIsInfoTooltipOpen(true);
        setIsRegistrationSuccessful(true);
        history.push('/sign-in');
      })
      .catch(() => {
        setIsRegistrationSuccessful(false);
      })
      .finally(() => {
        setIsInfoTooltipOpen(true);
        updateRegister.onRenderLoading(false)
      })
  }

  // авторизация пользователей
  const handleLogin = (updateLogin) => {
    return auth.authorize(updateLogin.email, updateLogin.password)
    .then((data) => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        setLoggedIn(true);
        history.push('/');
      }
    })
    .catch(() => {
      setIsInfoTooltipOpen(true);
      setIsRegistrationSuccessful(false);
    })
    .finally(() => {
      updateLogin.onRenderLoading(false)
    })
  }

  // получение токена
  function tokenCheck() {
    const token = localStorage.getItem('token');

    if (token) {
      auth.getContent(token)
      .then((res) => {
        if (res) {

          setUserEmail(res.data.email);
          setLoggedIn(true);
          history.push('/');
        }
      })
      .catch((err) => console.log(err))
    };
  };

  //выход со страницы с информацией пользователя
  const signOut = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    history.push('/sign-in');
  }

  // изменение информации в профиле
  function handleUpdateUser(updateUser) {
    api
      .editProfile(updateUser.name, updateUser.about)
      .then((res) => {
        setCurrentUser(res);
        setIsPopupProfileOpen(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        updateUser.onRenderLoading(false);
      });
  }

  // добавление новых фото
  function handleAddPlaceSubmit(newCard) {
    api
      .addCards(newCard.name, newCard.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        setIsPopupPhotoOpen(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        newCard.onRenderLoading(false);
      });
  }

  function handleUpdateAvatar(updateAvatar) {
    api
      .editAvatar(updateAvatar.avatar)
      .then((res) => {
        setCurrentUser(res);
        setIsPopupAvatarOpen(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        updateAvatar.onRenderLoading(false);
      });
  }

  function handleEditProfileClick() {
    setIsPopupProfileOpen(true);
  }

  function handleAddPlaceClick() {
    setIsPopupPhotoOpen(true);
  }

  function handleEditAvatarClick() {
    setIsPopupAvatarOpen(true);
  }

  function closeAllPopups() {
    setIsPopupProfileOpen(false);
    setIsPopupPhotoOpen(false);
    setIsPopupAvatarOpen(false);
    setIsPopupConfirmDelete(false);
    setIsInfoTooltipOpen(false);
    setSelectCard({});
  }

  function handleCardClick(card) {
    setSelectCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (!isLiked) {
      api
        .addLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch(console.log);
    } else {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch(console.log);
    }
  }

  function handleDeleteClick(card) {
    setIsPopupConfirmDelete(true);
    setCardDelete(card);
  }

  function handleCardDelete(obj) {
    api
      .deleteCard(cardDelete._id)
      .then((res) => {
        setCards((cards) => cards.filter((c) => c._id !== cardDelete._id));
        setIsPopupConfirmDelete(false);
      })
      .catch(console.log)
      .finally(() => {
        obj.onRenderLoading(false);
      });
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          userEmail={userEmail}
          signOut={signOut} />
        <Switch>
          <ProtectedRoute exact path="/" loggedIn={loggedIn}>
            <Main
              cards={cards}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteClick}
            />
          </ProtectedRoute>
          <Route path="/sign-up">
            <Register handleRegister={handleRegister}/>
          </Route>
          <Route path="/sign-in">
            <Login handleLogin={handleLogin} />
          </Route>
          <Route path='*'>
            {loggedIn ? <Redirect to ="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        <Footer />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          successResult={isRegistrationSuccessful}
          onClose={closeAllPopups}
          successMessage={'Вы успешно зарегистрировались!'}
          failMessage={'Что-то пошло не так! Попробуйте ещё раз.'}
        />
        <EditProfilePopup
          isOpen={isPopupProfileOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isPopupAvatarOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isPopupPhotoOpen}
          onClose={closeAllPopups}
          onUpdatePhoto={handleAddPlaceSubmit}
        />
        <ConfirmDeletePopup
          isOpen={isPopupConfirmDelete}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
        />
        <ImagePopup card={selectCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
