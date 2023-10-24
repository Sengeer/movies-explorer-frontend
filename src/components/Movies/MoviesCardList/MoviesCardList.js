import React from 'react';
import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard';
import cards from '../../../utils/staticCardData'

function MoviesCardList() {
  return (
    <section className='movies' >
      <ul className='movies__cards' >
        {cards.map(card => (
          <MoviesCard
            key={card.id}
            imageUrl={card.image.url}
            nameRu={card.nameRU}
            duration={card.duration}
            card={card} />
        ))}
      </ul>
      <button
        type='button'
        className='search__more-btn'>
          Ещё
      </button>
    </section>
  );
}

export default MoviesCardList;
