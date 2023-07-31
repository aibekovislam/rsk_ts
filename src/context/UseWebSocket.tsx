import { useEffect, useRef, useState, useMemo } from 'react';

const useWebSocket = (websocketURL: string) => {
  const [data, setData] = useState<any>(null);
  const websocketRef = useRef<WebSocket | null>(null);

  useMemo(() => {
    // Создаем экземпляр веб-сокета, только если URL изменился
    if (websocketRef.current) {
      websocketRef.current.close();
    }
    websocketRef.current = new WebSocket(websocketURL);

    websocketRef.current.onopen = () => {
      console.log('WebSocket connection is open.')
    };

    websocketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Received data from the server:', data);
      setData(data); // Обновляем состояние данных при получении новых данных от сервера
    };
    
    websocketRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    
    websocketRef.current.onclose = (event) => {
      console.log('WebSocket connection is closed.', event.code, event.reason);
    };
  }, [websocketURL]);

  useEffect(() => {
    // Возвращаем функцию очистки, чтобы при размонтировании компонента закрыть веб-сокет
    return () => {
      if (websocketRef.current) {
        websocketRef.current.close();
        websocketRef.current = null;
      }
    };
  }, []);

  return { data };
};

export default useWebSocket;
