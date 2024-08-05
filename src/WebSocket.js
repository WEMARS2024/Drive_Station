import React, { useContext } from 'react';
import WebSocketContext from './WebSocketContext';

const WebSocketComponent = () => {
  const data = useContext(WebSocketContext);

  return (
    <div id="Imu Data" className="relative right-[38px] top-[115px] w-[220px] h-[235px] overflow-hidden p-10 rounded-lg border-solid border-4 border-black bg-slate-200 shadow-lg">
      <h1 className="text-xl pb-2 font-serif">IMU Data</h1>
      <p className="text-lg pb-2">Pitch [x]: {data.pitch}</p>
      <p className="text-lg pb-2">Roll [y]: {data.roll}</p>
      <p className="text-lg pb-2">Yaw [z]: {data.yaw}</p>
    </div>
  );
};

export default WebSocketComponent;