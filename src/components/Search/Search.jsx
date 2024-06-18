import "./search.css";
import { useEffect, useRef, useState } from "react";
import StreetViewMap from "../StreetMapView/StreetViewMap";
import Reviews from "../Reviews/ReviewsForm";
import ReviewsForLocation from "../ReviewsForLocation/ReviewsForLocation";
import { Link } from "react-router-dom";
import config from "../../config/config";

const Search = ({ isLoggedIn }) => {
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [locationId, setLocationId] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [apiKey, setApiKey] = useState('');
  const url = config.backendURL;

  const autoCompletedRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const apiKey = import.meta.env.VITE_REACT_APP_GOOGLE_API_KEY;
        if (!apiKey) {
          throw new Error('API key not found in environment variables');
        }
        setApiKey(apiKey);
      } catch (error) {
        console.error('Error fetching API key:', error);
        // Handle error, show message to user, etc.
      }
    };

    fetchApiKey();
  }, []);

  useEffect(() => {
    const initializeAutocomplete = () => {
      if (!window.google) {
        console.error("Google Maps JavaScript API script not loaded.");
        return;
      }

      const options = {
        componentRestrictions: { country: "us" },
        fields: ["address_components", "adr_address", "formatted_address", "name", "photos", "url"],
      };

      autoCompletedRef.current = new window.google.maps.places.Autocomplete(inputRef.current, options);
      autoCompletedRef.current.addListener("place_changed", () => {
        const place = autoCompletedRef.current.getPlace();
        setAddress(place.formatted_address);
      });
    };

    if (apiKey) {
      loadScript(`https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`)
        .then(initializeAutocomplete)
        .catch((err) => console.error("Error loading Google Maps script:", err));
    }
    
    return () => {
      if (autoCompletedRef.current) {
        autoCompletedRef.current.unbindAll();
      }
    };
  }, [apiKey]);

  const addLocation = async () => {
    try {
      const response = await fetch(`${url}/add_job_location`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formatted_address: address }),
      });
      const data = await response.json();
      setReviewCount((prev) => prev + 1);
      return data;
    } catch (error) {
      console.error("Error adding location:", error);
    }
  };

  const fetchLocationInfo = async () => {
    try {
      const encodedAddress = encodeURIComponent(address);
      const proxyUrl = `${url}/proxy?url=https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodedAddress}&key=${apiKey}`;
      const response = await fetch(proxyUrl);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        setLat(lat);
        setLng(lng);
        await addLocation();
        const haveLocation = await checkIfLocationExists();
        if (haveLocation) {
          setLocationId(haveLocation.id);
        }
      } else {
        console.warn("No results found for the given query.");
      }
    } catch (error) {
      console.error("Error fetching location information:", error);
    }
  };

  const checkIfLocationExists = async () => {
    try {
      const response = await fetch(`${url}/location_by_address/${address}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error checking location:", error);
    }
  };

  return (
    <div className="search-container card">
      <div className="welcome-message">
        <h1 className="welcome-title">Welcome to JobSite Insight</h1>
        <p className="welcome-text">
          At JobSite Insight, we believe in the power of shared experiences.
          Our platform is designed to help companies like yours review and share
          insights about the job locations you've worked at. Whether you're a
          plumbing company, an electrical contractor, or a landscaping service,
          your feedback matters.
        </p>
      </div>
      <label className="enter-address-label">Enter address: </label>
      <div className="search-input">
        <input ref={inputRef} onChange={(e) => setAddress(e.target.value)} />
      </div>
      <button className="my-search-btn" onClick={fetchLocationInfo}>Search Location</button>
      {lat && lng && <StreetViewMap lat={lat} lng={lng} />}
      {!isLoggedIn && locationId && (
        <div>
          <span className="login-to-review">
            Login <Link to="/login">here</Link> to leave a review
          </span>
        </div>
      )}
      {locationId && isLoggedIn && (
        <Reviews
          locationId={locationId}
          setReviewCount={setReviewCount}
          isLoggedIn={isLoggedIn}
        />
      )}
      {locationId ? (
        <div className="all-reviews-container">
          <ReviewsForLocation locationId={locationId} reviewCount={reviewCount} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

const loadScript = (url) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = url;
    script.async = true;
    script.defer = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

export default Search