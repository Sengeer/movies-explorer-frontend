import React from 'react';
import './AboutProject.css';

function AboutProject() {
  return (
    <section
      id='about-project'
      className='about-project' >
      <h2
        className='title title_place_presentation' >
          О проекте
      </h2>
      <div
        className='about-project__column about-project__column_content_stages' >
        <h3
          className='about-project__column-heanding' >
            Дипломный проект включал 5 этапов
        </h3>
        <p
          className='paragraph about-project__paragraph' >
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
        </p>
      </div>
      <div
        className='about-project__column' >
        <h3
          className='about-project__column-heanding about-project__column_content_weeks' >
            На выполнение диплома ушло 5 недель
        </h3>
        <p
          className='paragraph about-project__paragraph' >
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
        </p>
      </div>
      <div
        className='about-project__stages' >
        <figure
          className='about-project__stage about-project__stage_type_backend' >
          <p
            className='about-project__stage-step about-project__stage-step_type_backend' >
              1 неделя
          </p>
          <figcaption
            className='about-project__stage-signature about-project__stage-signature_type_backend' >
              Back-end
          </figcaption>
        </figure>
        <figure
          className='about-project__stage about-project__stage_type_frontend' >
          <p
            className='about-project__stage-step about-project__stage-step_type_frontend' >
              4 недели
          </p>
          <figcaption
            className='about-project__stage-signature about-project__stage-signature_type_frontend' >
              Front-end
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export default AboutProject;
