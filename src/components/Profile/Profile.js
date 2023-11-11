import {
  useEffect,
  useContext,
  useState
} from 'react';
import './Profile.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';

function Profile({
  handleSubmit,
  isProfileSaved,
  handleProfileSaved,
  handleExit
}) {
  const {
    values,
    handleChange,
    isValid,
    setValues,
    resetForm,
    isBtnEnabled,
    setIsBtnEnabled
  } = useFormAndValidation()
  const [isDisableEdit, setIsDisableEdit] = useState(true);
  const [isShowText, setIsShowText] = useState(true);

  const currentUser = useContext(CurrentUserContext);

  function onSubmit(e) {
    e.preventDefault();
    handleSubmit({
      email: values.emailInput,
      name: values.nameInput
    });
    setValues({
      nameInput: currentUser.name,
      emailInput: currentUser.email
    });
    setIsDisableEdit(true);
  }

  function onClick() {
      setIsDisableEdit(false);
  }

  useEffect(() => {
    resetForm();
    setIsBtnEnabled(false);
    setValues({
      nameInput: currentUser.name,
      emailInput: currentUser.email
    });
  }, [currentUser, resetForm, setValues, setIsBtnEnabled])

  useEffect(() => {
    setIsShowText(true);
    setTimeout(function() {
      setIsShowText(false);
      handleProfileSaved();
    }, 3000);
  }, [handleSubmit])

  return (
    <main>
      <section
        className='profile' >
        <h2
          className='title title_place_profile' >
            {`Привет, ${currentUser.name}`}
        </h2>
        <form
          className='profile__form'
          name='editForm'
          onSubmit={onSubmit} >
          <label
            className='profile__label'
            htmlFor='nameInput' >
              Имя
          </label>
          <input
            type='text'
            pattern='[a-zA-Zа-яА-Я\- ]{2,30}'
            className='profile__input'
            id='nameInput'
            name='nameInput'
            required
            disabled={isDisableEdit}
            value={values.nameInput || ''}
            onChange={handleChange} />
          <label
            className='profile__label'
            htmlFor='emailInput'>
              E-mail
          </label>
          <input
            type='email'
            className='profile__input'
            id='emailInput'
            name='emailInput'
            required
            disabled={isDisableEdit}
            value={values.emailInput || ''}
            onChange={handleChange} />
          <p
            className={
              isProfileSaved && isShowText
                ? 'profile__text'
                : 'profile__text profile__text_hidden'
            } >
              Данные успешно сохранены
          </p>
          <button
            className={
              isDisableEdit
                ? 'submit-btn submit-btn_inactive profile__submit-btn profile__submit-btn_hidden'
                : isValid && isBtnEnabled
                  ? 'submit-btn profile__submit-btn'
                  : 'submit-btn submit-btn_inactive profile__submit-btn'
            }
            type='submit' >
              Сохранить
          </button>
        </form>
        <button
          className={
            isDisableEdit
              ? 'button profile__btn profile__btn_type_edit'
              : 'button profile__btn profile__btn_hidden profile__btn_type_edit'
          }
          type='button'
          onClick={onClick} >
            Редактировать
        </button>
        <button
          className={
            isDisableEdit
              ? 'button profile__btn profile__btn_type_exit'
              : 'button profile__btn profile__btn_hidden profile__btn_type_exit'
          }
          type='button'
          onClick={handleExit}>
            Выйти из аккаунта
        </button>
      </section>
    </main>
  );
}

export default Profile;
