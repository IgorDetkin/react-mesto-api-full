import React from "react";
import { useState } from "react";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleAddEmail(e) {
    setEmail(e.target.value);
  }

  function handleAddPassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin({ email, password });
  }

  return (
    <section className="sign">
      <div className="sign__container">
        <form
          name="registration"
          className="sign__form"
          onSubmit={handleSubmit}
        >
          <h2 className="sign__title">Вход</h2>

          <label className="sign__form-field">
            <input
              name="email"
              id="email-input"
              type="text"
              placeholder="Email"
              value={email || ""} // если просто указать name, то консоль ругается
              onChange={handleAddEmail}
              className="sign__name"
              required
              minLength="2"
              maxLength="40"
              autoComplete="off"
            />
          </label>

          <label className="sign__form-field">
            <input
              name="password"
              id="password-input"
              type="password"
              placeholder="Пароль"
              value={password || ""} // если просто указать name, то консоль ругается
              onChange={handleAddPassword}
              className="sign__name"
              required
              minLength="2"
              maxLength="200"
              autoComplete="off"
            />
          </label>

          <button
            type="submit"
            aria-label="sign-submit"
            className="sign__form-submit sign__app"
          >
            Войти
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;
