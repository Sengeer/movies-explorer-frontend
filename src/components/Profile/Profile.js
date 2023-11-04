import React from 'react';
import './Profile.css';

function Profile() {
  return (
    <main>
      <section
        className='profile' >
        <h2
          className='title title_place_profile' >
            Привет, Виталий!
        </h2>
        <form
          className='profile__form' >
          <label
            className='profile__label'
            htmlFor='name'>
              Имя
          </label>
          <input
            type='text'
            className='profile__input'
            id='name'
            name='name'
            required />
          <label
            className='profile__label'
            htmlFor='email'>
              E-mail
          </label>
          <input
            type='email'
            className='profile__input'
            id='email'
            name='email'
            required />
          <button
            className='button profile__btn profile__btn_type_edit'
            type='submit' >
              Редактировать
          </button>
        </form>
        <button
          className='button profile__btn profile__btn_type_exit'
          type='button' >
            Выйти из аккаунта
        </button>
      </section>
    </main>
  );
}

export default Profile;
