import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import "./reviewsForLocation.css"
import config from "../../config/config";

interface IReviewsForLocation {
  locationId: number | null;
  reviewCount: number;
}

interface IReviews {
  id: number;
  title: string;
  body: string;
  client_first_name: string;
  client_last_name: string;
  rating: number;
  date: string;
}

const ReviewsForLocation: React.FC<IReviewsForLocation> = ({
  locationId,
  reviewCount,
}) => {
  const [allReviews, setAllReviews] = useState<IReviews[]>([]);
  const url = config.backendURL

  useEffect(() => {
    fetchAllReviewsForLocation();
  }, [locationId, reviewCount]);

  const fetchAllReviewsForLocation = async () => {
    const response = await fetch(
      `${url}/get_reviews_by_location_id/${locationId}`
    );
    const data = await response.json();
    setAllReviews(data.reviews);

    console.log("data :>> ", data);
  };

  const showAmountOfStars = (rating: number) => {
    return [...Array(rating)].map((star, index) => (
      <span key={index}>
        <FaStar
          className="star"
          color={"#ffc107"} // You can set the color based on your requirement
          size={30}
        />
      </span>
    ));
  };
  return (
    <>
  <h2>Reviews</h2>
  <div className="all-reviews">
  {allReviews.length > 0 ? (
    allReviews.reverse().map((review) => (
      <div key={review.id} className="single-review">
        <div className="name-container">
        <span className="profile-pic">{review.client_first_name[0].toUpperCase()} {review.client_last_name[0].toUpperCase()}</span>
          <div className="review-name">
            {review.client_first_name} {review.client_last_name}
          </div>
          </div>
          <p className="review-date">{review.date}</p>
          <p className="">{showAmountOfStars(review.rating)}</p>
          <div className="">
            <h5>Service Provided</h5>
            <p className="">{review.title}</p>
            <hr />
            <p className="">{review.body}</p>
          </div>

      </div>
    ))
  ) : (
    
    <p className="no-reviews">No reviews for this location. Be the First to review!</p>
  )}
  </div>
</>

  );
};
export default ReviewsForLocation;
