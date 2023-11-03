import { useState } from 'react';
import './SearchForm.css'

function SearchForm({
  handleSubmit,
  onChange,
  searchValue
}) {
  const [isSubmit, setIsSubmit] = useState(false);
  const [isValid, setIsValid] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    setIsSubmit(true);

    if (isValid) {
      handleSubmit(searchValue);
      setIsSubmit(false);
    };
  }

  return (
    <section
      className='search' >
      <div
        className='search__container' >
        <form
          className='search__form'
          name='searchForm'
          onSubmit={onSubmit}
          noValidate >
          <input
            type='search'
            className={
              !isValid && isSubmit
                ? 'search__input search__input_error'
                : 'search__input'
            }
            name='searchInput'
            placeholder={
              !isValid && isSubmit
                ? 'Нужно ввести ключевое слово'
                : 'Фильм'
            }
            required
            autoComplete='off'
            value={searchValue}
            onChange={e => {
              onChange(e.target.value);
              setIsValid(e.target.checkValidity());
            }} />
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
