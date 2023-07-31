import React, { useState } from 'react';
import styles from './Chat.module.scss';

import AdminSVG from '../images/mdi_person-tie.svg';
import AdminWhiteSVG from '../images/midi_white.svg';
import OperatorSVG from '../images/mdi_person-group.svg';
import OperatorWhiteSVG from '../images/mdi_person-group_white.svg';
import UnionSVG from '../images/Union.svg';
import TestImageSVG from '../images/Ellipse 499.svg';
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackSVG from '../images/ep_back.svg';
import Message from '../components/Message';
import MessageMySelf from '../components/MessageMySelf';
import ReplySVG from '../images/streamline_mail-send-forward-email-email-send-message-envelope-actions-action-forward-arrow.svg';



const Chat = () => {
  const [ admin, setAdmin ] = useState(false);
  const [ operator, setOperator ] = useState(false);
  const [ state, setState ] = useState(false);

  const navigate = useNavigate();

  return (
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
                { operator ? (
                  <>
                    <div className={styles.operators}><img src={UnionSVG} /> Операторы</div>
                    <div className={styles.allOperatorsChats}>
                      <Link to={"/chat/detail"} className={styles.operatorsChat__item}>
                        <img src={TestImageSVG} />
                        <div className={styles.operators__info}>
                          <p>Айжан Абдыкадырова</p>
                          <p>Спасибо)</p>
                        </div>
                      </Link>
                      <Link to={"/chat/detail"} className={styles.operatorsChat__item}>
                        <img src={TestImageSVG} />
                        <div className={styles.operators__info}>
                          <p>Айжан Абдыкадырова</p>
                          <p>Спасибо)</p>
                        </div>
                      </Link>
                      <Link to={"/chat/detail"} className={styles.operatorsChat__item}>
                        <img src={TestImageSVG} />
                        <div className={styles.operators__info}>
                          <p>Айжан Абдыкадырова</p>
                          <p>Спасибо)</p>
                        </div>
                      </Link>
                      <Link to={"/chat/detail"} className={styles.operatorsChat__item}>
                        <img src={TestImageSVG} />
                        <div className={styles.operators__info}>
                          <p>Айжан Абдыкадырова</p>
                          <p>Спасибо)</p>
                        </div>
                      </Link>
                    </div>
                  </>
                ) : (
                  <div className={styles.chat}>
                    <div className={styles.chatList}>
                      <div className={styles.allOperatorsChats}>
                          <div className={styles.mainChat}>
                              <div className={styles.ChatTitle}>
                                  <img src={ArrowBackSVG} onClick={() => navigate(-1)} />
                                  Администратор Болотбек
                              </div>
                              <div className={styles.ChatSelf}>
                                  <Message/>
                                  <MessageMySelf/>
                              </div>
                              <div className={styles.inputChat}>
                                  <input type="text" placeholder='Сообщение' />
                                  <img src={ReplySVG} />
                              </div>
                          </div>
                      </div>
                    </div>
                  </div>
                ) }
            </div>
          </div>
        </div>
  )
}

export default Chat