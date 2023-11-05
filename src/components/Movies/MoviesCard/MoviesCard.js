import React from 'react';
import './MoviesCard.css'

function MoviesCard({
  card,
}) {
  const [isLiked, setIsLiked] = React.useState();

  function toHoursAndMinutes(totalMinutes) {
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);

    return `${hours ? `${hours.toString()}ч ` : ''}${minutes ? `${minutes.toString()}м` : ''}`;
  }

  function onClick() {
    if (isLiked) {
      setIsLiked(false);
    } else {
      setIsLiked(true);
    };
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
          style={{ backgroundImage: `url(https://api.nomoreparties.co/${card.image.url})` }} />
        <div className='movies__card-info' >
          <h2 className='movies__card-title' >
            {card.nameRU}
          </h2>
          <p className='movies__card-duration' >
            { toHoursAndMinutes(card.duration) }
          </p>
        </div>
      </a>
      <button
        className={
          isLiked
            ? false
              ? 'movies__card-btn movies__card-btn_active movies__card-btn_type_delete'
              : 'movies__card-btn movies__card-btn_active movies__card-btn_type_saved'
            : 'movies__card-btn movies__card-btn_active movies__card-btn_type_save'
        }
        type='button'
        aria-label='Добавить фильм'
        onClick={onClick} >
          Сохранить
      </button>
    </li>
  );
}

export default MoviesCard;
