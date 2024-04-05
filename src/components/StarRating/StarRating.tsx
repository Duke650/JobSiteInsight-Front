import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import './starRating.css';

const StarRating = () => {
  const [rating, setRating] = useState(0);

  return (
    <div>
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;

        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
            />
            <FaStar
              className="star"
              color={ratingValue <= rating ? '#ffc107' : '#e4e5e9'}
              size={30}
            />
          </label>
        );
      })}
      <p>You rated: {rating} stars</p>
    </div>
  );
};

export default StarRating;


