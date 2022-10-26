import React from "react";
import logo from "../images/logo.svg";
import { Link, Route, Switch } from "react-router-dom";

function Header(props) {
  // const location = useLocation()
  // console.log(location);

  // const textButton = {
  //   text: location.pathname === "/sign-up" ? "Войти"  : "Регистрация",
  //   link: location.pathname === "/sign-up" ? "/sign-in"  : "/sign-up"
  //  }

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип" />
      <div className="header__email-button">
        <Switch>
          <Route path="/sign-up">
            {/* <Link to={textButton.link} className="header__button">{textButton.text}</Link> */}
            <Link to="/sign-in" className="header__button">
              Войти
            </Link>
          </Route>

          <Route path="/sign-in">
            <Link to="/sign-up" className="header__button">
              Регистрация
            </Link>
          </Route>

          <Route exact path="/">
            {/* суть в том, что когда мы перейдем на этот адрес, то у нас в div появится имя эмейла и кнопка.
          Кнопку не могу реализовать также как сделано выше, потому что нужно удалять токен. 
          Для этого делаю отдельную функцию в App.
          */}
            <p className="header__email">{props.email}</p>
            <button className="header__button" onClick={props.onClick}>
              Выйти
            </button>
          </Route>
        </Switch>
      </div>
    </header>
  );
}

export default Header;

//после форматирования
