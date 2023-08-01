import axios from 'axios';
import React, { createContext, PropsWithChildren, useContext, useReducer, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import $axios from '../utils/axios';
import { ACTIONS, BASE_URL } from '../utils/consts';

interface QueueTypes {
    queues: object,
}

const queueContext = createContext<QueueTypes | any>(null);

export function useQueueContext() {
    return useContext(queueContext);
}

export interface QueueProps {
    children?: React.ReactNode | any
}

const initState = {
    queues: [],
    oneQueue: null,
    inQueue: [],
    rejectedQueue: [],
    windows: [],
    shiftedQueues: [],
    allQueues: [],
    booking: [],
    error400: null
}

let newQueues = [];

function reducer(state: any, action: any) {
    switch (action.type) {
        case ACTIONS.queues:
            return { ...state, queues: action.payload }
        case ACTIONS.inQueue:
            return { ...state, inQueue: action.payload }
        case ACTIONS.queue:
            return { ...state, queue: action.payload }
        case ACTIONS.rejectedQueue:
            return { ...state, rejectedQueue: action.payload }
        case ACTIONS.statusOfOperator:
            return { ...state, statusOfOperator: action.payload }
        case ACTIONS.windows:
            return { ...state, windows: action.payload }
        case ACTIONS.shiftedQueues:
            return { ...state, shiftedQueues: action.payload }
        case ACTIONS.allQueues:
            return { ...state, allQueues: action.payload }
        case ACTIONS.booking:
            return { ...state, booking: action.payload }
        case ACTIONS.error400:
            return { ...state, error400: action.payload }
        case ACTIONS.waitingLIST:
            return { ...state, waitingLIST: action.payload }      
        default:
            return state;
    }
}

export const QueueContext = ({ children }: PropsWithChildren) => {
    const [ state, dispatch ] = useReducer(reducer, initState);

    const navigate = useNavigate();


    function getCustomers() {

        const userID = localStorage.getItem("userID");

        const websocketURL = `ws://35.228.114.191/ws/customers/${userID}/`;
        const websocket = new WebSocket(websocketURL);

        websocket.onopen = () => {
            console.log('WebSocket connection is open.')
        }

        // Event listener for incoming messages from the server
        websocket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('Received data from the server:', data);

            const sortedData = data?.ticket_data.sort((a: any, b: any) => a.position - b.position)

            dispatch({
                type: ACTIONS.queues,
                payload: sortedData
            })
        };
        
        // Event listener for WebSocket errors
        websocket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
        
        // Event listener for when the connection is closed
        websocket.onclose = (event) => {
            console.log('WebSocket connection is closed.', event.code, event.reason);
        };
    }

    async function getAllQueues() {
        try {
            const res = await $axios.get(`${BASE_URL}/tickets/operator/get_served_customers_all/`);
            dispatch({
                type: ACTIONS.allQueues,
                payload: res.data
            })
        } catch (error) {
            console.log(error)
        }
    }

    async function deleteQueue(id:number) {
        try {
            const res = await axios.delete(`${BASE_URL}/customers/${id}`);
            getCustomers()
        } catch (error) {
            console.log(error)
        }
    }

    async function getRejectedQueue() {
        try {
            const res = await $axios.get(`${BASE_URL}/tickets/operator/get_cancelled_customers/`);
            dispatch({
                type: ACTIONS.rejectedQueue,
                payload: res.data
            })
            console.log(state.rejectedQueue);
        } catch (error) {
            console.log(error)
        }
    }

    async function rejectQueue(id: number) {
        try {
            const res = await $axios.post(`${BASE_URL}/tickets/operator/${id}/mark_as_cancelled/`);
            navigate("/operator/queue");
            console.log(res.data);
        } catch (error) {
            console.log(error)
        }
    }
 
    const handleDragEnd = (result: any) => {
        if (!result.destination) {
          return;
        }
    
        const { source, destination } = result;
        newQueues = [...state.queues];
        const [movedItem] = newQueues.splice(source.index, 1);
        newQueues.splice(destination.index, 0, movedItem);
    
        dispatch({ type: ACTIONS.queues, payload: newQueues });
      };


    const operatorStartServed = async (id: number) => {
        try {
            const res = await $axios.post(`${BASE_URL}/tickets/operator/${id}/start/`);
            dispatch({
                type: ACTIONS.queue,
                payload: res.data
            })
            console.log("Функция принятия талона успешна!");
        } catch (error) {
            console.log(error)
        }
    }


    const inQueueTALONDetail = async () => {
        try {
            const res = await $axios.get(`${BASE_URL}/tickets/operator/get_waiting_list/`);
            
            dispatch({
                type: ACTIONS.inQueue,
                payload: res.data
            })
        } catch (error) {
            console.log(error)
        }
    }


    const operatorEndServed = async (id: number) => {
        try {
            const res = await $axios.post(`${BASE_URL}/tickets/operator/${id}/mark_as_served/`);
            inQueueTALONDetail();
            console.log(res, "Закончено");
            navigate("/operator/queue");
        } catch (error) {
            console.log(error)
        }
    }

    const shiftQueue = async (newWindow: string, id: any) => {
        try {
            const shiftWindowData = {
                window: newWindow,
                id: id
              };            
            const res = await $axios.patch(`${BASE_URL}/tickets/operator/${id}/shift_window/`, shiftWindowData);
            getCustomers();
            if(res.status === 400) {
                console.log(res.data);
            } else {
                navigate("/operator/queue")
            }
        } catch (error: any) {
            if (error.response && error.response.status === 400) {
                console.log('Ошибка 400: неверный запрос');
                dispatch({
                    type: ACTIONS.error400,
                    payload: true
                })
              } else {
                dispatch({
                    type: ACTIONS.error400,
                    payload: null
                })
              }          
            console.log(error)
        }
    }

    const getShiftedQueues = async () => {
        try {
            const res = await $axios.get(`${BASE_URL}/tickets/operator/shift_list/`);
            dispatch({
                type: ACTIONS.shiftedQueues,
                payload: res.data
            })
        } catch (error) {
            console.log(error)
        }
    }

    const operatorChangeStatus = async () => {
        try {
            const res = await $axios.post(`${BASE_URL}/tickets/operator/change_status/`);
            dispatch({
                type: ACTIONS.statusOfOperator,
                payload: res.data
            })
            localStorage.setItem('status', res.data.status);
            getCustomers()
        } catch (error) {
            console.log(error)
        }
    }

    const editTalon = async (id: number, editedTalon: any) => {
        try {
            const res = await $axios.patch(`${BASE_URL}/customers/${id}/`, editedTalon);
            inQueueTALONDetail();
        } catch (error) {
            console.log(error)
        }
    }

    const getAllWindows = async () => {
        try {
            const res = await $axios.get(`${BASE_URL}/tickets/operator/get_windows_for_transfer/`);
            dispatch({
                type: ACTIONS.windows,
                payload: res.data
            })
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    const getBooking = async () => {
        try {
            const res = await $axios.get(`${BASE_URL}/booking/`);
            dispatch({
                type: ACTIONS.booking,
                payload: res.data.results
            })
        } catch (error) {
            console.log(error)
        }
    }

    const deleteBooking = async (id: number) => {
        try {
            await $axios.delete(`${BASE_URL}/booking/${id}/`);
            getBooking();
            console.log('Deleted')
        } catch (error) {
            console.log(error)
        }
    }

    const sendToWaitingList = async (id: number) => {
        try {
            const response = await $axios.post(`${BASE_URL}/tickets/operator/${id}/post_on_waiting_list/`);
            console.log(response.data);
            navigate("/operator/queue/")
        } catch (error) {
            console.log(error)
        }
    }

    const getWaitingList = async () => {
        try {
            const response = await $axios.get(`${BASE_URL}/tickets/operator/get_waiting_list/`);
            console.log(response);
    
            dispatch({
                type: ACTIONS.inQueue,
                payload: response.data,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const callCustomer = async (id: number) => {
        try {
            const resposne = await $axios.get(`${BASE_URL}/tickets/operator/${id}/call/`);
            console.log(resposne.data);
        } catch (error) {
            console.log(error)
        }
    }

    const moveToTheCustomer = async (id: number) => {
        try {
            const response = await $axios.post(`${BASE_URL}/tickets/operator/${id}/move_to_the_end/`);
            console.log(response.data);
        } catch (error) {
            console.log(error)
        }
    }


    const value = {
        getCustomers,
        queues: state.queues,
        deleteQueue,
        handleDragEnd,
        queue: state.queue,
        operatorStartServed,
        operatorEndServed,
        inQueueTALONDetail,
        inQueue: state.inQueue,
        getRejectedQueue,
        rejectedQueues: state.rejectedQueue,
        rejectQueue,
        shiftQueue,
        operatorChangeStatus,
        status: state.statusOfOperator,
        editTalon,
        getAllWindows,
        windows: state.windows,
        getShiftedQueues,
        shiftedQueues: state.shiftedQueues,
        getAllQueues,
        allQueues: state.allQueues,
        getBooking,
        booking: state.booking,
        deleteBooking,
        error400: state.error400,
        getWaitingList,
        waitingLIST: state.waitingLIST,
        sendToWaitingList,
        callCustomer,
        moveToTheCustomer
    };

    return <queueContext.Provider value={value}>{children}</queueContext.Provider>
}