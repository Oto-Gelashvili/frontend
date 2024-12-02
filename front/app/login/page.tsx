'use client'

import React, { useState } from "react";
import './login.css';
import Button from "../Components/Buttons";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const handleToggle = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <main className="loginPage">
      <section className="loginContainer">
        <h2 className="title">Log in</h2>
        <form className="form">
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
              onChange={(e) => setUserName(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="eye-icon" onClick={handleToggle}>
                {isPasswordVisible ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>
          <div className="signup">
            <div className="signupLeft">New to StayConnected?</div>
            <Link href="/signup" className="signupLink">
              Sign Up
            </Link>
          </div>
          <Button
            className="loginButton"
            content="Log in"
            type="submit"
          />
        </form>
      </section>
    </main>
  );
}
