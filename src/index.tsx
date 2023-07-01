import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { QueueContext } from './context/QueueContext';
import AuthContext from "./context/AuthContext";


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <AuthContext>
      <QueueContext>
        <App />
      </QueueContext>
    </AuthContext>
  </BrowserRouter>
);
