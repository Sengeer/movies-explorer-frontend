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
  children
})
{
  return (
    <div
      className={`auth auth_type_${name}`} >
      <img
        src={logo}
        alt='Лого'
        className='logo auth__logo'>
      </img>
      <h2
        className='title auth__title' >
          {title}
      </h2>
      <form
        className={`auth__form auth__form_type_${name}`}
        name={`${name}-form`} >
          {children}
        <p
          className={
            name === 'sign-up'
              ? `auth__text-error auth__text-error_type_${name} auth__text-error_active`
              : `auth__text-error auth__text-error_type_${name}`
          } >
            Что-то пошло не так...
        </p>
        <button
          className={`button auth__submit-btn auth__submit-btn_type_${name}`}
          type='submit' >
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
    </div>
  );
}

export default AuthForm;
