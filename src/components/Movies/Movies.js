import React from 'react';
import SearchForm from './SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import './Movies.css';

function Movies({
  onSubmit,
  isSearch,
  isSearchErr,
  initialCards,
  isPreloader,
  onMore,
  isCompletedMore
}) {
  return (
    <main
      className='movies' >
      <SearchForm
          onSubmit={onSubmit} />
      <p
        className={
          !isPreloader && (!Array.isArray(initialCards) || !initialCards.length) && isSearch
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
        !isPreloader && initialCards.length
          ? (
            <MoviesCardList
              initialCards={initialCards}
              onMore={onMore}
              isCompletedMore={isCompletedMore} />
          ) : null
      }
      <Preloader
        isPreloader={isPreloader} />
    </main>
  );
}

export default Movies;
