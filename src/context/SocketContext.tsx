import React, { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { BASE_URL } from '../utils/consts';

const SocketContext = createContext<Socket | null>(null);

const SocketProvider = ({ children }: PropsWithChildren<any>) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(`${BASE_URL}`); // замените на URL вашего сервера
    setSocket(newSocket);

    // Вернуть функцию очистки только в случае необходимости отключения от WebSocket.
    // return () => newSocket.close();
  }, [setSocket]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };


