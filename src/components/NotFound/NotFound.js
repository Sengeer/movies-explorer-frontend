import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css'

function NotFound() {
  const navigate = useNavigate();

  function onClickBack() {
    navigate(-1);
  }

  return (
    <section
      className='not-found' >
      <h2
        className='title not-found__title' >
          404
      </h2>
      <p
        className='not-found__text' >
          Страница не найдена
      </p>
      <button
        type='button'
        className='button not-found__back-btn'
        onClick={onClickBack}>
          Назад
      </button>
    </section>
  );
}

export default NotFound;
