'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import Button from '../components/Buttons';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './signup.css';

export default function Signup() {
  const [fullname, setFullname] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setconfirmPassword] = useState<string>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState<boolean>(false);

  const handlePasswordToggle = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleConfirmPasswordToggle = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  return (
    <main className="signupPage">
      <section className="signupContainer">
        <h2 className="title">Sign up</h2>
        <form className="form">
          <div className="inputGroup">
            <label htmlFor="fullname" className="label">
              Full Name
            </label>
            <input
              className="input"
              type="text"
              id="fullname"
              placeholder="Name"
              required
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="username" className="label">
              Email
            </label>
            <input
              className="input"
              type="text"
              id="username"
              placeholder="Username"
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="passwordGroup">
            <label htmlFor="password" className="label">
              Enter Password
            </label>
            <div className="password-input">
              <input
                className="input"
                type={isPasswordVisible ? 'text' : 'password'}
                id="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="eye-icon" onClick={handlePasswordToggle}>
                {isPasswordVisible ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>
          <div className="passwordGroup">
            <label htmlFor="password" className="label">
              Confirm Password
            </label>
            <div className="password-input">
              <input
                className="input"
                type={isConfirmPasswordVisible ? 'text' : 'password'}
                id="password"
                placeholder="Password"
                required
                value={confirmPassword}
                onChange={(e) => setconfirmPassword(e.target.value)}
              />
              <span className="eye-icon" onClick={handleConfirmPasswordToggle}>
                {isConfirmPasswordVisible ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>
          <div className="login">
            <div className="loginLeft">Already a user</div>
            <Link href="/login" className="loginLink">
              Log in
            </Link>
          </div>
          <Button className="signupButton" content="Sign up" type="submit" />
        </form>
      </section>
    </main>
  );
}
