import React, { useState, useEffect } from 'react';
import styles from './Chat.module.scss';

import AdminSVG from '../images/mdi_person-tie.svg';
import AdminWhiteSVG from '../images/midi_white.svg';
import OperatorSVG from '../images/mdi_person-group.svg';
import OperatorWhiteSVG from '../images/mdi_person-group_white.svg';
import { useNavigate } from 'react-router-dom';
import ReplySVG from '../images/streamline_mail-send-forward-email-email-send-message-envelope-actions-action-forward-arrow.svg';
import Message from '../components/Message';
import ArrowBackSVG from '../images/ep_back.svg';
import MessageMySelf from '../components/MessageMySelf';
import { useChatContext } from '../context/ChatContext';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import NavbarForChat from '../components/NavbarForChat';
import { useAuthContext } from '../context/AuthContext';

export let lastMessage = '';

const ChatDetail = () => {
  const [ admin, setAdmin ] = useState(false);
  const [ operator, setOperator ] = useState(true);
  const [ state, setState ] = useState(false);
  const { user1, user2, username } = useParams();

  const { sendMessage, getAllMessages, messages, getHistoryMessages, historyMessages, createChat } = useChatContext();

  useEffect(() => {
    getAllMessages(user1, user2);
    getHistoryMessages(2)
  }, [])

  const [ messageValue, setMessageValue ] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    sendMessage(messageValue, 2);
    lastMessage = messageValue;
    setMessageValue('')
  }

  const navigate = useNavigate();

  return (
   <>
    <NavbarForChat/>
     <div className={styles.windowChat} >
        <div className={styles.sidebar}>
            <div className={styles.sidebar__logo} >Рабочий чат</div>
            <hr />
            <div onClick={() => {
              setAdmin(!admin);
              setOperator(false);
            }} className={`${styles.sidebar__admin} ${admin && `${styles.blockClicked}`}`}>
              Администратор
              { admin ? (
                <img src={AdminWhiteSVG} />
              ) : (
                <img src={AdminSVG} />
              ) }
            </div>
            <div onClick={() => {
              setOperator(!operator);
              setAdmin(false);
            }} className={`${styles.sidebar__operator} ${operator && `${styles.blockClicked}`}`}>
              Операторы
              { operator ? (
                <img src={OperatorWhiteSVG} />
              ) : (
                <img src={OperatorSVG} />
              ) }
            </div>
        </div>
         <div className={styles.chat}>
            <div className={styles.chatList}>
              <div className={styles.allOperatorsChats}>
                  <div className={styles.mainChat}>
                      <div className={styles.ChatTitle}>
                          <img src={ArrowBackSVG} onClick={() => navigate(-1)} />
                          { username }
                      </div>
                      <div className={styles.ChatSelf}>
                            { historyMessages?.map((message: any) => (
                              message.sender === 2 ? (
                                <MessageMySelf data={message} />
                              ) : (<Message data={message} />)
                            )) }
                      </div>
                      <form onSubmit={handleSubmit} className={styles.inputChat}>
                          <input value={messageValue} onChange={(e) => setMessageValue(e.target.value)} type="text" placeholder='Сообщение' />
                          <img src={ReplySVG} />
                      </form>
                  </div>
              </div>
            </div>
          </div>
    </div>
   </>
  )
}

export default ChatDetail