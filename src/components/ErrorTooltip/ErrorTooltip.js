import React from 'react';
import Popup from '../Popup/Popup';
import error from '../../images/error-tooltip.svg';

function ErrorTooltip({
  errTooltipText,
  onClose
}) {
  return (
    <Popup
      isOpen={errTooltipText}
      name='err'
      onClose={onClose} >
      <img
        src={error}
        alt='Ошибка'
        className='popup__err-image' />
      <h2
        className={
          errTooltipText === ''
            ? 'popup__err-title popup__err-title_hidden'
            : 'popup__err-title'
        } >
          {errTooltipText}
      </h2>
    </Popup>
  );
}

export default ErrorTooltip;
