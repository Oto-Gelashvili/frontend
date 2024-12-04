'use client'

import React, { useState } from 'react'
import './NewPass.css'
import Button from '../Components/Buttons'
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function NewPass() {
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<string>('');

  const handlePasswordToggle = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleConfirmPasswordToggle = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const confirmPasswordValue = e.target.value;
    setConfirmPassword(confirmPasswordValue);

    // Check password match only when confirm password is not empty
    if (confirmPasswordValue && password !== confirmPasswordValue) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError('');
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);

    // If confirm password is not empty, recheck match
    if (confirmPassword && passwordValue !== confirmPassword) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return;
    }

    console.log("Password reset submission");
  };

  return (
    <main className="newPassPage">
      <section className="newPassContainer">
        <h2 className="title">Create New Password</h2>
        <p className='desc'>Please enter and confirm your new password. You will need to login after you reset.</p>
        <form className="form" onSubmit={handleSubmit}>
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
                required
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              <span className="eye-icon" onClick={handleConfirmPasswordToggle}>
                {isConfirmPasswordVisible ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>
          {passwordError && (
            <p className="error-text">
              {passwordError}
            </p>
          )}
          <Button
            className="resetPassword"
            content="Reset Password"
            type="submit"
            onClick={handleSubmit}
            disabled={!!passwordError}
          />
        </form>
      </section>
    </main>
  )
}