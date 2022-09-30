import React, { useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import datos from "../datos";
import "../styles/Shelters.css";

export default function Map() {
  const api = process.env.REACT_APP_API_KEY;
  const containerStyle = {
    width: "97%",
    maxWidth: "700px",
    height: "100%",
    minHeight: "400px",
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: api,
  });
  const [center, setCenter] = useState({
    lat: 39.39499753223876,
    lng: -3.210895443339876,
  });

  const [infoWindowOpen, SetInfoWindowOpen] = useState(false);
  const [dataClicked, setDataClicked] = useState({});

  const onMarkerClick = (data, coordinates) => {
    setDataClicked(data);
    setCenter(coordinates);
    SetInfoWindowOpen({
      showingInfoWindow: true,
    });
  };

  const onInfoWindowClose = () => SetInfoWindowOpen(false);
  const onMapClicked = () => {
    if (infoWindowOpen) SetInfoWindowOpen(false);
  };

  return isLoaded ? (
    <div className="map-container">
      <h2 className="text-2xl text-stone-500 divider">Localización</h2>
      <br />
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={5}
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
                  onClick={() => onMarkerClick(data.coordinates)}
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
  );
}
