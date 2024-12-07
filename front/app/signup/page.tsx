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
  
    // Create an object to track all errors
    const errors = {
      fullname: !fullname.trim() ? 'Full name is required' : '',
      email: !userName.trim() ? 'Email is required' : 
             (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userName) ? 'Please enter a valid email address' : ''),
      password: !password.trim() ? 'Password is required' : 
                (password.length < 8 ? 'Password must be at least 8 characters long' : ''),
      confirmPassword: password !== confirmPassword ? 'Passwords do not match' : ''
    };
  
    // Set all error states
    setFullnameError(errors.fullname);
    setEmailError(errors.email);
    setPasswordError(errors.password || errors.confirmPassword);
  
    // Check if any errors exist
    const hasErrors = Object.values(errors).some(error => error !== '');
    
    if (hasErrors) {
      return; // Stop form submission if there are errors
    }
  
    // If no errors, proceed with form submission
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
            {passwordError && <p className="error-text">{passwordError}</p>}
          </div>

          

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
