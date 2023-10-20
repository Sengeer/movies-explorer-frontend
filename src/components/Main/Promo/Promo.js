import React from 'react';
import './Promo.css';
import backgroundLogo from '../../../images/background-logo.png'

function Promo() {
  return (
    <section
      className='promo' >
      <img
        src={backgroundLogo}
        alt='Логотип на заднем фоне'
        className='promo__background-logo' >
      </img>
      <h1
        className='promo__title' >
          Учебный проект студента факультета Веб-разработки.
      </h1>
    </section>
  );
}

export default Promo;
