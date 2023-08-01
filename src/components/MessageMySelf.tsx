import React from 'react';
import { useChatContext } from '../context/ChatContext';
import styles from '../pages/Chat.module.scss';


const MessageMySelf = ({ data }: any) => {
  const { chats, sendMessage, getAllMessages, messages, getHistoryMessages, historyMessages } = useChatContext();

  return (
    <div className={styles.messageMySelf} >{ data?.content }</div>
  )
}

export default MessageMySelf