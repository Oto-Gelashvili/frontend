import React from 'react';
import PostList from './Components/PostList/PostList';
import ReviewList from './Components/ReviewList/ReviewList';
import styles from './page.module.css';

const MainPage: React.FC = () => {
  return (
    <>
      <div className={styles.main_wrapper}>
        <div className={styles.post_wrapper}>
          <PostList />
        </div>
        <div className={styles.review_wrapper}>
          <ReviewList />
        </div>
      </div>
    </>
  );
};

export default MainPage;
