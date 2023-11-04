import { useEffect } from 'react';
import AuthForm from '../AuthForm/AuthForm';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';

function Register({
  handleRegister,
  isRegisterErr
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
      buttonText='Зарегистрироваться'
      link='Войти'
      linkHref='signin'
      linkText='Уже зарегистрированы?&nbsp;'
      isValid={isValid}
      isBtnEnabled={isBtnEnabled}
      onSubmit={onSubmit}
      isErr={isRegisterErr} >
      <label
        className='auth__label auth__label_type_name'
        htmlFor='nameInput'>
          Имя
      </label>
      <input
        type='text'
        pattern='[a-zA-Zа-яА-Я\- ]{2,30}'
        className='auth__input auth__input_type_name'
        id='nameInput'
        name='nameInput'
        required
        value={values.nameInput || ''}
        onChange={handleChange} />
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
          isRegisterErr
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

export default Register;
