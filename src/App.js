import React, { useEffect, useState } from 'react';
import WebSocket from "./WebSocket.js"
import IntelCamera from "./IntelCamera.js"
import GPSMap from "./Maps.js"

const App = () => {

  return (
    <div className="bg-purple-700 min-h-screen text-black">
      <div className="flex flex-row" >
        <div id="intel camera" className="row-span-2">
          <IntelCamera />
        </div>
        <div className="row-span-2 p-2 ">
          <div id="espCam1">
            <div className="relative border-solid border-4 border-black w-[450px] h-[330px] rounded-lg bg-slate-200">

            </div>
          </div>
          <div id="espCam2">
            <div className="relative border-solid border-4 border-black w-[450px] h-[330px] rounded-lg bg-slate-200">

            </div>
          </div>
        </div>
        <div className="row-span-1">
          <div className="flex-1 p-2 flex flex-row h-96">
            <div className="flex-1">
            <WebSocket />
            </div>
            <div id="Motor Data" className="flex-1" > 
              <div className="relative w-[200px] h-[235px] p-10 overflow-hidden rounded-lg border-solid border-4 border-black bg-slate-200 shadow-lg">
                <h1 className="text-xl pb-2 font-serif">Motor Data</h1>
                <p className="text-lg pb-2">Position:</p>
                <p className="text-lg pb-2">Current:</p>
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