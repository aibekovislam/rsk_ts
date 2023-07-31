import React from 'react';
import styles from '../pages/Chat.module.scss';
import TestImageSVG from '../images/Ellipse 499.svg';


const Message = () => {
  return (
      <div className={styles.messageFromAnotherPerson} >
        Привет, чем могу помочь?
    </div>
  )
}

export default Message