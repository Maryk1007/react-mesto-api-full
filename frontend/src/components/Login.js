import { useState, useCallback } from "react";

function Login({handleLogin}) {
  const [isContentSubmitButton, setContentSubmitButton] = useState('Войти');
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
    handleLogin({
      email,
      password,
      onRenderLoading: ()=>{
        renderLoading(false)
      },
    })
  }

// изменение текста кнопки при отправке формы
  const renderLoading = (isLoading)=>{
    isLoading ? setContentSubmitButton('Вход...') : setContentSubmitButton('Войти')
  }

  return (
    <section className="auth">
      <h2 className="auth__title">Вход</h2>
      <form
        className="form-startpage"
        name="login"
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
            placeholder="Введите ваш пароль" />
          <span className="form-startpage__field-error" id="error-password"></span>
        </div>
        <button
          className="form-startpage__button"
          type="submit"
          name="submit">{isContentSubmitButton}</button>
      </form>
    </section>
  )
}

export default Login;

