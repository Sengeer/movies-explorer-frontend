import React from 'react';
import { useNavigate } from 'react-router-dom';
import Popup from '../Popup/Popup';

function Navigation({
  isOpenNav,
  handleCloseNav,
  pageName
}) {
  const navigate = useNavigate();

  function handleClickProfile() {
    navigate('/profile', { replace: false });
  }

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
    <Popup
      isOpen={isOpenNav}
      name='nav'
      onClose={handleCloseNav} >
        <button
          type='button'
          className={
            pageName === 'main'
              ? 'button popup__btn popup__btn_active'
              : 'button popup__btn'
          }
          onClick={handleClickMain} >
            Главная
        </button>
        <button
          type='button'
          className={
            pageName === 'movies'
              ? 'button popup__btn popup__btn_active'
              : 'button popup__btn'
          }
          onClick={handleClickMovies} >
            Фильмы
        </button>
        <button
          type='button'
          className={
            pageName === 'saved'
              ? 'button popup__btn popup__btn_active'
              : 'button popup__btn'
          }
          onClick={handleClickSaved} >
            Сохранённые фильмы
        </button>
        <button
          type='button'
          className='button account-btn account-btn_style_light'
          aria-label='Профиль'
          onClick={handleClickProfile} >
            Аккаунт
        </button>
    </Popup>
  );
}

export default Navigation;
