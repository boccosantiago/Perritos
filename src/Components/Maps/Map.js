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
  width: '97%',
  maxWidth: '700px',
  height: "100%",
  minHeight: '400px'
};

export default function Map() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: api,
  });
  const [center, setCenter] = useState({
    lat: 39.39499753223876,
    lng: -3.210895443339876,
  });

  const [infoWindowOpen, SetInfoWindowOpen] = useState(false);

  const [dataClicked, setDataClicked] = useState({})

  const onMarkerClick = (data, coordinates) =>
    {setDataClicked(data)
     setCenter(coordinates) 
    SetInfoWindowOpen({
      showingInfoWindow: true,
    })}

    console.log('dataClick', dataClicked)

  const onInfoWindowClose = () =>
    SetInfoWindowOpen(false);

  const onMapClicked = () => {
    if (infoWindowOpen)
      SetInfoWindowOpen(false);
  };


  return( 
   isLoaded ? (
    <div className="map-container">
      <h2 className="text-2xl text-stone-500	">Protectoras</h2>
      <br />
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={6}
        onClick={onMapClicked}
        yesIWantToUseGoogleMapApiInternals
      >
        {datos.map((data, index) => {
          return (
            <Marker
              name={data.shelterName}
              key={index}
              position={data.coordinates}
              onClick={() => onMarkerClick(data, data.coordinates)}
              
            >
              {infoWindowOpen && data.shelterName === dataClicked.shelterName && (
                <InfoWindow
                  onClick={()=>onMarkerClick(data.coordinates)}
                  onCloseClick={onInfoWindowClose}
                >
                  <div className="info-shelters">
                    <h4>{data.shelterName}</h4>
                    <p>{data.address}</p>
                    <h4>{data.email}</h4>
                  </div>
                </InfoWindow>
              )}
            </Marker>
          );
        })}
      </GoogleMap>
      <br />
    </div>
  ) : (
    <></>
  ))
  ;
}
