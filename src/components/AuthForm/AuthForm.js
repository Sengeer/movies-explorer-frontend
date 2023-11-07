import React from 'react';
import './AuthForm.css'
import logo from '../../images/logo.svg';

function AuthForm({
  title,
  name,
  buttonText,
  link,
  linkHref,
  linkText,
  isValid,
  isBtnEnabled,
  onSubmit,
  isErr,
  children
})
{
  return (
    <main
      className={`auth auth_type_${name}`} >
      <a
        href='../'
        className='logo auth__logo' >
        <img
          src={logo}
          alt='Лого' />
      </a>
      <h2
        className='title auth__title' >
          {title}
      </h2>
      <form
        className={`auth__form auth__form_type_${name}`}
        name={`${name}Form`}
        onSubmit={onSubmit} >
          {children}
        <p
          className={
            isErr
              ? `auth__text-error auth__text-error_type_${name} auth__text-error_active`
              : `auth__text-error auth__text-error_type_${name}`
          } >
          {
            name === 'sign-up'
              ? 'При регистрации пользователя произошла ошибка.'
              : 'Вы ввели неправильный логин или пароль.'
          }
        </p>
        <button
          className={
            isValid && isBtnEnabled
              ? `submit-btn auth__submit-btn auth__submit-btn_type_${name}`
              : `submit-btn submit-btn_inactive auth__submit-btn auth__submit-btn_type_${name}`
          }
          type='submit'
          disabled={!isBtnEnabled} >
            {buttonText}
        </button>
      </form>
      <p
        className={`auth__link-text auth__link-text_type_${name}`} >
          {linkText}
        <a
          href={`../${linkHref}`}
          className={`link auth__link auth__link_type_${name}`} >
            {link}
        </a>
      </p>
    </main>
  );
}

export default AuthForm;
