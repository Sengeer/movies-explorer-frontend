import React from 'react';
import './NavTab.css';

function NavTab() {
  return (
    <section
      className='nav-tab' >
      <nav
        className='nav-tab__container' >
        <a
          href='#about-project'
          className='link nav-tab__link' >
            О проекте
        </a>
        <a
          href='#techs'
          className='link nav-tab__link' >
            Технологии
        </a>
        <a
          href='#about-me'
          className='link nav-tab__link' >
            Студент
        </a>
      </nav>
    </section>
  );
}

export default NavTab;
