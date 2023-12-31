import React from 'react';
import './Footer.css'

function Footer({ isPreloader }) {
  return (
    <footer
      className={
        isPreloader
          ? 'footer footer_hidden'
          : 'footer'
      } >
      <h2
        className='footer__info footer__info_content_project' >
          Учебный проект Яндекс.Практикум х BeatFilm.
      </h2 >
      <div
        className='footer__links' >
        <a
          href='https://practicum.yandex.ru/'
          rel='noreferrer'
          target='_blank'
          className='link footer__link' >
            Яндекс.Практикум
        </a>
        <a
          href='https://github.com/Sengeer'
          rel='noreferrer'
          target='_blank'
          className='link footer__link' >
            Github
        </a>
      </div>
      <p
        className='footer__info footer__info_content_copyright' >
          &#169;2023
      </p>
    </footer>
  );
}

export default Footer;
