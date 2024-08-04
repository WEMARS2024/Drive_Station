import React, { useEffect, useState } from 'react';

const WebSocketComponent = () => {
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
        <div id="Imu Data" className="relative w-[200px] h-[235px] overflow-hidden p-10 rounded-lg border-solid border-4 border-black bg-slate-200 shadow-lg">
          <h1 className="text-xl pb-2 font-serif">IMU Data</h1>
          <p className="text-lg pb-2" >Pitch [x]: {data.pitch}</p>
          <p className="text-lg pb-2">Roll [y]: {data.roll}</p>
          <p className="text-lg pb-2">Yaw [z]: {data.yaw}</p>
        </div>
    );
};

export default WebSocketComponent;