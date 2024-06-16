import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import "./reviewsForm.css";

interface IProps {
  locationId: number | null;
  setReviewCount: React.Dispatch<React.SetStateAction<number>>;
  isLoggedIn: boolean
}
const Reviews: React.FC<IProps> = ({ locationId, setReviewCount, isLoggedIn }) => {
  const date = new Date();
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date);
  const [review, setReview] = useState({
    title: "",
    body: "",
    client_first_name: "",
    client_last_name: "",
    job_location_id: locationId as number | null,
    user_id: localStorage.getItem("user_id"),
    date: formattedDate,
    rating: 0,
  });

  const [hover, setHover] = useState(0);

  console.log("review :>> ", review);

  useEffect(() => {
    setReview((prev) => ({ ...prev, job_location_id: locationId as number }));
  }, [locationId]);

  const handleAddReview = async (e) => {
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:5000/create_review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ review: review }),
    });
    const data = await response.json();
    setReviewCount((prev) => prev + 1);
    console.log("review data :>> ", data);
  };

  return (
    <>
    
      <h3>Leave a Review</h3>
      {/* <StarRating /> */}
      <div>
        {[...Array(5)].map((star, index) => {
          const ratingValue = index + 1;

          return (
            <label key={index}>
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() =>
                  setReview((prev) => ({ ...prev, rating: ratingValue }))
                }
              />
              <FaStar
                className="star"
                color={
                  ratingValue <= (hover || review.rating)
                    ? "#ffc107"
                    : "#e4e5e9"
                }
                size={30}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(0)}
              />
            </label>
          );
        })}
        <p className="rated-stars">You rated: {review.rating} stars</p>
      </div>

      <form className="row g-3">
        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">
            Client First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="inputEmail4"
            placeholder="John"
            onChange={(e) =>
              setReview((prev) => ({
                ...prev,
                client_first_name: e.target.value,
              }))
            }
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputPassword4" className="form-label">
            Client Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="inputPassword4"
            placeholder="Doe"
            onChange={(e) =>
              setReview((prev) => ({
                ...prev,
                client_last_name: e.target.value,
              }))
            }
          />
        </div>
        <div className="col-md-6 form-lg">
          <label htmlFor="inputAddress" className="form-label ">
            What kind of work did you do for this client?
          </label>
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            placeholder="Plumming, Pest Control etc..."
            onChange={(e) =>
              setReview((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </div>
        <div className="col-md-6 form-lg">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows={3}
            defaultValue={""}
            placeholder="Describe your experience..."
            style={{ maxWidth: "100%" }}
            onChange={(e) =>
              setReview((prev) => ({ ...prev, body: e.target.value }))
            }
          />
        </div>
        <div className="col-12 submit-review-btn-container">
          <button
            type="submit"
            className="btn btn-primary submit-review-btn"
            onClick={(e) => handleAddReview(e)}
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};
export default Reviews;
