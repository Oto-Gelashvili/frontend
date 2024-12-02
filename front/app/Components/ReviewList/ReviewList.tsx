'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReviewCard from '../ReviewCard/ReviewCard';
import styles from './ReviewList.module.css';

interface Review {
  id: number;
  reviewerName: string;
  rating: number;
  comment: string;
  date: string;
}

const ReviewList: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get<Review[]>('/dummyApi/reviews.json');
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className={styles.reviewsContainer}>
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
};

export default ReviewList;
