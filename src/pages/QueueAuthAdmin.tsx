import React from "react";
import "../static/style.scss";
import { ReactComponent as LogoSVG } from "../images/RSK_Bank_Logo 1 (1).svg";
import { ReactComponent as EyeOffSVG } from "../images/eye-off-outline.svg";
import { ReactComponent as EyeSVG } from "../images/eye-outline.svg";
import { useAuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import styles from "../static/queueAdminAuth.module.scss";

export const QueueAuthAdmin: React.FC = () => {
  const [eyeState, setEyeState] = React.useState(false);
  const [inputType, setInputType] = React.useState("password");
  const [labelEmailState, setLabelEmailState] = React.useState(false);
  const [emailState, setEmailState] = React.useState(false);
  const [labelPasswordState, setLabelPasswordState] = React.useState(false);

  const [isLogin, setIsLogin] = React.useState(true);
  const { register, login, user } = useAuthContext();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(...data);
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
            <div className={styles.logo__title}>
              Система электронных очередей
            </div>
            <form className={styles.auth__form} onSubmit={handleSubmit}>
              <input
                type="text"
                className={styles.auth__form__email}
                name="username"
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
                Введите имя пользователя
              </label>
              {/* {!isLogin ? (<></>):null} */}
              <input
                type="text"
                className={styles.auth__form__email__real}
                name="email"
                onChange={(e) => {
                  e.target.value !== ""
                    ? setEmailState(true)
                    : setEmailState(false);
                }}
              />
              <label
                className={`${styles.auth__form__email__placeholder__real} ${
                  emailState ? `${styles.active__email__real}` : ""
                }`}
              >
                Введите электронный адрес
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
              <div className={styles.block__of__a}>
                <a
                  href="#"
                  className={styles.forgot__password__second}
                  onClick={(e) => setIsLogin(!isLogin)}
                >
                  {isLogin ? "Зарегистрироваться" : "Уже есть аккаунт?"}
                </a>
                <a href="#" className={styles.forgot__password}>
                  Забыли пароль?
                </a>
              </div>
              <button className={styles.auth__form__btn}>
                {isLogin ? "Войти" : "Регистрация"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// import React, { useState } from 'react';
// import axios from 'axios';

// interface UserData {
//   name: string;
//   email: string;
//   Другие поля пользователя
// }

// const ChangeUserData: React.FC = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');

//   const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setName(event.target.value);
//   };

//   const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setEmail(event.target.value);
//   };

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     const userData: UserData = {
//       name,
//       email,
//       Другие поля пользователя
//     };

//     try {
//       const response = await axios.patch('https://api.example.com/user/users/me', userData);
//       console.log('Данные пользователя успешно изменены:', response.data);
//     } catch (error) {
//       console.error('Ошибка при изменении данных пользователя:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Имя:
//         <input type="text" value={name} onChange={handleNameChange} />
//       </label>
//       <br />
//       <label>
//         Email:
//         <input type="email" value={email} onChange={handleEmailChange} />
//       </label>
//       <br />
//       {/* Другие поля для изменения данных */}
//       <button type="submit">Изменить данные</button>
//     </form>
//   );
// };

// export default ChangeUserData;
