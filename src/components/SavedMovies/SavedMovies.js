import { useEffect } from 'react';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';

function SavedMovies({
  handleSubmit,
  onChange,
  searchValue,
  initialCards,
  handleClickDelete,
  handleSearch
}) {

  useEffect(() => {
    handleSearch()
  }, [])

  return (
    <main>
      <SearchForm
        handleSubmit={handleSubmit}
        onChange={onChange}
        searchValue={searchValue}
        isSavedMovies={true} />
      <MoviesCardList
        initialCards={initialCards}
        handleClickDelete={handleClickDelete}
        isSavedMovies={true} />
    </main>
  );
}

export default SavedMovies;
