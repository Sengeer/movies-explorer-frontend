import { useState } from 'react';
import './Header.css';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';

function Header({
  appSize,
  isPresentation,
  isAuthorized,
}) {
  const [isOpenNav, setIsOpenNav] = useState(false);

  function onClickNav() {
    setIsOpenNav(!isOpenNav);
  }

  function handleCloseNav() {
    setIsOpenNav(!isOpenNav);
  }

  return (
    <header
      className={
        isPresentation
          ? 'header header_color_pink'
          : 'header header_color_white'
      } >
      <a
        href='../'
        className='logo header__logo' >
        <img
          src={logo}
          alt='Лого' />
      </a>
      <nav
        className='header__container' >
        <button
          className={
            isAuthorized && (appSize === 'tablet' || appSize === 'mobile')
              ? 'button header__navigation-btn'
              : 'button header__navigation-btn header__navigation-btn_hidden'
          }
          type='button'
          aria-label='Меню навигации'
          onClick={onClickNav} />
        <a
          href='../signup'
          className={
            isPresentation && !isAuthorized
              ? 'link header__link header__link_type_signup'
              : 'link header__link header__link_type_signup header__link_hidden'
          } >
            Регистрация
        </a>
        <a
          href='../signin'
          className={
            isPresentation && !isAuthorized
              ? 'link header__link header__link_type_signin'
              : 'link header__link header__link_type_signin header__link_hidden'
          } >
            Войти
        </a>
        <a
          href='../movies'
          className={
            isAuthorized && !(appSize === 'tablet' || appSize === 'mobile')
              ? 'link header__link header__link_type_movies header__link_active'
              : 'link header__link header__link_type_movies header__link_hidden'
          } >
            Фильмы
        </a>
        <a
          href='../saved-movies'
          className={
            isAuthorized && !(appSize === 'tablet' || appSize === 'mobile')
              ? 'link header__link header__link_type_saved-movies'
              : 'link header__link header__link_type_saved-movies header__link_hidden'
          } >
            Сохранённые фильмы
        </a>
        <a
          href='../profile'
          className={
            isAuthorized && !(appSize === 'tablet' || appSize === 'mobile')
              ? isPresentation
                  ? 'link account-link account-link_style_dark'
                  : 'link account-link account-link_style_light'
              : 'link account-link account-link_style_dark account-link_hidden'
          } >
            Аккаунт
        </a>
      </nav>
      <Navigation
        isOpenNav={isOpenNav}
        handleCloseNav={handleCloseNav} />
    </header>
  );
}

export default Header;
