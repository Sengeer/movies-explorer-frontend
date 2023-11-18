import { useEffect } from 'react';
import AuthForm from '../AuthForm/AuthForm';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { useNavigate } from 'react-router-dom';

function Register({
  handleRegister,
  isLoading
}) {
  const {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    setValues,
    isBtnEnabled,
    setIsBtnEnabled
  } = useFormAndValidation();

  const navigate = useNavigate();

  const handleEnter = (e) => (e.key === 'Enter' && !isValid) && e.preventDefault();

  function handleTransitClick() {
    navigate('/signin', { replace: false });
  }

  function onSubmit(e) {
    e.preventDefault();

    handleRegister({
      name: values.nameInput,
      email: values.emailInput,
      password: values.passwordInput
    });
  }

  useEffect(() => {
    resetForm();
    setIsBtnEnabled(false);
    setValues({ nameInput: '', emailInput: '', passwordInput: '' });
  }, [resetForm, setValues, setIsBtnEnabled])

  return (
    <AuthForm
      title='Добро пожаловать!'
      name='sign-up'
      btnSubmit='Зарегистрироваться'
      btnTransit='Войти'
      handleTransitClick={handleTransitClick}
      btnTransitText='Уже зарегистрированы?&nbsp;'
      isValid={isValid}
      isBtnEnabled={isBtnEnabled}
      onSubmit={onSubmit}
      isLoading={isLoading} >
      <label
        className='auth__label auth__label_type_name'
        htmlFor='nameInput'>
          Имя
      </label>
      <input
        type='text'
        pattern='[a-zA-Zа-яА-Я\- ]{2,30}'
        className={
          errors.nameInput
            ? 'auth__input auth__input_type_name auth__input_type_error'
            : 'auth__input auth__input_type_name'
        }
        id='nameInput'
        name='nameInput'
        required
        onKeyDown={handleEnter}
        value={values.nameInput || ''}
        onChange={handleChange} />
      <p
        className={
          isValid
            ? `auth__text-error auth__text-error_type_sign-up`
            : `auth__text-error auth__text-error_type_sign-up auth__text-error_active`
        } >
          {errors.nameInput}
      </p>
      <label
        className='auth__label auth__label_type_email'
        htmlFor='emailInput'>
          E-mail
      </label>
      <input
        type='text'
        pattern='^\S+@\S+\.\S+$'
        className={
          errors.emailInput
            ? 'auth__input auth__input_type_email auth__input_type_error'
            : 'auth__input auth__input_type_email'
        }
        id='emailInput'
        name='emailInput'
        required
        onKeyDown={handleEnter}
        value={values.emailInput || ''}
        onChange={handleChange} />
      <p
        className={
          isValid
            ? `auth__text-error auth__text-error_type_sign-up`
            : `auth__text-error auth__text-error_type_sign-up auth__text-error_active`
        } >
          {errors.emailInput}
      </p>
      <label
        className='auth__label auth__label_type_password'
        htmlFor='passwordInput'>
          Пароль
      </label>
      <input
        type='password'
        className={
          errors.passwordInput
            ? 'auth__input auth__input_type_password auth__input_type_error'
            : 'auth__input auth__input_type_password'
        }
        id='passwordInput'
        name='passwordInput'
        minLength='8'
        required
        value={values.passwordInput || ''}
        onChange={handleChange} />
      <p
        className={
          isValid
            ? `auth__text-error auth__text-error_type_sign-up`
            : `auth__text-error auth__text-error_type_sign-up auth__text-error_active`
        } >
          {errors.passwordInput}
      </p>
    </AuthForm>
  );
}

export default Register;
