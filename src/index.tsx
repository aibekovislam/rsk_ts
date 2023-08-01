import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { QueueContext } from './context/QueueContext';
import AuthContext from "./context/AuthContext";
import { ReportContext } from './context/ReportsContext';
import { ChatContext } from './context/ChatContext';


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <AuthContext>
      <QueueContext>
        <ReportContext>
          <ChatContext>
            <App />
          </ChatContext>
        </ReportContext>
      </QueueContext>
    </AuthContext>
  </BrowserRouter>
);
