import { useEffect } from 'react';
import './Popup.css';

function Popup({
  isOpen,
  name,
  onClose,
  children
})
{
  useEffect(() => {
    if (!isOpen || (isOpen === '')) return;

    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', closeByEscape)
    return () => document.removeEventListener('keydown', closeByEscape)
  }, [isOpen, onClose])

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
        onClose();
    }
  }

  return (
    <div
      className={`popup popup_type_${name}${isOpen ? ' popup_opened' : ''}`}
      onMouseDown={handleOverlay} >
      <div
        className={`popup__container popup__container_type_${name}`} >
          {children}
        <button
          type='button'
          className={`button popup__close-btn popup__close-btn_type_${name}`}
          aria-label='Закрыть окно'
          onClick={onClose} />
      </div>
    </div>
  );
};

export default Popup;
