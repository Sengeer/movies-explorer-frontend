import React from 'react';
import './Navigation.css';

function Navigation() {
  return (
    <div
      className='navigation ' >
      <nav
        className='navigation__container' >
        <a
          href='../'
          className='link navigation__link navigation__link_type_presentation' >
            Главная
        </a>
        <a
          href='../movies'
          className='link navigation__link navigation__link_type_movies navigation__link_active' >
            Фильмы
        </a>
        <a
          href='../saved-movies'
          className='link navigation__link navigation__link_type_saved-movies' >
            Сохранённые фильмы
        </a>
        <a
          href='../profile'
          className='link account-link account-link_style_light' >
            Аккаунт
        </a>
      </nav>
      <button
        className='button navigation__close-btn'
        type='button'
        aria-label='Закрыть' />
    </div>
  );
}

export default Navigation;
