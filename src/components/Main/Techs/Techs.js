import React from 'react';
import './Techs.css';

function Techs() {
  return (
    <section
      id='techs'
      className='techs' >
      <h2
        className='title title_section_techs' >
          Технологии
      </h2>
      <h3
        className='techs__subtitle' >
          7 технологий
      </h3>
      <p
        className='paragraph paragraph_section_techs' >
          На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
      </p>
      <div
        className='techs__bubbles' >
        <p
          className='techs__bubble' >
            HTML
        </p>
        <p
          className='techs__bubble' >
            CSS
        </p>
        <p
          className='techs__bubble' >
            JS
        </p>
        <p
          className='techs__bubble' >
            React
        </p>
        <p
          className='techs__bubble' >
            Git
        </p>
        <p
          className='techs__bubble' >
            Express.js
        </p>
        <p
          className='techs__bubble' >
            mongoDB
        </p>
      </div>
    </section>
  );
}

export default Techs;
