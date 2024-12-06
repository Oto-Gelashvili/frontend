'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from '../PostCard/PostCard';
import styles from './PostList.module.css';

interface Post {
  id: number;
  author: string;
  name: string;
  tags: string[];
  answers: number;
  description: string;
  datetime: string;
}

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get<Post[]>('/dummyApi/posts.json');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className={styles.postsContainer}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      <button className={styles.classList_button}>See All Posts</button>
    </div>
  );
};

export default PostList;
