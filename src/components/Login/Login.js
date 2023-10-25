import React from 'react';
import AuthWithForm from '../AuthWithForm/AuthWithForm';

function Login() {
  return (
    <AuthWithForm
      title='Рады видеть!'
      name='sign-in'
      buttonText='Войти'
      link='Регистрация'
      linkHref='signup'
      linkText='Ещё не зарегистрированы?&nbsp;' >
      <label
        className='auth__label auth__label_type_email'
        for='email'>
          E-mail
      </label>
      <input
        type='email'
        className='auth__input auth__input_type_email'
        id='email'
        name='email'
        required />
      <label
        className='auth__label auth__label_type_password'
        for='password'>
          Пароль
      </label>
      <input
        type='password'
        className='auth__input auth__input_type_password'
        id='password'
        name='password'
        required />
    </AuthWithForm>
  );
}

export default Login;
