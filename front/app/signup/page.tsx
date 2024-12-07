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
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState<boolean>(false);

  const [passwordError, setPasswordError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [fullnameError, setFullnameError] = useState<string>('');

  const handleFullnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullname(e.target.value);
    if (e.target.value.trim()) {
      setFullnameError('');
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
    if (e.target.value.trim()) {
      setEmailError('');
    }
  };

  const handlePasswordToggle = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleConfirmPasswordToggle = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const confirmPasswordValue = e.target.value;
    setConfirmPassword(confirmPasswordValue);

    if (confirmPasswordValue && password !== confirmPasswordValue) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);

    if (confirmPassword && passwordValue !== confirmPassword) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors
    setPasswordError('');
    setEmailError('');
    setFullnameError('');

    // Empty input errors
    if (!fullname.trim()) {
      setFullnameError('Full name is required');
      return;
    }
    
    if (!userName.trim()) {
      setEmailError('Email is required');
      return;
    }

    if (!password.trim()) {
      setPasswordError('Password is required');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userName)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    // Password validation
    if (!password.trim()) {
      setPasswordError('Password is required');
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return;
    }

    console.table({ 'Full Name': fullname, 'Email': userName, 'Password': password });
  };

  return (
    <main className="signupPage">
      <section className="signupContainer">
        <h2 className="title">Sign up</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="inputGroup">
            <label htmlFor="fullname" className="label">
              Full Name
            </label>
            <input
              className="input"
              type="text"
              id="fullname"
              placeholder="Name"
              value={fullname}
              onChange={handleFullnameChange}
            />
            {fullnameError && <p className="error-text">{fullnameError}</p>}
          </div>

          <div className="inputGroup">
            <label htmlFor="username" className="label">
              Email
            </label>
            <input
              className="input"
              type="text"
              id="username"
              placeholder="Enter your email"
              value={userName}
              onChange={handleEmailChange}
            />
            {emailError && <p className="error-text">{emailError}</p>}
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

                value={password}
                onChange={handlePasswordChange}
              />
              <span className="eye-icon" onClick={handlePasswordToggle}>
                {isPasswordVisible ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>

          <div className="passwordGroup">
            <label htmlFor="confirmPassword" className="label">
              Confirm Password
            </label>
            <div className="password-input">
              <input
                className="input"
                type={isConfirmPasswordVisible ? 'text' : 'password'}
                id="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              <span className="eye-icon" onClick={handleConfirmPasswordToggle}>
                {isConfirmPasswordVisible ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>

          {passwordError && <p className="error-text">{passwordError}</p>}

          <div className="login">
            <div className="loginLeft">Already a user?</div>
            <Link href="/login" className="loginLink">
              Log in
            </Link>
          </div>

          <Button
            className="signupButton"
            content="Sign up"
            type="submit"
            disabled={!!passwordError || !!emailError || !!fullnameError}
          />
        </form>
      </section>
    </main>
  );
}
