import axios from 'axios';
import { stat } from 'fs';
import React, { createContext, PropsWithChildren, useContext, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { isConstructorDeclaration } from 'typescript';
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
    queue: [],
    oneQueue: null,
    inQueue: [],
    rejectedQueue: []
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
        default:
            return state;
    }
}

export const QueueContext = ({ children }: PropsWithChildren) => {
    const [ state, dispatch ] = useReducer(reducer, initState);

    const navigate = useNavigate();

    async function getCustomers() {
        try {
            const res = await axios.get(`${BASE_URL}/customers/`);
            const filteredResults = res.data.results.filter((item: any) => item.is_served === null);
            dispatch({
                type: ACTIONS.queues,
                payload: filteredResults
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
            const res = await $axios.get(`${BASE_URL}/operator/get_cancelled_customers/`);
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
            const res = await $axios.post(`${BASE_URL}/operator/${id}/mark_as_cancelled/`);
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
            const res = await $axios.post(`${BASE_URL}/operator/${id}/start/`);
            dispatch({
                type: ACTIONS.queue,
                payload: res.data
            })
            console.log("Функция принятия талона успешна!");
        } catch (error) {
            console.log(error)
        }
    }


    const inQueueTALONDetail = async (id: number) => {
        try {
            const res = await $axios.get(`${BASE_URL}/customers/${id}`);
            if(res.data.is_served === true) {
                dispatch({
                    type: ACTIONS.inQueue,
                    payload: []
                })
            } else {
                dispatch({
                    type: ACTIONS.inQueue,
                    payload: res.data
                })
            }
        } catch (error) {
            console.log(error)
        }
    }


    const operatorEndServed = async (id: number) => {
        try {
            const res = await $axios.post(`${BASE_URL}/operator/${id}/mark_as_served/`);
            inQueueTALONDetail(id);
            console.log(res, "Закончено");
            navigate("/operator/queue");
        } catch (error) {
            console.log(error)
        }
    }

    const shiftQueue = async (id: number, newWindow: any) => {
        try {
            const res = await $axios.patch(`${BASE_URL}/operator/${id}/shift_window/`, newWindow);
            console.log(res);
            getCustomers();
        } catch (error) {
            console.log(error)
        }
    }

    const operatorChangeStatus = async () => {
        try {
            const res = await $axios.post(`${BASE_URL}/operator/change_status/`);
            dispatch({
                type: ACTIONS.statusOfOperator,
                payload: res.data
            })
            getCustomers()
        } catch (error) {
            console.log(error)
        }
    }

    const editTalon = async (id: number, editedTalon: any) => {
        try {
            const res = await $axios.patch(`${BASE_URL}/customers/${id}/`, editedTalon);
            inQueueTALONDetail(id);
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
        editTalon
    };

    return <queueContext.Provider value={value}>{children}</queueContext.Provider>
}