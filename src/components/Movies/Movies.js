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
  handleClickAdd,
  handleSearch,
  isShort,
  handleClickShort,
  savedMovies
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
      {
        isPreloader
          ? <Preloader />
          : !isPreloader
            && initialCards.length
            && isSearchRunning
            ? (
              <MoviesCardList
                initialCards={initialCards}
                onMore={onMore}
                isCompletedMore={isCompletedMore}
                handleClickAdd={handleClickAdd}
                isSavedMovies={false}
                savedMovies={savedMovies} />
              ) : null
        }
      <p
        className={
          !isPreloader
            && (!Array.isArray(initialCards) || !initialCards.length)
            && isSearchRunning
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
    </main>
  );
}

export default Movies;
