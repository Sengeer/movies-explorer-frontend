import React from 'react';
import './SearchForm.css'

function SearchForm() {
  return (
    <section
      className='search' >
      <div
        className='search__container' >
        <form
          className='search__form'
          name='searchForm' >
          <input
            type='search'
            className='search__input'
            name='searchInput'
            placeholder='Фильм'
            required />
          <button
            type='submit'
            className='button search__submit-btn' >
              Найти
          </button>
        </form>
        <button
          type='button'
          className='button search__filter-btn search__filter-btn_active' >
            Короткометражки
        </button>
      </div>
    </section>
  );
}

export default SearchForm;
