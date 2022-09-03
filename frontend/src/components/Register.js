import { useState, useCallback } from "react";
import { NavLink } from 'react-router-dom';

function Register({handleRegister}) {
  const [isContentSubmitButton, setContentSubmitButton] = useState('Зарегистрироваться');
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = data;

  const handleChange = useCallback((evt)=>{
    const { name, value } = evt.target
    setData(prevState=>({...prevState, [name]: value}))
  }, [setData]);

  const handleSubmit = (evt)=>{
    evt.preventDefault();
    renderLoading(true);
    handleRegister({
      email,
      password,
      onRenderLoading: ()=>{
        renderLoading(false)
      },
    })
  }

// изменение текста кнопки при отправке формы
  const renderLoading = (isLoading)=>{
    isLoading ? setContentSubmitButton('Регистрация...') : setContentSubmitButton('Зарегистрироваться')
  }

  return (
    <section className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form
        className="form-startpage"
        name="register"
        onSubmit={handleSubmit}
        noValidate>
        <div className="form-startpage__field">
          <input
            className="form-startpage__input"
            value={email || ''}
            onChange={handleChange}
            type="email"
            name="email"
            id="email-input"
            required
            placeholder="Введите ваш email" />
          <span className="form-startpage__field-error" id="error-email"></span>
        </div>
        <div className="form-startpage__field">
          <input
            className="form-startpage__input"
            value={password || ''}
            onChange={handleChange}
            type="password"
            name="password"
            id="password-input"
            required
            placeholder="Придумайте надежный пароль" />
          <span className="form-startpage__field-error" id="error-password"></span>
        </div>
        <button
          className="form-startpage__button"
          type="submit"
          name="submit">{isContentSubmitButton}</button>
      </form>
      <p className='auth__logintip'>Уже зарегистрированы?
        <NavLink to="/sign-in" className="auth__login-link"> Войти</NavLink>
      </p>
    </section>
  )
}

export default Register;
