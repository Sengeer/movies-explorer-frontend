import { useEffect } from 'react';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import './SavedMovies.css'

function SavedMovies({
  handleSubmit,
  onChange,
  searchValue,
  isSearchRunningSaved,
  isSearchErr,
  initialCards,
  isPreloader,
  handleClickDelete,
  handleTransition,
  isShort,
  handleClickShort,
  savedMovies
}) {
  useEffect(() => {
    handleTransition()
    return () => {
      handleTransition()
    };
  }, [])

  if (isPreloader) {
    return
  }

  return (
    <>
      <main>
        <SearchForm
          handleSubmit={handleSubmit}
          onChange={onChange}
          searchValue={searchValue}
          isSavedMovies={true}
          isShort={isShort}
          handleClickShort={handleClickShort} />
        {
          !isPreloader
            && initialCards.length
            ? (
              <MoviesCardList
                initialCards={initialCards}
                handleClickDelete={handleClickDelete}
                isSavedMovies={true}
                savedMovies={savedMovies} />
            )
            : null
        }
        <p
          className={
            !isPreloader
              && (!Array.isArray(initialCards) || !initialCards.length)
              && isSearchRunningSaved
              ? isSearchErr
                ? 'saved-movies__message saved-movies__message_active saved-movies__message_type_error'
                : 'saved-movies__message saved-movies__message_active'
              : 'saved-movies__message'
          } >
          {
            isSearchErr
              ? 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.'
              : 'Ничего не найдено'
          }
        </p>
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
