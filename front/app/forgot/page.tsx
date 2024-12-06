'use client'

import React, { useState } from 'react'
import Button from '../Components/Buttons';
import './forgot.css'
export default function Forgot() {
  const [userName, setUserName] = useState<string>('');

  console.log(userName)

  return (
    <main className="forgotPage">
      <section className="forgotContainer">
        <h2 className="title">Forgot Password</h2>
        <p className='desc'>No worries! Enter your email address below and after validation you can reset password.</p>
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
          <Button
            className="resetPassword"
            content="Reset Password"
            type="submit"
          />
        </form>
      </section>
    </main>
  )
}
