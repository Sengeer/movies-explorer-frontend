import React from 'react';
import './AuthForm.css'
import logo from '../../images/logo.svg';
import { useNavigate } from 'react-router-dom';

function AuthForm({
  title,
  name,
  btnSubmit,
  btnTransit,
  handleTransitClick,
  btnTransitText,
  isValid,
  isBtnEnabled,
  onSubmit,
  children,
  isLoading
})
{
  const navigate = useNavigate();

  function handleClickMain() {
    navigate('/', { replace: false });
  }

  return (
    <main
      className={`auth auth_type_${name}`} >
      <button
        type='button'
        className='button logo auth__logo'
        aria-label='Презентация'
        onClick={handleClickMain} >
        <img
          src={logo}
          alt='Лого' />
      </button>
      <h2
        className='title auth__title' >
          {title}
      </h2>
      <form
        className={`auth__form auth__form_type_${name}`}
        name={`${name}Form`}
        onSubmit={onSubmit}
        noValidate >
          {children}
        <button
          className={
            isValid && isBtnEnabled && !isLoading
              ? `submit-btn auth__submit-btn auth__submit-btn_type_${name}`
              : `submit-btn submit-btn_inactive auth__submit-btn auth__submit-btn_type_${name}`
          }
          type='submit'
          disabled={!isBtnEnabled && isLoading} >
            {btnSubmit}
        </button>
      </form>
      <p
        className={`auth__btn-text auth__btn-text_type_${name}`} >
          {btnTransitText}
        <button
          type='button'
          className={`button auth__btn auth__btn_type_${name}`}
          aria-label={btnTransit}
          onClick={handleTransitClick} >
            {btnTransit}
        </button>
      </p>
    </main>
  );
}

export default AuthForm;
