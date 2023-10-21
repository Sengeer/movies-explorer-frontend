import React from 'react';
import './Portfolio.css';

function Portfolio() {
  return (
    <section
      className='portfolio' >
      <h2
        className='portfolio__title' >
          Портфолио
      </h2>
      <a
        href='https://sengeer.github.io/how-to-learn/'
        rel="noreferrer"
        target='_blank'
        className='portfolio__link' >
          Статичный сайт
      </a>
      <a
        href='https://sengeer.github.io/russian-travel/'
        rel="noreferrer"
        target='_blank'
        className='portfolio__link' >
          Адаптивный сайт
      </a>
      <a
        href='https://sengeer.github.io/mesto/'
        rel="noreferrer"
        target='_blank'
        className='portfolio__link' >
          Одностраничное приложение
      </a>
    </section>
  );
}

export default Portfolio;
