import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navigation.css';

function Navigation({
  isOpenNav,
  handleCloseNav,
  pageName
}) {
  const navigate = useNavigate();

  function handleClickMain() {
    navigate('/', { replace: false });
  }

  function handleClickMovies() {
    navigate('/movies', { replace: false });
  }

  function handleClickSaved() {
    navigate('/saved-movies', { replace: false });
  }

  return (
    <div
      className={
        isOpenNav
          ? 'navigation navigation_open'
          : 'navigation'
      } >
      <nav
        className='navigation__container' >
        <button
          type='button'
          className={
            pageName === 'main'
              ? 'button navigation__btn navigation__btn_type_presentation navigation__btn_active'
              : 'button navigation__btn navigation__btn_type_presentation'
          }
          onClick={handleClickMain} >
            Главная
        </button>
        <button
          type='button'
          className={
            pageName === 'movies'
              ? 'button navigation__btn navigation__btn_type_movies navigation__btn_active'
              : 'button navigation__btn navigation__btn_type_movies'
          }
          onClick={handleClickMovies} >
            Фильмы
        </button>
        <button
          type='button'
          className={
            pageName === 'saved'
              ? 'button navigation__btn navigation__btn_type_saved-movies navigation__btn_active'
              : 'button navigation__btn navigation__btn_type_saved-movies'
          }
          onClick={handleClickSaved} >
            Сохранённые фильмы
        </button>
        <a
          href='../profile'
          className='link account-link account-link_style_light' >
            Аккаунт
        </a>
      </nav>
      <button
        className='button navigation__close-btn'
        type='button'
        aria-label='Закрыть'
        onClick={handleCloseNav} />
    </div>
  );
}

export default Navigation;
