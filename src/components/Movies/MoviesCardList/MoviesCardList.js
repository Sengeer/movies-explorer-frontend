import React from 'react';
import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({
  initialCards,
  onMore,
  isCompletedMore,
  handleClick
}) {
  return (
    <section className='movies__place' >
      <ul className='movies__cards' >
        {initialCards.map(card => (
          <MoviesCard
            key={card.id}
            card={card}
            handleClick={handleClick} />
        ))}
      </ul>
      <div
        className={
          false
            ? 'movies__more movies__more_page_saved-movies'
            : 'movies__more movies__more_page_movies'
        }>
        <button
          type='button'
          className={
            isCompletedMore
              ? 'button movies__more-btn movies__more-btn_hidden'
              : 'button movies__more-btn'
          }
          aria-label='Загрузить ещё'
          onClick={onMore} >
            Ещё
        </button>
      </div>
    </section>
  );
}

export default MoviesCardList;
