import React from 'react';
import SearchForm from './SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import './Movies.css';

function Movies({
  onSubmit,
  isSearch,
  foundCards,
  isPreloader
}) {
  return (
    <main
      className='movies' >
      <SearchForm
          onSubmit={onSubmit} />
      <p
        className={
          !isPreloader && (!Array.isArray(foundCards) || !foundCards.length) && isSearch
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
