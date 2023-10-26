import React from 'react';
import './Header.css';
import logo from '../../images/logo.svg';

function Header({
  isMobile,
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
      <img
        src={logo}
        alt='Лого'
        className='logo logo_place_header' />
      <nav
        className='header__container' >
        <button
          className={
            isAuthorized && isMobile
              ? 'button header__btn header__btn_type_navigation'
              : 'button header__btn header__btn_type_navigation header__btn_inactive'
          }
          type='button'
          aria-label='Навигация' />
        <button
          className={
            isPresentation && !isAuthorized
              ? 'button header__btn header__btn_type_signup'
              : 'button header__btn header__btn_type_signup header__btn_inactive'
          }
          type='button'
          aria-label='Регистрация' >
            Регистрация
        </button>
        <button
          className={
            isPresentation && !isAuthorized
              ? 'button header__btn header__btn_type_signin'
              : 'button header__btn header__btn_type_signin header__btn_inactive'
          }
          type='button'
          aria-label='Войти' >
            Войти
        </button>
        <button
          className={
            isAuthorized && !isMobile
              ? 'button header__btn header__btn_type_movies header__btn_active'
              : 'button header__btn header__btn_type_movies header__btn_inactive'
          }
          type='button'
          aria-label='Фильмы' >
            Фильмы
        </button>
        <button
          className={
            isAuthorized && !isMobile
              ? 'button header__btn header__btn_type_saved-movies'
              : 'button header__btn header__btn_type_saved-movies header__btn_inactive'
          }
          type='button'
          aria-label='Сохранённые фильмы' >
            Сохранённые фильмы
        </button>
        <button
          className={
            isAuthorized && !isMobile
              ? isPresentation
                  ? 'account-btn account-btn_style_dark'
                  : 'account-btn account-btn_style_light'
              : 'account-btn account-btn_style_dark account-btn_inactive'
          }
          type='button'
          aria-label='Профиль' >
            Аккаунт
        </button>
      </nav>
    </header>
  );
}

export default Header;
