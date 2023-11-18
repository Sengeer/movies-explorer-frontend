import { useState } from 'react';
import './Header.css';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';
import { useNavigate } from 'react-router-dom';

function Header({
  appSize,
  pageName,
  isAuthorized,
}) {
  const navigate = useNavigate();

  const [isOpenNav, setIsOpenNav] = useState(false);

  function handleClickMain() {
    navigate('/', { replace: false });
  }

  function handleClickProfile() {
    navigate('/profile', { replace: false });
  }

  function handleClickRegister() {
    navigate('/signup', { replace: false });
  }

  function handleClickLogin() {
    navigate('/signin', { replace: false });
  }

  function handleClickMovies() {
    navigate('/movies', { replace: false });
  }

  function handleClickSaved() {
    navigate('/saved-movies', { replace: false });
  }

  function handleClickNav() {
    setIsOpenNav(!isOpenNav);
  }

  function handleCloseNav() {
    setIsOpenNav(!isOpenNav);
  }

  return (
    <header
      className={
        pageName === 'main'
          ? 'header header_color_pink'
          : 'header header_color_white'
      } >
      <button
        type='button'
        className='button logo header__logo'
        aria-label='Презентация'
        onClick={handleClickMain} >
        <img
          src={logo}
          alt='Лого' />
      </button>
      <nav
        className='header__container' >
        <button
          type='button'
          className={
            isAuthorized && (appSize === 'tablet' || appSize === 'mobile')
              ? 'button header__navigation-btn'
              : 'button header__navigation-btn header__navigation-btn_hidden'
          }
          aria-label='Меню навигации'
          onClick={handleClickNav} />
        <button
          type='button'
          className={
            (pageName === 'main') && !isAuthorized
              ? 'button header__btn header__btn_type_signup'
              : 'button header__btn header__btn_type_signup header__btn_hidden'
          }
          aria-label='Регистрация'
          onClick={handleClickRegister} >
            Регистрация
        </button>
        <button
          type='button'
          className={
            (pageName === 'main') && !isAuthorized
              ? 'button header__btn header__btn_type_signin'
              : 'button header__btn header__btn_type_signin header__btn_hidden'
          }
          aria-label='Авторизация'
          onClick={handleClickLogin} >
            Войти
        </button>
        <button
          type='button'
          className={
            isAuthorized && !(appSize === 'tablet' || appSize === 'mobile')
              ? pageName === 'movies'
                ? 'button header__btn header__btn_type_movies header__btn_active'
                : 'button header__btn header__btn_type_movies'
              : 'button header__btn header__btn_type_movies header__btn_hidden'
          }
          aria-label='Фильмы'
          onClick={handleClickMovies} >
            Фильмы
        </button>
        <button
          type='button'
          className={
            isAuthorized && !(appSize === 'tablet' || appSize === 'mobile')
              ? pageName === 'saved'
                ? 'button header__btn header__btn_type_saved-movies header__btn_active'
                : 'button header__btn header__btn_type_saved-movies'
              : 'button header__btn header__btn_type_saved-movies header__btn_hidden'
          }
          aria-label='Сохранённые фильмы'
          onClick={handleClickSaved} >
            Сохранённые фильмы
        </button>
        <button
          type='button'
          className={
            isAuthorized && !(appSize === 'tablet' || appSize === 'mobile')
              ? (pageName === 'main')
                  ? 'button account-btn account-btn_style_dark'
                  : 'button account-btn account-btn_style_light'
              : 'button account-btn account-btn_style_dark account-btn_hidden'
          }
          aria-label='Профиль'
          onClick={handleClickProfile}>
            Аккаунт
        </button>
      </nav>
      <Navigation
        isOpenNav={isOpenNav}
        handleCloseNav={handleCloseNav}
        pageName={pageName} />
    </header>
  );
}

export default Header;
