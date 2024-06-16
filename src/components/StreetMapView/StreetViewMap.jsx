import React, { useEffect, useRef, useState } from 'react';
import "./streetMap.css";

const StreetViewMap = ({ lat, lng }) => {
  const [loading, setLoading] = useState(true);
  const panoramaRef = useRef(null);
  const markerRef = useRef(null);
  const toggleButtonRef = useRef(null);

  useEffect(() => {
    const checkGoogleMaps = setInterval(() => {
      if (window.google && window.google.maps) {
        clearInterval(checkGoogleMaps);
        setLoading(false);
      }
    }, 100);

    return () => clearInterval(checkGoogleMaps);
  }, []);

  useEffect(() => {
    if (loading) return;

    const astorPlace = { lat, lng };
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: astorPlace,
      zoom: 18,
      streetViewControl: true,
    });

    const toggleButton = document.getElementById('toggle');
    toggleButtonRef.current = toggleButton;

    const toggleStreetView = () => {
      const toggle = panoramaRef.current.getVisible();
      panoramaRef.current.setVisible(!toggle);
    };

    toggleButton.addEventListener('click', toggleStreetView);

    panoramaRef.current = map.getStreetView();
    panoramaRef.current.setPosition(astorPlace);
    panoramaRef.current.setPov({
      heading: 265,
      pitch: 0,
    });

    markerRef.current = new window.google.maps.Marker({
      position: astorPlace,
      map: map,
      title: 'Location',
    });

    return () => {
      if (toggleButtonRef.current) {
        toggleButtonRef.current.removeEventListener('click', toggleStreetView);
      }
    };
  }, [lat, lng, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div id="map" className="card my-map"></div>
      <button id="toggle" className="btn btn-primary">Toggle Street View</button>
    </>
  );
};

export default StreetViewMap;
