import React from 'react';
import styles from './PostCard.module.css';

interface Post {
  id: number;
  author: string;
  answers: number;
  name: string;
  tags: string[];
  description: string;
  datetime: string;
}

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className={styles.card}>
      <div className={styles.postCard_top}>
        <h2 className={styles.title}>{post.name}</h2>
        <p className={styles.author}>By: {post.author}</p>
      </div>
      <p className={styles.desc}>{post.description}</p>
      <div className={styles.postCard_bot}>
        <div className={styles.tags}>
          {post.tags.map((tag, index) => (
            <span key={index} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
        <div className={styles.bot_right}>
          <p className={styles.answers}>Answers: {post.answers}</p>
          <p className={styles.datetime}>{post.datetime}</p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
