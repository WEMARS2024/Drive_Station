import React, { createContext, useEffect, useState } from 'react';

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const [data, setData] = useState({
    pitch: null,
    roll: null,
    yaw: null,
    longitude: null,
    latitude: null,
    speed: null,
  });

  useEffect(() => {
    const ws = new WebSocket('ws://192.168.137.250:8765');

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.onmessage = (event) => {
      try {
        const message = event.data;
        const dataArray = message.split(',');

        setData({
          pitch: parseFloat(dataArray[0]),
          roll: parseFloat(dataArray[1]),
          yaw: parseFloat(dataArray[2]),
          longitude: parseFloat(dataArray[3]),
          latitude: parseFloat(dataArray[4]),
          speed: parseFloat(dataArray[5]),
        });
      } catch (error) {
        console.error('Error parsing WebSocket message', error);
      }
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error', error);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={data}>
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketContext;
