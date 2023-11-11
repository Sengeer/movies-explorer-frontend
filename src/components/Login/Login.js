import { useEffect } from 'react';
import AuthForm from '../AuthForm/AuthForm';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { useNavigate } from 'react-router-dom';

function Login({ handleLogin }) {
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

  function handleTransitClick() {
    navigate('/signup', { replace: false });
  }

  function onSubmit(e) {
    e.preventDefault();

    handleLogin({
      email: values.emailInput,
      password: values.passwordInput
    });
  }

  useEffect(() => {
    resetForm();
    setIsBtnEnabled(false);
    setValues({ emailInput: '', passwordInput: '' });
  }, [resetForm, setValues, setIsBtnEnabled])

  return (
    <AuthForm
      title='Рады видеть!'
      name='sign-in'
      btnSubmit='Войти'
      btnTransit='Регистрация'
      handleTransitClick={handleTransitClick}
      btnTransitText='Ещё не зарегистрированы?&nbsp;'
      isValid={isValid}
      isBtnEnabled={isBtnEnabled}
      onSubmit={onSubmit} >
      <label
        className='auth__label auth__label_type_email'
        htmlFor='emailInput'>
          E-mail
      </label>
      <input
        type='email'
        className={
          errors.emailInput
            ? 'auth__input auth__input_type_email auth__input_type_error'
            : 'auth__input auth__input_type_email'
        }
        id='emailInput'
        name='emailInput'
        required
        value={values.emailInput || ''}
        onChange={handleChange} />
      <p
        className={
          isValid
            ? `auth__text-error auth__text-error_type_sign-in`
            : `auth__text-error auth__text-error_type_sign-in auth__text-error_active`
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
            ? `auth__text-error auth__text-error_type_sign-in`
            : `auth__text-error auth__text-error_type_sign-in auth__text-error_active`
        } >
          {errors.passwordInput}
    </p>
    </AuthForm>
  );
}

export default Login;
