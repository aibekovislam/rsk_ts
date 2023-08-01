  import React, { useState, useEffect } from 'react';
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
  import { useChatContext } from '../context/ChatContext';
  import { BASE_URL } from '../utils/consts';
  import ChatDetail, { lastMessage } from './ChatDetail';
import { useAuthContext } from '../context/AuthContext';



  const Chat = () => {
    const [ admin, setAdmin ] = useState(false);
    const [ operator, setOperator ] = useState(false);
    const [ state, setState ] = useState(false);

    const { getAllChats, chats, allOperatorsWorkingInBranch, operatorsInBranch, createChat } = useChatContext()

    const { user } = useAuthContext()

    useEffect(() => {
      getAllChats();
      allOperatorsWorkingInBranch();
    }, [])

    const navigate = useNavigate();

    const operatorsInChatsSet = new Set(chats.map((chat: any) => chat.user2));

    const getOperatorProfileById = (operatorId: any) => {
      const operatorProfile = operatorsInBranch.find((operator: any) => operator.id === operatorId);
      return operatorProfile ? operatorProfile.profile : null;
    };

    const create_Chat = (user2ID: any) => {
      createChat(user?.id, user2ID);
    }  

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
                      <div className={styles.allOperatorsChats}>
                        <div className={styles.recently__chats}>
                        <div className={styles.operators}><img src={UnionSVG} /> Недавние чаты:</div>
                          <div className={styles.recently__chats__block}>
                            { chats?.map((chat: any) => (
                              <Link to={`/chat/detail/${chat.user1}/${chat.user2}/${getOperatorProfileById(chat.user2)?.first_name}`} className={styles.operatorsChat__item}>
                                <img className={styles.avatar} src={TestImageSVG} />
                                <div className={styles.operators__info}>
                                  <p>{ getOperatorProfileById(chat.user2)?.first_name }</p>
                                  <p>{ lastMessage }</p>
                                </div>
                              </Link>
                            )) }
                          </div>
                        </div>
                      <div className={styles.operators}><img src={OperatorSVG} /> Операторы</div>
                        { operatorsInBranch?.map((chat: any) => {
                            if (operatorsInChatsSet.has(chat.id)) {
                              return null;
                            }
                            return (
                              <Link onClick={() => create_Chat(chat.id)} to={'/chat/detail'} className={styles.operatorsChat__item}>
                                <img
                                  className={styles.avatar}
                                  src={
                                    chat.profile.avatar === '/media/users/default.jpg'
                                      ? 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png'
                                      : `${BASE_URL}${chat.profile.avatar}`
                                  }
                                />
                                <div className={styles.operators__info}>
                                  <p>{chat.profile.first_name ? chat.profile.first_name + ' ' + chat.profile.last_name : chat.username}</p>
                                  <p>Спасибо)</p>
                                </div>
                              </Link>
                            );          
                        }) }
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