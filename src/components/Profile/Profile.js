import React from 'react';
import './Profile.css';

function Profile() {
  return (
    <section
      className='profile' >
      <h2
        className='title title_place_profile' >
          Привет, Виталий!
      </h2>
      <div
        className='profile__container' >
        <p
          className='profile__info' >
            Имя
        </p>
        <p
          className='profile__info' >
            Виталий
        </p>
        <p
          className='profile__info' >
            E-mail
        </p>
        <p
          className='profile__info' >
            pochta@yandex.ru
        </p>
      </div>
      <button
        className='profile__btn profile__btn_type_edit'
        type='button' >
          Редактировать
      </button>
      <button
        className='profile__btn profile__btn_type_exit'
        type='button' >
          Выйти из аккаунта
      </button>
    </section>
  );
}

export default Profile;
