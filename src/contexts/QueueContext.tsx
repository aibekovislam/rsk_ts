import axios from 'axios';
import React, { createContext, PropsWithChildren, useContext, useReducer } from 'react';
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
    oneQueue: null
}

function reducer(state: any, action: any) {
    switch (action.type) {
        case ACTIONS.queues:
            return { ...state, queues: action.payload }    
        default:
            return state;
    }
}

export const QueueContext = ({ children }: PropsWithChildren) => {
    const [ state, dispatch ] = useReducer(reducer, initState);

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

    const value = {
        getCustomers,
        queues: state.queues,
        deleteQueue
    };

    return <queueContext.Provider value={value}>{children}</queueContext.Provider>
}