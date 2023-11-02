import React from 'react';
import './Header.css';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';

function Header({
  isTablet,
  isPresentation,
  isAuthorized,
}) {
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
            isAuthorized && isTablet
              ? 'button header__navigation-btn'
              : 'button header__navigation-btn header__navigation-btn_inactive'
          }
          type='button'
          aria-label='Навигация' />
        <a
          href='../signup'
          className={
            isPresentation && !isAuthorized
              ? 'link header__link header__link_type_signup'
              : 'link header__link header__link_type_signup header__link_inactive'
          } >
            Регистрация
        </a>
        <a
          href='../signin'
          className={
            isPresentation && !isAuthorized
              ? 'link header__link header__link_type_signin'
              : 'link header__link header__link_type_signin header__link_inactive'
          } >
            Войти
        </a>
        <a
          href='../movies'
          className={
            isAuthorized && !isTablet
              ? 'link header__link header__link_type_movies header__link_active'
              : 'link header__link header__link_type_movies header__link_inactive'
          } >
            Фильмы
        </a>
        <a
          href='../saved-movies'
          className={
            isAuthorized && !isTablet
              ? 'link header__link header__link_type_saved-movies'
              : 'link header__link header__link_type_saved-movies header__link_inactive'
          } >
            Сохранённые фильмы
        </a>
        <a
          href='../profile'
          className={
            isAuthorized && !isTablet
              ? isPresentation
                  ? 'link account-link account-link_style_dark'
                  : 'link account-link account-link_style_light'
              : 'link account-link account-link_style_dark account-link_inactive'
          } >
            Аккаунт
        </a>
      </nav>
      <Navigation />
    </header>
  );
}

export default Header;
