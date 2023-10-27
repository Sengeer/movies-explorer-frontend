import React from 'react';
import AuthForm from '../AuthForm/AuthForm';

function Register() {
  return (
    <AuthForm
      title='Добро пожаловать!'
      name='sign-up'
      buttonText='Зарегистрироваться'
      link='Войти'
      linkHref='signin'
      linkText='Уже зарегистрированы?&nbsp;' >
      <label
        className='auth__label auth__label_type_name'
        for='name'>
          Имя
      </label>
      <input
        type='text'
        className='auth__input auth__input_type_name'
        id='name'
        name='name'
        required />
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
        className='auth__input auth__input_type_password auth__input_type_error'
        id='password'
        name='password'
        required />
    </AuthForm>
  );
}

export default Register;
