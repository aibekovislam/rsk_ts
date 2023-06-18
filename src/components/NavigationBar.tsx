import React from 'react';
import '../static/navbar.css';
import { ReactComponent as LogoSVG } from '../images/RSK_Bank_Logo 1.svg';

const NavigationBar = () => {
  return (
    <header>
      <div className='navigation'>
        <div className='nav__items'>
          <div className='nav__item'>
              <LogoSVG className='logo' />
          </div>
          <div className='nav__item'>
            <div className='nav__window'>
              Окно №5
            </div>
          </div>
          <div className='nav__item'>
            <div className='vac__off__on'>
              <div className='vac'>
                Перерыв
                <input type="checkbox" id="toggle-btn" />
	              <label htmlFor='toggle-btn'></label>
              </div>
            </div>
          </div>
          <div className='nav__item'>
            <div className='operator__name'>Анарбекова А.Т.</div>
          </div>
          <div className='nav__item'>
            <div className='operator__avatar'>
              <img src={require("../images/изображение 5.png")} />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default NavigationBar