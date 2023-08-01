import axios from 'axios';
import React, { createContext, PropsWithChildren, useContext, useReducer, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
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
    operatorsInBranch: [],
    historyMessages: []
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

                dispatch({
                    type: ACTIONS.messages,
                    payload: data
                })
                getHistoryMessages(2)
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
            const response = await $axios.post(`${BASE_URL}/chat/private_chat/create_chat/`, data)
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

    const getHistoryMessages = async (private_chat_id:number) => {
        try {
            const response = await $axios.get(`${BASE_URL}/chat/private_message/messages/${private_chat_id}/`);
            dispatch({
                type: ACTIONS.historyMessages,
                payload: response.data
            })
        } catch (error) {
            console.log(error)
        }
    }

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
        historyMessages: state.historyMessages
    }

    return <chatContext.Provider value={value}>{children}</chatContext.Provider>
}