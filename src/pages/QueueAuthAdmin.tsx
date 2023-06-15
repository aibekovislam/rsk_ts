import React from 'react';
import '../static/style.css';
import '../static/queueAdminAuth.css';
import { ReactComponent as LogoSVG } from '../images/RSK_Bank_Logo 1 (1).svg';

export const QueueAuthAdmin = () => {
  return (
    <div className='auth_block'>
      <div className='auth_block__img'>
        <img src={ require("../images/Авторизация_background.jpg") } />
        <div className='auth_block__form'>
          <div className='auth_block__form-child'>
            <LogoSVG className='logo' />
            <div className='logo__title'>Система электронных очередей</div>
            <form className='auth-form'>
              <input placeholder='Введите адрес электронной почты' type="text" className='auth-form__email' />
              <input placeholder='Введите пароль' type="password" className='auth-form__password' />
              <a href='#' className='forgot-password'>Забыли пароль?</a>
              <button className='auth-form__btn'>Войти</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
