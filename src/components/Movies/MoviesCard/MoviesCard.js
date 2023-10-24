import React from 'react';
import './MoviesCard.css'

function MoviesCard({
  imageUrl,
  nameRu,
  duration,
}) {
  return (
    <li className='movies__card' >
      <div
        className='movies__card-image'
        style={{ backgroundImage: `url(${imageUrl})` }} />
      <div className='movies__card-info' >
        <h2 className='movies__card-title'>
          {nameRu}
        </h2>
        <p className='movies__card-duration' >
          1ч 17м
        </p>
      </div>
      <button
        className='movies__card-btn'
        type='button'
        aria-label='Удалить карточку' />
    </li>
  );
}

export default MoviesCard;
