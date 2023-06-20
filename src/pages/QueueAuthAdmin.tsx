import React from "react";
import "../static/style.scss";
import { ReactComponent as LogoSVG } from "../images/RSK_Bank_Logo 1 (1).svg";
import { ReactComponent as EyeOffSVG } from "../images/eye-off-outline.svg";
import { ReactComponent as EyeSVG } from "../images/eye-outline.svg";
import { useAuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import styles from '../static/queueAdminAuth.module.scss';

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
    <div className={styles.auth_block}>
      <div className={styles.auth_block__img}>
        <img src={require("../images/Авторизация_background.jpg")} />

        <div className={styles.auth_block__form}>
          <div className={styles.auth_block__form__child}>
            <LogoSVG className={styles.logo} />
            <div className={styles.logo__title}>Система электронных очередей</div>
            <form className={styles.auth__form} onSubmit={handleSubmit}>
              <input
                type="text"
                className={styles.auth__form__email}
                name="email"
                onChange={(e) => {
                  e.target.value !== ""
                    ? setLabelEmailState(true)
                    : setLabelEmailState(false);
                }}
              />
              <label
                className={`${styles.auth__form__email__placeholder} ${
                  labelEmailState ? `${styles.active__email}` : ""
                }`}
              >
                Введите адрес электронной почты
              </label>
              <input
                type={inputType}
                className={styles.auth__form__password}
                name="password"
                onChange={(e) => {
                  e.target.value !== ""
                    ? setLabelPasswordState(true)
                    : setLabelPasswordState(false);
                }}
              />
              <label
                className={`${styles.auth__form__password__placeholder} ${
                  labelPasswordState ? `${styles.active__password}` : ""
                }`}
              >
                Введите пароль
              </label>
              {eyeState ? (
                <EyeSVG
                  className={styles.eye}
                  onClick={() => {
                    setEyeState(!eyeState);
                    setInputType("password");
                  }}
                />
              ) : (
                <EyeOffSVG
                  className={styles.eye}
                  onClick={() => {
                    setEyeState(!eyeState);
                    setInputType("text");
                  }}
                />
              )}
              <a href="#" className={styles.forgot__password}>
                Забыли пароль?
              </a>
              <button className={styles.auth__form__btn}>Войти</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
