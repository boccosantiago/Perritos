import React from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import "./Shelters.css";
import { useState } from "react";
import datos from "../../datos";

const api = process.env.REACT_APP_API_KEY;
const containerStyle = {
  width: "80%",
  height: "90%",
};

console.log("api", api);

const center = { lat: 39.39499753223876, lng: -3.210895443339876 };

export default function Map() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: api,
  });

  const [infoWindowOpen, setInfoWindowOpen] = useState(false);

  const showInfoWindow = (id) => {
    
    setInfoWindowOpen(id);
  };

  return isLoaded ? (
    <div className="map-container">
      <h2>Protectoras</h2>
      <br/>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={7}
        yesIWantToUseGoogleMapApiInternals
      >
       {datos.map(data => {
       return (<Marker position={data.coordinates} onClick={()=>showInfoWindow(data.shelterName)}>
          {infoWindowOpen   && (
            <InfoWindow onCloseClick={() => setInfoWindowOpen(false)}>
              <div>
                <p>{data.shelterName}</p>
                <p>{data.address}</p>
                <p>{data.email}</p>
              </div>
            </InfoWindow>
          )}
        </Marker>)})}

      </GoogleMap>
      <br />
    </div>
  ) : (
    <></>
  );
}
