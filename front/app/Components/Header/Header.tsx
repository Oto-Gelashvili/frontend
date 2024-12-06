'use client';

import React, { useState } from 'react';
import './Header.css';
import { CiLink } from 'react-icons/ci';
import HeaderSearch from '../HeaderSearch/HeaderSearch';
import { FaPlus } from 'react-icons/fa6';
import { CgProfile } from 'react-icons/cg';
import { FaBars } from 'react-icons/fa'; // Hamburger icon

const Header = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false); // State to toggle search visibility on small screens

  const items = [
    { name: 'Item 1', tags: ['Tag1', 'Tag2'] },
    { name: 'Item 2', tags: ['Tag2', 'Tag3'] },
    { name: 'Item 3', tags: ['Tag1'] },
  ];

  const tags = ['FrontEnd', 'BackEnd', 'iOS', 'SwiftUI', 'UIKit'];

  // Function to toggle search visibility when hamburger menu is clicked
  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <div className="navbar">
      {/* Left section for logo and search */}
      <div className="navbar-left">
        <div className="logo">
          <CiLink />
        </div>

        {/* Always render the search container for larger screens */}
        <div className={`search-container ${isSearchVisible ? 'active' : ''}`}>
          <HeaderSearch items={items} tags={tags} />
        </div>
      </div>

      {/* Right section for buttons and hamburger */}
      <div className="navbar-right">
        <button className="navbar-right-btn">
          <FaPlus />
        </button>
        <button className="navbar-right-btn">
          <CgProfile />
        </button>

        {/* Hamburger menu icon */}
        <button className="hamburger-menu" onClick={toggleSearch}>
          <FaBars />
        </button>
      </div>
    </div>
  );
};

export default Header;
