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
          className="header__topbar-btn header__topbar-btn_inactive"
          type="button"
          aria-label="Боковая панель" />
        <button
          className="header__signup-btn header__signup-btn_inactive"
          type="button"
          aria-label="Регистрация">
          Регистрация
        </button>
        <button
          className="header__signin-btn header__signin-btn_inactive"
          type="button"
          aria-label="Войти">
          Войти
        </button>
        <button
          className="header__movies-btn"
          type="button"
          aria-label="Фильмы">
          Фильмы
        </button>
        <button
          className="header__saved-movies-btn"
          type="button"
          aria-label="Сохранённые фильмы">
          Сохранённые фильмы
        </button>
        <button
          className="header__profile-btn header__profile_style_dark"
          type="button"
          aria-label="Аккаунт">
        </button>
      </div>
    </header>
  );
}

export default Header;
