import React from 'react';
import SearchForm from './SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from './MoviesCardList/MoviesCardList';

function Movies({ onSearch }) {
  return (
    <main>
      <SearchForm
        onSearch={onSearch} />
      <MoviesCardList />
    </main>
  );
}

export default Movies;
