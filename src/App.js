import React, { useEffect, useState } from 'react';
import WebSocketComponent from "./WebSocket.js"
import IntelCamera from "./IntelCamera.js"
import GPSMap from "./Maps.js"

const App = () => {

  return (
    <div className="bg-purple-700 min-h-screen text-black">
      <div className="grid grid-cols-4" >
        <div id="intel camera" className="col-span-2">
          <IntelCamera />
        </div>
        <div className="col-span-1 p-2 ">
          <div id="espCam1">
            <div className="relative border-solid border-4 border-black top-[115px] right-[80px] w-[475px] h-[330px] rounded-lg bg-slate-200">
              <span className="relative text-white bg-black rounded-md bottom-0 right-1 p-1 px-2 font-serif">Camera 2</span>

            </div>
          </div>
          <div id="espCam2">
            <div className="relative border-solid border-4 border-black top-[157px] right-[80px] w-[475px] h-[330px] rounded-lg bg-slate-200">
              <span className="relative text-white bg-black rounded-md bottom-0 right-1 p-1 px-2 font-serif">Camera 3</span>  

            </div>
          </div>
        </div>
        <div className="row-span-1">
          <div className="flex-1 p-2 flex flex-row h-96">
            <div className="flex-1">
            <WebSocketComponent />
            </div>
            <div id="Motor Data" className="flex-1" > 
              <div className="relative right-[40px] w-[220px] h-[235px] top-[115px] p-10 overflow-hidden rounded-lg border-solid border-4 border-black bg-slate-200 shadow-lg">
                <h1 className="text-xl pb-2 font-serif">Motor Data</h1>
                <p className="text-lg pb-2">Position:</p>
                <p className="text-lg pb-2">Current:</p>
                <p className="text-lg pb-2">Speed:</p>
              </div>
            </div>
          </div>
          <div id="GPS Data">
            <GPSMap></GPSMap>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;