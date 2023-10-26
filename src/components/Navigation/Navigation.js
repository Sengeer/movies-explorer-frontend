import React from 'react';
import './Navigation.css';

function Navigation() {
  return (
    <div
      className='navigation' >
      <nav
        className='navigation__container' >
        <button
          className='button navigation__btn navigation__btn_type_presentation'
          type='button'
          aria-label='Главная' >
            Главная
        </button>
        <button
          className='button navigation__btn navigation__btn_type_movies navigation__btn_active'
          type='button'
          aria-label='Фильмы' >
            Фильмы
        </button>
        <button
          className='button navigation__btn navigation__btn_type_saved-movies'
          type='button'
          aria-label='Сохранённые фильмы' >
            Сохранённые фильмы
        </button>
        <button
          className='account-btn account-btn_style_light'
          type='button'
          aria-label='Профиль' >
            Аккаунт
        </button>
      </nav>
      <button
        className='button navigation__close-btn'
        type='button'
        aria-label='Закрыть' />
    </div>
  );
}

export default Navigation;
