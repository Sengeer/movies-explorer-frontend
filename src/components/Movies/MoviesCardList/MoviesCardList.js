import React from 'react';
import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard';
import cards from '../../../utils/staticCardData'

function MoviesCardList({
  isSavedMovies
}) {
  return (
    <section className='movies' >
      <ul className='movies__cards' >
        {cards.map(card => (
          <MoviesCard
            key={card.id}
            imageUrl={card.image.url}
            nameRu={card.nameRU}
            duration={card.duration}
            card={card}
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
            isSavedMovies
              ? 'button movies__more-btn movies__more-btn_page_saved-movies'
              : 'button movies__more-btn movies__more-btn_page_movies'
          } >
            Ещё
        </button>
      </div>
    </section>
  );
}

export default MoviesCardList;
