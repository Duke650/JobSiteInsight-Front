import { useEffect, useRef } from 'react';
import "./streetMap.css"

const StreetViewMap = ({ lat, lng }) => {
  const panoramaRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    const astorPlace = { lat: lat, lng: lng };
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: astorPlace,
      zoom: 18,
      streetViewControl: true,
    });

    const toggleButton = document.getElementById('toggle');

    const toggleStreetView = () => {
      const toggle = panoramaRef.current.getVisible();
      panoramaRef.current.setVisible(!toggle);
    };

    toggleButton.addEventListener('click', toggleStreetView);

    const panorama = map.getStreetView();
    panoramaRef.current = panorama;

    panorama.setPosition(astorPlace);
    panorama.setPov({
      heading: 265,
      pitch: 0,
    });

    markerRef.current = new window.google.maps.Marker({
      position: astorPlace,
      map: map,
      title: 'Location',
    });

    return () => {
      if (toggleButton) {
        toggleButton.removeEventListener('click', toggleStreetView);
      }
    };
  }, [lat, lng]); // Update when lat or lng props change

  return (
    <>
      <div id="map" className='card my-map'></div>
      <button id="toggle" className='btn btn-primary'>Toggle Street View</button>
    </>
  );
};

export default StreetViewMap;
