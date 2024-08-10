import React, { useContext } from 'react';
import WebSocketContext from './WebSocketContext';

const WebSocketComponent = () => {
  const { data, initialData } = useContext(WebSocketContext);

  return (
    <div id="Imu Data" className="relative flex right-[38px] top-[115px] w-[450px] h-[235px] overflow-hidden p-10 rounded-lg border-solid border-4 border-black bg-slate-200 shadow-lg">
      
      <div>
        <h1 className="text-xl pb-2 font-serif">IMU Data</h1>
        <p className="text-lg pb-2">Pitch [x]: {data.pitch}</p>
        <p className="text-lg pb-2">Roll [y]: {data.roll}</p>
        <p className="text-lg pb-2">Yaw [z]: {data.yaw}</p>
      </div>

      <div className="pl-28">
        <h1 className="text-xl pb-2 font-serif">Header Data</h1>
        <p className="text-lg pb-2">Pitch [x]: {initialData?.pitch}</p>
        <p className="text-lg pb-2">Roll [y]: {initialData?.roll}</p>
        <p className="text-lg pb-2">Yaw [z]: {initialData?.yaw}</p>
      </div>
    </div>
  );
};

export default WebSocketComponent;

