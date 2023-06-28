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
    oneQueue: null,
    rejectedQueue: []
}

let newQueues = [];

function reducer(state: any, action: any) {
    switch (action.type) {
        case ACTIONS.queues:
            return { ...state, queues: action.payload }
        case ACTIONS.rejectedQueue:
            return { ...state, rejectedQueue: action.payload }    
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

    const value = {
        getCustomers,
        queues: state.queues,
        deleteQueue,
        rejectQueue,
        rejectedQueue: state.rejectedQueue,
        handleDragEnd
    };

    return <queueContext.Provider value={value}>{children}</queueContext.Provider>
}