import React from 'react';
import styles from './ReviewCard.module.css';

interface Review {
  id: number;
  reviewerName: string;
  rating: number;
  comment: string;
  date: string; // ISO format or display string
}

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.reviewer}>{review.reviewerName}</h3>
      <p className={styles.rating}>Rating: {review.rating}/5</p>
      <p className={styles.comment}>{review.comment}</p>
      <p className={styles.date}>
        {new Date(review.date).toLocaleDateString()}
      </p>
    </div>
  );
};

export default ReviewCard;
