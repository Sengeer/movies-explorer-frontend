import React from 'react';
import './MoviesCard.css'

function MoviesCard({
  imageUrl,
  nameRu,
  duration,
}) {
  return (
    <li className='movies__item' >
      <div
        className='movies__item-image'
        style={{ backgroundImage: `url(${imageUrl})` }} />
      <div className='movies__item-info' >
        <h2 className='movies__item-title'>
          {nameRu}
        </h2>
        <p className='movies__item-duration' >
          1ч 17м
        </p>
      </div>
      <button
        className='movies__item-btn'
        type='button'
        aria-label='Удалить карточку' />
    </li>
  );
}

export default MoviesCard;
