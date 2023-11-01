import React from 'react';
import SearchForm from './SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import './Movies.css';

function Movies({
  onSearch,
  foundCards,
  isPreloader
}) {

  console.log(foundCards);
  return (
    <main
      className='movies' >
      <SearchForm
        onSearch={onSearch} />
      <p
        className={
          !isPreloader && (!Array.isArray(foundCards) || !foundCards.length)
            ? 'movies__message movies__message_active'
            : 'movies__message'
        } >
          Ничего не найдено
      </p>
      {
        !isPreloader && foundCards.length
          ? (
            <MoviesCardList
              foundCards={foundCards} />
          ) : null
      }
      <Preloader
        isPreloader={isPreloader} />
    </main>
  );
}

export default Movies;
