import React from 'react';
import './MoviesCard.css'

function MoviesCard({
  imageUrl,
  nameRu,
  duration,
  card,
  isSavedMovies
}) {
  return (
    <li className='movies__card' >
      <div
        className='movies__card-image'
        style={{ backgroundImage: `url(${imageUrl})` }} />
      <div className='movies__card-info' >
        <h2 className='movies__card-title' >
          {nameRu}
        </h2>
        <p className='movies__card-duration' >
          1ч 17м
        </p>
      </div>
      <button
        className={
          card.id === 2 || card.id === 4
            ? isSavedMovies
              ? 'movies__card-btn movies__card-btn_active movies__card-btn_type_delete'
              : 'movies__card-btn movies__card-btn_active movies__card-btn_type_saved'
            : 'movies__card-btn movies__card-btn_type_save'
        }
        type='button'
        aria-label='Удалить карточку' >
          Сохранить
      </button>
    </li>
  );
}

export default MoviesCard;
