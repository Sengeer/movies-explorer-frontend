import { useEffect } from 'react';
import SearchForm from './SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import './Movies.css';

function Movies({
  handleSubmit,
  onChange,
  searchValue,
  isSearchRunning,
  isSearchErr,
  initialCards,
  isPreloader,
  onMore,
  isCompletedMore,
  handleClick,
  handleSearch,
  isShort,
  handleClickShort
}) {

  useEffect(() => {
    handleSearch()
  }, [])

  return (
    <main
      className='movies' >
      <SearchForm
        handleSubmit={handleSubmit}
        onChange={onChange}
        searchValue={searchValue}
        isSavedMovies={false}
        isShort={isShort}
        handleClickShort={handleClickShort} />
      <p
        className={
          !isPreloader && (!Array.isArray(initialCards) || !initialCards.length) && isSearchRunning
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
              isCompletedMore={isCompletedMore}
              handleClick={handleClick}
              isSavedMovies={false} />
          ) : null
      }
      <Preloader
        isPreloader={isPreloader} />
    </main>
  );
}

export default Movies;
