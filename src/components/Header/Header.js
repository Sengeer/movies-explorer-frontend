import React from 'react';
import './Header.css';
import logo from '../../images/logo.svg';

function Header() {
  return (
    <header
      className="header" >
      <img
        src={logo}
        alt="Лого"
        className="header__logo" />
      <div
        className="header__container" >
        <button
          className="header__btn header__btn_type_topbar"
          type="button"
          aria-label="Боковая панель" />
        <button
          className="header__btn header__btn_type_signup header__btn_inactive"
          type="button"
          aria-label="Регистрация">
          Регистрация
        </button>
        <button
          className="header__btn header__btn_type_signin header__btn_inactive"
          type="button"
          aria-label="Войти">
          Войти
        </button>
        <button
          className="header__btn header__btn_type_movies header__btn_inactive"
          type="button"
          aria-label="Фильмы">
          Фильмы
        </button>
        <button
          className="header__btn header__btn_type_saved-movies header__btn_inactive"
          type="button"
          aria-label="Сохранённые фильмы">
          Сохранённые фильмы
        </button>
        <button
          className="header__profile-btn header__profile-btn_style_dark header__profile-btn_inactive"
          type="button"
          aria-label="Аккаунт">
        </button>
      </div>
    </header>
  );
}

export default Header;
