import React from "react";
import "../static/style.scss";
import "../static/queueAdminAuth.css";
import { ReactComponent as LogoSVG } from "../images/RSK_Bank_Logo 1 (1).svg";
import { ReactComponent as EyeOffSVG } from "../images/eye-off-outline.svg";
import { ReactComponent as EyeSVG } from "../images/eye-outline.svg";
import { useAuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export const QueueAuthAdmin: React.FC = () => {
  const [eyeState, setEyeState] = React.useState(false);
  const [inputType, setInputType] = React.useState("password");
  const [labelEmailState, setLabelEmailState] = React.useState(false);
  const [labelPasswordState, setLabelPasswordState] = React.useState(false);

  const [isLogin, setIsLogin] = React.useState(true);
  const { register, login, user } = useAuthContext();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (isLogin) {
      login(data);
    } else {
      register(data);
    }
  };

  if (user) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className="auth_block">
      <div className="auth_block__img">
        <img src={require("../images/Авторизация_background.jpg")} />
        <div className="auth_block__form">
          <div className="auth_block__form-child">
            <LogoSVG className="logo" />
            <div className="logo__title">Система электронных очередей</div>
            <form className="auth-form" onSubmit={handleSubmit}>
              <input
                type="text"
                className="auth-form__email"
                name="email"
                onChange={(e) => {
                  e.target.value !== ""
                    ? setLabelEmailState(true)
                    : setLabelEmailState(false);
                }}
              />
              <label
                className={`auth-form__email-placeholder ${
                  labelEmailState ? "active__email" : ""
                }`}
              >
                Введите адрес электронной почты
              </label>
              <input
                type={inputType}
                className="auth-form__password"
                name="password"
                onChange={(e) => {
                  e.target.value !== ""
                    ? setLabelPasswordState(true)
                    : setLabelPasswordState(false);
                }}
              />
              <label
                className={`auth-form__password-placeholder ${
                  labelPasswordState ? "active__password" : ""
                }`}
              >
                Введите пароль
              </label>
              {eyeState ? (
                <EyeSVG
                  className="eye"
                  onClick={() => {
                    setEyeState(!eyeState);
                    setInputType("password");
                  }}
                />
              ) : (
                <EyeOffSVG
                  className="eye"
                  onClick={() => {
                    setEyeState(!eyeState);
                    setInputType("text");
                  }}
                />
              )}
              <a href="#" className="forgot-password">
                Забыли пароль?
              </a>
              <button className="auth-form__btn">Войти</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
