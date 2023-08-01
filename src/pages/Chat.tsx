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
  import { useAuthContext } from '../context/AuthContext';
  import { ChatI } from '../common/types/chatTI';
  import { chatID2 } from './ChatDetail';

  export let chatID1: any;
  
  const Chat = () => {
    const { user } = useAuthContext()
    
    useEffect(() => {
      if(user === null) {
        navigate('/auth')
      }
    }, [user])
    
    let [ privateChat, setPrivateChat ] = useState<ChatI | null>(null);
    const savedStatus = localStorage.getItem('status');
    const initialStatus = savedStatus === 'Online' ? { status: 'Online' } : { status: "Отключен" };

    const [ admin, setAdmin ] = useState(false);
    const [ operator, setOperator ] = useState(false);
    const [ state, setState ] = useState(false);

    const { getAllChats, chats, allOperatorsWorkingInBranch, operatorsInBranch, createChat, createdChat, getHistoryMessages, checkAdminAndGetAdmin, admin_state, sendMessage, getAllMessages, historyMessages } = useChatContext()

    useEffect(() => {
      checkAdminAndGetAdmin();
      getAllChats();
      allOperatorsWorkingInBranch();
    }, [])

    const navigate = useNavigate();

    const [ messageValue, setMessageValue ] = useState('');
    const [ chatCreated, setChatCreated ] = useState(false);

    const handleSubmit = (e: any) => {
      e.preventDefault();
      sendMessage(messageValue, createdChat?.id);
      setMessageValue('')
    }

    const operatorsInChatsSet = new Set(chats.map((chat: any) => chat.user2));

    const getOperatorProfileById = (operatorId: any) => {
      const operatorProfile = operatorsInBranch.find((operator: any) => operator.id === operatorId);
      return operatorProfile ? operatorProfile.profile : null;
    };

    const create_Chat = (user2ID: any) => {
      createChat(user?.id, user2ID);
    } 

    const [chatID3, setChatID3] = useState<number | null>(null);

    useEffect(() => {
      if(createdChat) {
        setPrivateChat(createdChat)
        getAllMessages(user?.id, admin_state?.id)
      }
    }, [createdChat])

    useEffect(() => {
      if(privateChat) {
        chatID1 = privateChat?.id
      }
    }, [privateChat])

    const [chatMessages, setChatMessages] = useState<{ [key: number]: string }>({});

    useEffect(() => {
      // Function to fetch and store the last message for each chat
      const fetchLastMessages = async () => {
        const chatMessagesData: { [key: number]: string } = {};
        for (const chat of chats) {
          const lastMessage = await getHistoryMessages(chat.id);
          chatMessagesData[chat.id] = lastMessage;
        }
        setChatMessages(chatMessagesData);
      };

      fetchLastMessages();
    }, [chats]);

    

    return (
      initialStatus.status === "Online" ? (
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
                        <div className={styles.operators}><img src={UnionSVG} />Чаты:</div>
                          <div className={styles.recently__chats__block}>
                            { chats.length !== 0 ? (
                              chats?.map((chat: any) => (
                                <Link key={chat.id} to={`/chat/detail/${chat.user1}/${chat.user2}/${getOperatorProfileById(chat.user2)?.first_name}/${chat.id}`} className={styles.operatorsChat__item}>
                                  <img className={styles.avatar} src={TestImageSVG} />
                                  <div className={styles.operators__info}>
                                    <p style={{ fontWeight: "700" }} >{ getOperatorProfileById(chat.user2)?.first_name && 'User' }</p>
                                    <p>{ chatMessages[chat.id] }</p>
                                  </div>
                                </Link>
                            ))
                            ) : (
                              <h3>Нету чатов, создайте новый чат.</h3>
                            ) }
                          </div>
                        </div>
                      <div className={styles.operators}><img src={OperatorSVG} /> Операторы</div>
                        { operatorsInBranch?.map((chat: any) => {
                            if (operatorsInChatsSet.has(chat.id)) {
                              return null;
                            }
                            return (
                              <Link onClick={() => {
                                create_Chat(chat.id)
                                }} to={`/chat`} className={styles.operatorsChat__item}>
                                <img
                                  className={styles.avatar}
                                  src={
                                    chat.profile.avatar === '/media/users/default.jpg'
                                      ? 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png'
                                      : `${BASE_URL}${chat.profile.avatar}`
                                  }
                                />
                                <div className={styles.operators__info}>
                                  <p style={{ fontWeight: "700" }}>{chat.profile.first_name ? chat.profile.first_name + ' ' + chat.profile.last_name : chat.username}</p>
                                  <p>Нажмите чтобы начать чат</p>
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
                                    <img className={styles.avatar} src={`${BASE_URL}${admin_state?.profile?.avatar}`} onClick={() => navigate(-1)} />
                                    Администратор { admin_state?.profile?.first_name + ' ' + admin_state?.profile?.last_name }
                                </div>
                                { chatCreated ? (
                                  <>
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
                                  </>
                                ) : (
                                  <button style={{ backgroundColor: "green", color: "white", padding: "10px 30px", borderRadius: "8px" }} onClick={() => {
                                    createChat(user?.id, admin_state?.id);
                                    setChatCreated(true);
                                    chatID1 = createdChat?.id
                                    setChatID3(createdChat?.id)
                                    navigate("/chat")
                                  }}>Начать чат с администратором</button>
                                ) }
                            </div>
                        </div>
                      </div>
                    </div>
                  ) }
              </div>
            </div>
          </div>
      ) : (
        <div>Вы отключены от системы</div>
      )
    )
  }

  export default Chat