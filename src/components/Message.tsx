import React from 'react';
import styles from '../pages/Chat.module.scss';
import TestImageSVG from '../images/Ellipse 499.svg';
import { useChatContext } from '../context/ChatContext';


const Message = ({ data }: any) => {
  const { chats, sendMessage, getAllMessages, messages, getHistoryMessages, historyMessages } = useChatContext();
  return (
      <div className={styles.messageFromAnotherPerson} >
        { data?.content }
    </div>
  )
}

export default Message