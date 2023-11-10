import { useEffect } from 'react';
import AuthForm from '../AuthForm/AuthForm';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { useNavigate } from 'react-router-dom';

function Login({
  handleLogin,
  isLoginErr
}) {
  const {
    values,
    handleChange,
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
      onSubmit={onSubmit}
      isErr={isLoginErr} >
      <label
        className='auth__label auth__label_type_email'
        htmlFor='emailInput'>
          E-mail
      </label>
      <input
        type='email'
        className='auth__input auth__input_type_email'
        id='emailInput'
        name='emailInput'
        required
        value={values.emailInput || ''}
        onChange={handleChange} />
      <label
        className='auth__label auth__label_type_password'
        htmlFor='passwordInput'>
          Пароль
      </label>
      <input
        type='password'
        className={
          isLoginErr
            ? 'auth__input auth__input_type_password auth__input_type_error'
            : 'auth__input auth__input_type_password'
        }
        id='passwordInput'
        name='passwordInput'
        required
        value={values.passwordInput || ''}
        onChange={handleChange} />
    </AuthForm>
  );
}

export default Login;
