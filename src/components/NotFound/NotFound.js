import React from 'react';
import './NotFound.css'

function NotFound() {
  return (
    <section
      className='not-found' >
      <h2
        className='title title_place_not-found' >
          404
      </h2>
      <p
        className='not-found__text'>
          Страница не найдена
      </p>
      <button
        type='button'
        className='not-found__back-btn'>
          Назад
      </button>
    </section>
  );
}

export default NotFound;
