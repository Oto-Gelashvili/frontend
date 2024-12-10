'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import Button from '../Components/Buttons';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './signup.css';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { AxiosError } from 'axios';

interface ErrorResponse {
  message?: string;
  error?: string;
}

const apiUrl = process.env.NEXT_PUBLIC_SIGN_UP_URL;

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

  const [formMessage, setFormMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const router = useRouter();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Clear previous messages
    setFormMessage(null);

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

    try {
      const response = await axios.post(`${apiUrl}`, {
        'username' : fullname,
        'email': userName,
        password,
        'confirm_password': confirmPassword
      });

      // console.log('Sending signup data:', {
      //   'username' : fullname,
      //   'email': userName,
      //   password,
      //   'confirm_password': confirmPassword
      // });
      setFormMessage({ type: 'success', text: response.data.message || 'Signup successful!' });
  
      // Redirect to login page after a short delay
      setTimeout(() => {
        router.push('/login');
      }, 1500);
    } catch (error) {
      // Cast the error as an AxiosError and define the custom ErrorResponse type
      const axiosError = error as AxiosError<ErrorResponse>;
  
      // Check for the error message
      const errorMessage = axiosError.response?.data?.message ||
                           axiosError.response?.data?.error ||
                           'Either Username or Email is already in use';
  
      setFormMessage({
        type: 'error',
        text: errorMessage,
      });
    }

    
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

          {formMessage && (
            <p
              className={`form-message ${formMessage.type === 'success' ? 'success' : 'error'}`}
            >
              {formMessage.text}
            </p>
          )}

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