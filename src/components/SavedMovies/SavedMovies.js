import { useEffect } from 'react';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies({
  handleSubmit,
  onChange,
  searchValue,
  initialCards,
  isPreloader,
  handleClickDelete,
  handleSearch,
  isShort,
  handleClickShort
}) {
  useEffect(() => {
    handleSearch()
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
        <MoviesCardList
          initialCards={initialCards}
          handleClickDelete={handleClickDelete}
          isSavedMovies={true} />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
