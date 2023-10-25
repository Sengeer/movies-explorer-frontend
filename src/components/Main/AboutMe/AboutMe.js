import React from 'react';
import './AboutMe.css';
import myPhoto from '../../../images/my-photo.jpg'

function AboutMe() {
  return (
    <section
      id='about-me'
      className='about-me' >
      <h2
        className='title title_style_present' >
          Студент
      </h2>
      <div
        className='about-me__column' >
        <h3
          className='about-me__column-heanding' >
            Виталий
        </h3>
        <p
          className='paragraph paragraph_section_about-me' >
            Фронтенд-разработчик, 30 лет
        </p>
        <p
          className='paragraph paragraph_section_about-me' >
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить.
            С&nbsp;2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб&#8209;разработке, начал заниматься фриланс&#8209;заказами&nbsp;и ушёл с постоянной работы.
        </p>
        <a
          href='https://github.com/Sengeer'
          rel="noreferrer"
          target='_blank'
          className='about-me__git-hub' >
            Github
        </a>
      </div>
      <img
        alt='Фотография студента'
        src={myPhoto}
        className='about-me__photo' />
    </section>
  );
}

export default AboutMe;
