'use client';
import React, { useState, useEffect } from 'react';
import { User, LogOut } from 'lucide-react';
import './profile.css';
import Image from 'next/image';

interface UserProfile {
  id: number;
  username: string;
  email: string;
  profile_picture: string | null;
  rating: number;
}

const ProfilePage: React.FC = () => {
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Retrieve the token from localStorage
        const token = localStorage.getItem('authToken');

        if (!token) {
          throw new Error('Authorization token is missing');
        }

        const response = await fetch(
          'http://165.232.116.35:8000/api/forum/profile',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }

        const data: UserProfile = await response.json();
        setUserData(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    // Implement logout logic here
    console.log('Logout clicked');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>No user data available</div>;
  }

  return (
    <div id="profile-container" className="pad header-margin">
      <h1>Profile</h1>
      <div className="profile-content">
        {/* Profile Image */}
        <div className="profile-image">
          {userData.profile_picture ? (
            <Image
              src={userData.profile_picture}
              alt={`${userData.username}'s profile`}
              className="profile-avatar"
              width={100}
              height={100} // Ensure dimensions are specified for Next.js Image
            />
          ) : (
            <User width={56} height={56} />
          )}
        </div>

        {/* User Details */}
        <h2 className="username">{userData.username}</h2>
        <p className="email">{userData.email}</p>

        {/* User Stats */}
        <p className="info">Information</p>
        <div className="user-stats">
          <div className="stat-item">
            <p>{userData.rating}</p>
            <p>Rating</p>
          </div>
          {/* Logout Button */}
          <button className="logout-button stat-item" onClick={handleLogout}>
            <LogOut className="logout-icon" />
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
