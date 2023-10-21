import React from 'react';
import './NavTab.css';

function NavTab() {
  return (
    <section
      className='nav-tab' >
      <nav
        className='nav-tab__container' >
        <a
          href='#1'
          className='nav-tab__link' >
            О проекте
        </a>
        <a
          href='#2'
          className='nav-tab__link' >
            Технологии
        </a>
        <a
          href='#3'
          className='nav-tab__link' >
            Студент
        </a>
      </nav>
    </section>
  );
}

export default NavTab;
