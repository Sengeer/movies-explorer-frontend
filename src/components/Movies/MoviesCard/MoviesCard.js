import React from 'react';
import './MoviesCard.css'

function MoviesCard({
  card,
  handleClickAdd,
  handleClickDelete,
  isSavedMovies,
  savedMovies
}) {
  function toHoursAndMinutes(totalMinutes) {
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);

    return `${hours ? `${hours.toString()}ч ` : ''}${minutes ? `${minutes.toString()}м` : ''}`;
  }

  const isLiked = savedMovies.some(item => (item.movieId || item.id) === card.id);

  function onClickAdd() {
    handleClickAdd(card);
  }

  function onClickDelete() {
    handleClickDelete(card);
  }

  return (
    <li className='movies__card' >
      <a
        href={card.trailerLink}
        rel='noreferrer'
        target='_blank'
        className='link movies__card-link' >
        <div
          className='movies__card-image'
          style={
            card.image.url === undefined
              ? { backgroundImage: `url(${card.image})` }
              : { backgroundImage: `url(https://api.nomoreparties.co/${card.image.url})` }
          } />
        <div className='movies__card-info' >
          <h2 className='movies__card-title' >
            {card.nameRU}
          </h2>
          <p className='movies__card-duration' >
            { toHoursAndMinutes(card.duration) }
          </p>
        </div>
      </a>
      {
        isSavedMovies
          ?
            <button
              className='movies__card-btn movies__card-btn_active movies__card-btn_type_delete'
              type='button'
              aria-label='Удалить фильм'
              onClick={onClickDelete} />
          :
            <button
              className={
                isLiked
                  ? 'movies__card-btn movies__card-btn_active movies__card-btn_type_saved'
                  : 'movies__card-btn movies__card-btn_active movies__card-btn_type_save'
              }
              type='button'
              aria-label='Добавить или удалить фильм'
              onClick={onClickAdd} >
                Сохранить
            </button>
      }
    </li>
  );
}

export default MoviesCard;
