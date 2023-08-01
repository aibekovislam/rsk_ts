import axios from 'axios';
import React, { createContext, PropsWithChildren, useContext, useReducer, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { chatID1 } from '../pages/Chat';
import { chatID2 } from '../pages/ChatDetail';
import $axios from '../utils/axios';
import { ACTIONS, BASE_URL } from '../utils/consts';

interface ChatTypes {
    chats: object,
}

const chatContext = createContext<ChatTypes | any>(null);

export function useChatContext() {
    return useContext(chatContext);
}

export interface ChatProps {
    children?: React.ReactNode | any
}

const initState = {
    chats: [],
    messages: [],
    messages2: [],
    operatorsInBranch: [],
    historyMessages: [],
    createdChat: null,
    admin: null
}

function reducer(state: any, action: any) {
    switch (action.type) {
        case ACTIONS.chats:
            return { ...state, chats: action.payload }
        case ACTIONS.messages:
            return { ...state, messages: action.payload }
        case ACTIONS.operatorsInBranch:
            return { ...state, operatorsInBranch: action.payload }
        case ACTIONS.historyMessages:
            return { ...state, historyMessages: action.payload }
        case ACTIONS.createdChat:
            return { ...state, createdChat: action.payload }
        case ACTIONS.admin:
            return { ...state, admin: action.payload }
        case ACTIONS.messages2:
            return { ...state, messages2: action.payload }
        default:
            return state;
    }
}

export const ChatContext = ({ children }: PropsWithChildren) => {
    const [ state, dispatch ] = useReducer(reducer, initState);

    const navigate = useNavigate();

    const getAllChats = async () => {
        try {
            const response = await $axios.get(`${BASE_URL}/chat/private_chat/get_chats/`);
            dispatch({
                type: ACTIONS.chats,
                payload: response.data
            })
        } catch (error) {
            console.log(error)
        }
    }

    const processedMessageIds = new Set();  

    const getAllMessages = async (user_id: string, cient_id: string) => {
        try {
            const websocketURL = `ws://35.228.114.191/ws/private_chat/${user_id}/${cient_id}/`;
            const websocket = new WebSocket(websocketURL);

            websocket.onopen = () => {
                console.log('WebSocket connection is open.')
            }
            
            // Event listener for incoming messages from the server
            websocket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                console.log('Received data from the server:', data);
                const messageID = data?.message?.id;

                dispatch({
                    type: ACTIONS.messages,
                    payload: data
                })
                if(chatID2) {
                    getHistoryMessages(Number(chatID2))
                } else if(chatID1) {
                    getHistoryMessages(+chatID1)
                }
            };
            
            // Event listener for WebSocket errors
            websocket.onerror = (error) => {
                console.error('WebSocket error:', error);
            };
            
            // Event listener for when the connection is closed
            websocket.onclose = (event) => {
                console.log('WebSocket connection is closed.', event.code, event.reason);
            };
            } catch (error) {
                console.log(error)
            }
    }

    const createChat = async (user1: number, user2: number) => {
        try {
            const data = {
                user1: user1,
                user2: user2
            }
            const response = await $axios.post(`${BASE_URL}/chat/private_chat/create_chat/`, data);
            dispatch({
                type: ACTIONS.createdChat,
                payload: response.data
            })
        } catch (error) {
            console.log(error)
        }
    }

    const sendMessage = async (content: string, chat_id: number) => {
        try {
            const data = {
                content: content
            }
            const resposne = await $axios.post(`${BASE_URL}/chat/private_message/send/${chat_id}/`, data);
            console.log(resposne.data);
        } catch (error) {
            console.log(error)
        }
    }

    const allOperatorsWorkingInBranch = async () => {
        try {
            const response = await $axios.get(`${BASE_URL}/tickets/operator/get_branch_users/`)
            dispatch({
                type: ACTIONS.operatorsInBranch,
                payload: response.data
            })
        } catch (error) {
            console.log(error)
        }
    }

    const getHistoryMessages = async (private_chat_id: number) => {
        try {
          const response = await $axios.get(`${BASE_URL}/chat/private_message/messages/${private_chat_id}/`);
          dispatch({
            type: ACTIONS.historyMessages,
            payload: response.data
          });
      
          const messages = response.data;
          if (messages.length > 0) {
            const lastMessage = messages[messages.length - 1];
            return lastMessage.content;
          } else {
            return 'Последних сообщений нет';
          }
        } catch (error) {
          console.log(error);
          return '';
        }
      };

      const checkAdminAndGetAdmin = async () => {
        try {
          const response = await $axios.get(`${BASE_URL}/tickets/operator/get_branch_users/`);
          const users = response.data;
      
          const admin = users.find((user: any) => user.profile.position !== "operator" && user.profile.position !== "regular" && user.profile.position !== "registrator");

          dispatch({
            type: ACTIONS.admin,
            payload: admin
          });
        } catch (error) {
          console.log(error);
          return null;
        }
      };
      
      

    const value = {
        getAllChats,
        chats: state.chats,
        getAllMessages,
        messages: state.messages,
        createChat,
        sendMessage,
        allOperatorsWorkingInBranch,
        operatorsInBranch: state.operatorsInBranch,
        getHistoryMessages,
        historyMessages: state.historyMessages,
        createdChat: state.createdChat,
        checkAdminAndGetAdmin,
        admin_state: state.admin,
    }

    return <chatContext.Provider value={value}>{children}</chatContext.Provider>
}