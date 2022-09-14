import React from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import "./Maps.css"
import { useState } from "react";
import datos from "../../datos";

const api = 'AIzaSyCeXw48tCyaz4d9o8tQHmP6l6VZIKMneXw'
const containerStyle = {
  width: '400px',
  height: '400px',
};

console.log(datos[0].coordinates)
const center = datos[0].coordinates;




export default function Map() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: api
  })

  const [infoWindowOpen, setInfoWindowOpen] = useState(false);
    
    const showInfoWindow = () => {
        setInfoWindowOpen(true);
      };


  return isLoaded ? (
    <div className="map-container">
      <h2>Protectoras</h2>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={11}
        yesIWantToUseGoogleMapApiInternals

      >
       <Marker position={center} onClick={showInfoWindow} >
       {infoWindowOpen && (
            <InfoWindow onCloseClick={() => setInfoWindowOpen(false)}>
              <h3>{datos[0].shelterName}</h3>
            </InfoWindow>
          )}
       </Marker>

      </GoogleMap>
      <br/>
      <h3>{datos[0].address}</h3>
      </div>
      
  ) : <></>
}

