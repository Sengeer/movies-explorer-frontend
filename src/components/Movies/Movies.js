import React from 'react';
import SearchForm from './SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import './Movies.css';

function Movies({
  onSubmit,
  isSearch,
  isSearchErr,
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
            ? isSearchErr
              ? 'movies__message movies__message_active movies__message_type_error'
              : 'movies__message movies__message_active'
            : 'movies__message'
        } >
        {
          isSearchErr
            ? 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.'
            : 'Ничего не найдено'
        }
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
