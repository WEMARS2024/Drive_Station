import React, { useState } from 'react';
import { AdvancedMarker, APIProvider, Infowindow, Map, Marker, Pin } from '@vis.gl/react-google-maps';


const API_Key = 'AIzaSyCYBmTARagWHZnlzn4wcSgYzMkC4nmW1e4'; 

function GPSMap() {
  const [rlat, setRlat] = useState("")
  const [rlng, setRlng] = useState("")
  const [mlat, setMlat] = useState("")
  const [mlng, setMlng] = useState("")
  const [markerLocation, setMarkerLocation] = useState({ lat: null, lng: null });

  const RoverLocation = { lat: 43.17, lng: -79.87 };

  const handleLatChange = (event) => {
    setMlat(event.target.value);
  }

  const handleLngChange = (event) => {
    setMlng(event.target.value);
  }

  const handleLocationChange = () => {
    setMarkerLocation({ lat: parseFloat(mlat), lng: parseFloat(mlng) });
  };

  return (
    <div>
        <div className="relative bg-slate-200 border-4 border-solid border-black h-[400px] w-[420px] rounded-lg overflow-hidden">
            <APIProvider apiKey={API_Key}>
            <div style={{ height: '100%', width: '100%' }}>
                <Map center={RoverLocation} defaultZoom={10}>
                    <Marker position={RoverLocation} />
                    {markerLocation.lat !== null && markerLocation.lng !== null && (
                    <AdvancedMarker position={markerLocation}>
                        <Pin background={"purple"} borderColor={"purple"} glyphColor={"white"}/>
                    </AdvancedMarker>
                    )}
                </Map>
            </div>
            </APIProvider>
        </div>
        <div id="latInput">
            <input className="relative p-1 rounded-md border-black border-solid border-[3px] shadow-md" 
            type="text" 
            value={mlat} 
            onChange={handleLatChange}
            placeholder="Input Latitude">
            
            </input>
        </div>
        <div id="lngInput">
            <input className="relative p-1 rounded-md border-black border-solid border-[3px] shadow-md" 
            type="text" 
            value={mlng} 
            onChange={handleLngChange}
            placeholder="Input Longitude">
            </input>
        </div>
        <button className="relative rounded-md bg-purple-400 text-white p-1 shadow-md ease-in-out border-black border-solid border-2 hover:scale-110 hover:shadow-lg duration-200" 
        onClick={handleLocationChange}>Create Marker

        </button>
    </div>
  );
}

export default GPSMap;