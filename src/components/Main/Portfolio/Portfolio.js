import React from 'react';
import './Portfolio.css';
import link from '../../../images/icons/portfolio-link.svg';

function Portfolio() {
  return (
    <section
      className='portfolio' >
      <h2
        className='portfolio__title' >
          Портфолио
      </h2>
      <a
        href='#5'
        className='portfolio__link' >
          Статичный сайт
      </a>
      <a
        href='#5'
        className='portfolio__link' >
          Адаптивный сайт
      </a>
      <a
        href='#5'
        className='portfolio__link' >
          Одностраничное приложение
      </a>
    </section>
  );
}

export default Portfolio;
