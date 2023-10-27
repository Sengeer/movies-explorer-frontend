import React from 'react';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';

function SavedMovies() {
  return (
    <main>
      <SearchForm />
      <MoviesCardList
        isSavedMovies={true} />
    </main>
  );
}

export default SavedMovies;
