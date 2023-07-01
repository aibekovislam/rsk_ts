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
    inQueue: []
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
            dispatch({
                type: ACTIONS.queues,
                payload: res.data.results
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

    async function rejectQueue(id:number, newItem: boolean) {
        try {
            const res = await axios.get(`${BASE_URL}/customers/${id}`);
            const res2 = await axios.patch(`${BASE_URL}/customers/${id}/`, { ...res.data, is_served: newItem, queue: 1 });
            dispatch({
                type: ACTIONS.rejectedQueue,
                payload: res2
            })
            console.log(res2.data)
            getCustomers()
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


    const operatorEndServed = async (id: number) => {
        try {
            const res = await $axios.post(`${BASE_URL}/operator/${id}/mark_as_served/`);
            getCustomers();
            console.log(res, "Закончено");
            navigate("/operator/queue");
        } catch (error) {
            console.log(error)
        }
    }

    const operatorInQueue = async () => {
        try {
            const res = await $axios.get(`${BASE_URL}/operator/get_customers_in_queue/`);
            console.log(res)
            dispatch({
                type: ACTIONS.inQueue,
                payload: res.data
            })
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
        operatorInQueue,
        inQueue: state.inQueue
    };

    return <queueContext.Provider value={value}>{children}</queueContext.Provider>
}