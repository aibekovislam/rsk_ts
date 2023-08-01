import axios from 'axios';
import React, { createContext, PropsWithChildren, useContext, useReducer, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import $axios from '../utils/axios';
import { ACTIONS, BASE_URL } from '../utils/consts';
import { saveAs } from 'file-saver'; // библиотека для сохранения файла
import { utils, write } from 'xlsx'; // библиотека для работы с Excel

const reportContext = createContext<any>(null);

export function useReportContext() {
    return useContext(reportContext);
}

export interface ReportProps {
    children?: React.ReactNode | any
}

const initState = {
    cancelled_customers: null,
    cancelled_customers_days: null,
    cancelled_customers_year: null,
}


function reducer(state: any, action: any) {
    switch (action.type) {
        case ACTIONS.cancelled_customers:
            return { ...state, cancelled_customers: action.payload }
        case ACTIONS.cancelled_customers_days:
            return { ...state, cancelled_customers_days: action.payload }
        case ACTIONS.cancelled_customers_year:
            return { ...state, cancelled_customers_year: action.payload }      
        default:
            return state;
    }
}

export const ReportContext = ({ children }: PropsWithChildren) => {

    const exportToExcel = (data: any) => {
        // Здесь вам нужно преобразовать данные в формат Excel, используя библиотеку xlsx или exceljs
        // Пример с использованием xlsx:
        const XLSX = require('xlsx');
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        const excelBuffer = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });
      
        const fileData = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(fileData, 'report.xlsx');
      };
      

    const [state, dispatch] = useReducer(reducer, initState);
    const [error2, setError] = useState<string | null>(null); // State for handling errors

    const navigate = useNavigate();

    const downloadExcelFile = async (id: number, year: string) => {
        try {
        const response = await axios.get(`${BASE_URL}/reports/operator/average_served_times/word/${id}/get_monthly_average_time/?year=${year}`, {
            responseType: 'blob',
            headers: {
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            },
        });

        const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, 'example.xlsx');
        } catch (error) {
        console.error('Error while downloading Excel file:', error);
        }
    };

  

    const value = {
        // getCancelledCount,
        // cancelledCustomers: state.cancelled_customers,
        error2,
        downloadExcelFile
    }

    return <reportContext.Provider value={value}>{children}</reportContext.Provider>
}