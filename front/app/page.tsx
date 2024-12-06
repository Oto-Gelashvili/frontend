import React from 'react';
import PostList from './components/PostList/PostList';
import ReviewList from './components/ReviewList/ReviewList';
import styles from './page.module.css';

const MainPage: React.FC = () => {
  return (
    <main id="questions" className="pad header-margin">
      <div className={styles.post_wrapper}>
        <PostList />
      </div>
      <div className={styles.review_wrapper}>
        <ReviewList />
      </div>
    </main>
  );
};

export default MainPage;
