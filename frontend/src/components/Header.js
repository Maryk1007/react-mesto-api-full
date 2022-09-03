import { useState } from 'react';
import logo from '../images/logo.svg';
import { Route, NavLink, Switch } from 'react-router-dom';

function Header({userEmail, signOut}) {
  const [isMenuBurger, setIsMenuBurger] = useState(false);

  // открыть menuBurger
  const handleMenuBurgerOpen=()=>{
    setIsMenuBurger(true)
  }

// закрыть menuBurger
  const handleMenuBurgerClose=()=>{
    setIsMenuBurger(false)
  }

  const output = () => {
    signOut();
    setIsMenuBurger(false)
  }

  const classNameLogo = `header__logo ${isMenuBurger ? "header__logo-menu-top" : ""}`;
  const classNameHeader = `header ${isMenuBurger ? "header__menu-top" : ""}`;
  const classNameButtonClose = `header__button-close ${isMenuBurger ? "header__button-close_visible" : ""}`;
  const classNameBurgerMenu = `burger-menu ${isMenuBurger ? "burger-menu_invisible" : ""}`;
  const classNameHeaderMenu = `header__menu ${isMenuBurger ? "header__menu_visible" : ""}`;
  const classNameMenuLink = `header__link ${isMenuBurger ? "header__link-top" : ""}`;

  return (
    <header className={classNameHeader}>
      <img className={classNameLogo} src={logo} alt="логотип сайта"/>
      <Switch>
        <Route exact path='/'>
          <button
            className={classNameButtonClose}
            type="button"
            aria-label="кнопка закрытия меню навигации"
            onClick={handleMenuBurgerClose}>
          </button>
          <div className={classNameBurgerMenu}
            onClick={handleMenuBurgerOpen}>
            <span className="burger-menu__item"></span>
            <span className="burger-menu__item"></span>
            <span className="burger-menu__item"></span>
          </div>
          <nav className={classNameHeaderMenu}>
            <ul className="header__menu-list">
              <li className={classNameMenuLink}>{userEmail}</li>
              <li className={classNameMenuLink}><button className="header__menu-button" onClick={output}>Выйти</button></li>
            </ul>
          </nav>
        </Route>
        <Route path='/sign-up'>
            <NavLink to="/sign-in" className="header__link">Войти</NavLink>
          </Route>
          <Route path='/sign-in'>
            <NavLink to="/sign-up" className="header__link">Регистрация</NavLink>
          </Route>
        </Switch>
    </header>
  )
}

export default Header;
