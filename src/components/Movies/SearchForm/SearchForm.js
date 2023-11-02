import { useEffect, useState } from 'react';
import './SearchForm.css'
import { useFormAndValidation } from '../../../hooks/useFormAndValidation';

function SearchForm({ onSubmit }) {
  const {
    values,
    handleChange,
    isValid,
    setValues,
    resetForm,
  } = useFormAndValidation()

  const [isSubmit, setIsSubmit] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmit(true);

    if (isValid) {
      onSubmit(values.searchInput);
      setIsSubmit(false);
    }
  }

  useEffect(() => {
    resetForm();
    setValues({ searchInput: '' });
  }, [resetForm, setValues])

  return (
    <section
      className='search' >
      <div
        className='search__container' >
        <form
          className='search__form'
          name='searchForm'
          onSubmit={handleSubmit}
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
            value={values.searchInput || ''}
            onChange={handleChange} />
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
