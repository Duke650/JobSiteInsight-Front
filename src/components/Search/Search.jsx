
import "./search.css";
import { useEffect, useRef, useState } from "react";
import StreetViewMap from "../StreetMapView/StreetViewMap";
import Reviews from "../Reviews/ReviewsForm";
import ReviewsForLocation from "../ReviewsForLocation/ReviewsForLocation";
import { Link } from "react-router-dom"
import config from "../../config/config";



const Search = ({isLoggedIn}) => {
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [locationId, setLocationId] = useState(0);
  const [reviewCount, setReviewCount] = useState(0)
  const url = config.backendURL

  const autoCompletedRef = useRef();
  const inputRef = useRef();
  const options = {
    componentRestrictions: {
      fields: [
        "address_components",
        "adr_address",
        "formatted_address",
        "name",
        "photos",
        "url",
      ],
    },
  };

  useEffect(() => {
    autoCompletedRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
    );

    autoCompletedRef.current.addListener("place_changed", () => {
      const place = autoCompletedRef.current.getPlace();
      setAddress(place.formatted_address);
    });

    return () => {
      // Clean up the Autocomplete instance
      autoCompletedRef.current.unbindAll();
    };
  }, []);


  const addLocation = async () => {
    const response = await fetch(`${url}/add_job_location`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formatted_address: address }),
    });
    const data = await response.json();
    setReviewCount(prev => prev + 1)
    return data;
  };

const fetchLoactionInfo = async () => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${address}%autocomplete=true&key=AIzaSyAPc_6sz46iF_TGER4yAVGtQWIHzNH0ozY`
    );
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      setLat(data.results[0].geometry.location.lat);
      setLng(data.results[0].geometry.location.lng);
    } else {
      // Handle the case where no results were found
    }

    await addLocation();
    const haveLocation = await checkIfLocationExists();
    if (haveLocation) {
      setLocationId(haveLocation.id);
    }
  } catch (error) {
    console.error("Error fetching location information:", error);
    // Handle the API error (e.g., show an error message to the user)
  }
};


  const checkIfLocationExists = async () => {
    const response = await fetch(
      `${url}/location_by_address/${address}`
    );
    const data = await response.json();
    return data;
  };

  return (
    <div className="search-container card">
    <div className="welcome-message">
    <h1 className="welcome-title">Welcome to JobSite Insight</h1>
    <p className="welcome-text">
      At JobSite Insight, we believe in the power of shared experiences. Our platform is designed to help companies like yours review and share insights about the job locations you've worked at. Whether you're a plumbing company, an electrical contractor, or a landscaping service, your feedback matters.
    </p>
  </div>
      <label className="enter-address-label">Enter address: </label>
      <div className="search-input">
      <input ref={inputRef} onChange={(e) => setAddress(e.target.value)} />
      </div>
      <button className="my-search-btn" onClick={() => fetchLoactionInfo()}>Search Location</button>
      {lat && lng && <StreetViewMap lat={lat} lng={lng} />}
      {!isLoggedIn && locationId && <div>
        <span className="login-to-review">Login <Link to="/login">here</Link> to leave a review</span>
        
        </div>}
      {locationId && isLoggedIn && <Reviews locationId={locationId} setReviewCount={setReviewCount} isLoggedIn={isLoggedIn}/>}
      {locationId ? (
        <div className="all-reviews-container">
          <ReviewsForLocation locationId={locationId} reviewCount={reviewCount}/>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default Search;
