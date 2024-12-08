'use client';

import React, { useState } from 'react';
import './login.css';
import Button from '../Components/Buttons';
import Link from 'next/link';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';

interface ErrorResponse {
  message?: string;
  error?: string;
}


export default function Login() {
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const [passwordError, setPasswordError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');

  const [formMessage, setFormMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const router = useRouter();

  const handleToggle = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
    if (e.target.value.trim()) {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Clear previous messages
    setFormMessage(null);

    // Create an object to track all errors
    const errors = {
      email: !userName.trim() ? 'Email is required' : 
             (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userName) ? 'Please enter a valid email address' : ''),
      password: !password.trim() ? 'Password is required' : '',
    };
  
    // Set all error states
    setEmailError(errors.email);
    setPasswordError(errors.password);
  
    // Check if any errors exist
    const hasErrors = Object.values(errors).some(error => error !== '');
    
    if (hasErrors) {
      return; // Stop form submission if there are errors
    }

    try {
      const response = await axios.post(`	http://206.81.17.203/api/user/signin/`, {
        'email': userName,
        password,
      });

      // console.log('Sending login data:', {
      //   'email': userName,
      //   password,
      // });

      const { access, refresh } = response.data;

      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      
      setFormMessage({ type: 'success', text: response.data.message || 'Login successful!' });
  
      // Redirect to main page after a short delay
      setTimeout(() => {
        router.push('/');
      }, 1500);
    } catch (error) {
      // Cast the error as an AxiosError and define the custom ErrorResponse type
      const axiosError = error as AxiosError<ErrorResponse>;
  
      // Check for the error message
      const errorMessage = axiosError.response?.data?.message ||
                           axiosError.response?.data?.error ||
                           'Login failed try again';
  
      setFormMessage({
        type: 'error',
        text: errorMessage,
      });
    }
  };

  return (
    <main className="loginPage">
      <section className="loginContainer">
        <h2 className="title">Log in</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="inputGroup">
            <label htmlFor="username" className="label">
              Email
            </label>
            <input
              className="input"
              type="email"
              id="username"
              placeholder="Username"
              required
              value={userName}
              onChange={handleEmailChange}
            />
          </div>
          <div className="passwordGroup">
            <div className="password-top">
              <label htmlFor="password" className="label">
                Password
              </label>
              <Link href="/forgot" className="forgotPassword">
                Forgot Password?
              </Link>
            </div>
            <div className="password-input">
              <input
                className="input"
                type={isPasswordVisible ? 'text' : 'password'}
                id="password"
                placeholder="Password"
                required
                value={password}
                onChange={handlePasswordChange}
              />
              <span className="eye-icon" onClick={handleToggle}>
                {isPasswordVisible ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>
          {formMessage && (
            <p
              className={`form-message ${formMessage.type === 'success' ? 'success' : 'error'}`}
            >
              {formMessage.text}
            </p>
          )}
          <div className="signup">
            <div className="signupLeft">New to StayConnected?</div>
            <Link href="/signup" className="signupLink">
              Sign Up
            </Link>
          </div>
          <Button className="loginButton" content="Log in" type="submit" disabled={!!passwordError || !!emailError}/>
        </form>
      </section>
    </main>
  );
}
