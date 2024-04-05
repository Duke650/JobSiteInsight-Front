
import "./search.css";
import { useEffect, useRef, useState } from "react";
import StreetViewMap from "../StreetMapView/StreetViewMap";
import Reviews from "../Reviews/ReviewsForm";
import ReviewsForLocation from "../ReviewsForLocation/ReviewsForLocation";
import { Link } from "react-router-dom"



const Search = ({isLoggedIn}) => {
  const [address, setAddress] = useState("");
  // const [placeId, setPlaceId] = useState(0);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [locationId, setLocationId] = useState(0);
  const [reviewCount, setReviewCount] = useState(0)

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
    const response = await fetch("http://127.0.0.1:5000/add_job_location", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formatted_address: address }),
    });
    const data = await response.json();
    setReviewCount(prev => prev + 1)
    return data;
  };

  const fetchLoactionInfo = async () => {
    console.log("HIT");
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${address}%autocomplete=true&key=AIzaSyAPc_6sz46iF_TGER4yAVGtQWIHzNH0ozY`
    );
    const data = await response.json();

    // setPlaceId(data.results[0].place_id);
    setLat(data.results[0].geometry.location.lat);
    setLng(data.results[0].geometry.location.lng);
    await addLocation();
    const haveLocation = await checkIfLocationExists();
    if (haveLocation) {
      setLocationId(haveLocation.id);
    }
  };

  const checkIfLocationExists = async () => {
    const response = await fetch(
      `http://127.0.0.1:5000/location_by_address/${address}`
    );
    const data = await response.json();
    return data;
  };

  return (
    <div className="search-container card">
    <div class="welcome-message">
    <h1 class="welcome-title">Welcome to JobSite Insight</h1>
    <p class="welcome-text">
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
