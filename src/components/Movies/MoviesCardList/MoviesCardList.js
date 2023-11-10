import React from 'react';
import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({
  initialCards,
  onMore,
  isCompletedMore,
  handleClickAdd,
  handleClickDelete,
  isSavedMovies
}) {
  return (
    <section className='movies__place' >
      <ul className='movies__cards' >
        {initialCards.map(card => (
          <MoviesCard
            key={card.movieId || card.id}
            card={card}
            handleClickAdd={handleClickAdd}
            handleClickDelete={handleClickDelete}
            isSavedMovies={isSavedMovies} />
        ))}
      </ul>
      <div
        className={
          isSavedMovies
            ? 'movies__more movies__more_page_saved-movies'
            : 'movies__more movies__more_page_movies'
        }>
        <button
          type='button'
          className={
            isCompletedMore || isSavedMovies
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
