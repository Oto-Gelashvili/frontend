import React from 'react';
import { User, LogOut } from 'lucide-react';
import './profile.css';

const userData = {
  username: 'Basileus',
  email: 'Basileus@example.com',
  avatar: '/api/placeholder/200/200',
  score: 25,
  answeredQuestions: 15,
};

const ProfilePage: React.FC = () => {
  return (
    <div id="profile-container">
      <h1>Profile</h1>
      <div className="profile-content">
        {/* Profile Image */}
        <div className="profile-image">
          <User width={56} height={56} />
        </div>

        {/* User Details */}
        <h2 className="username">{userData.username}</h2>
        <p className="email">{userData.email}</p>

        {/* User Stats */}
        <p className="info">Information</p>
        <div className="user-stats">
          <div className="stat-item">
            <p>{userData.score}</p>
            <p>Score</p>
          </div>
          <div className="stat-item">
            <p>{userData.answeredQuestions}</p>
            <p>Answered Questions</p>
          </div>
          {/* Logout Button */}
          <button className="logout-button stat-item">
            <LogOut className="logout-icon" />
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
