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
        alt="Лого"
        className="header__logo" />
      <div
        className="header__container" >
        <button
          className={
            isAuthorized && isMobile
              ? 'header__btn header__btn_type_topbar'
              : 'header__btn header__btn_type_topbar header__btn_inactive'
          }
          type="button"
          aria-label="Боковая панель" />
        <button
          className={
            isPresentation && !isAuthorized
              ? 'header__btn header__btn_type_signup'
              : 'header__btn header__btn_type_signup header__btn_inactive'
          }
          type="button"
          aria-label="Регистрация">
          Регистрация
        </button>
        <button
          className={
            isPresentation && !isAuthorized
              ? 'header__btn header__btn_type_signin'
              : 'header__btn header__btn_type_signin header__btn_inactive'
          }
          type="button"
          aria-label="Войти">
          Войти
        </button>
        <button
          className={
            isAuthorized && !isMobile
              ? 'header__btn header__btn_type_movies'
              : 'header__btn header__btn_type_movies header__btn_inactive'
          }
          type="button"
          aria-label="Фильмы">
          Фильмы
        </button>
        <button
          className={
            isAuthorized && !isMobile
              ? 'header__btn header__btn_type_saved-movies'
              : 'header__btn header__btn_type_saved-movies header__btn_inactive'
          }
          type="button"
          aria-label="Сохранённые фильмы">
          Сохранённые фильмы
        </button>
        <button
          className={
            isAuthorized && !isMobile
              ? isPresentation
                  ? 'header__profile-btn header__profile-btn_style_dark'
                  : 'header__profile-btn header__profile-btn_style_light'
              : 'header__profile-btn header__profile-btn_style_dark header__profile-btn_inactive'
          }
          type="button"
          aria-label="Аккаунт">
        </button>
      </div>
    </header>
  );
}

export default Header;
