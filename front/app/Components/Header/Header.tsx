'use client';

import React, { useState } from 'react';
import './Header.css';
import { CiLink } from 'react-icons/ci';
import HeaderSearch from '../HeaderSearch/HeaderSearch';
import { FaPlus } from 'react-icons/fa6';
import { CgProfile } from 'react-icons/cg';
import { FaBars } from 'react-icons/fa'; // Hamburger icon
import Link from 'next/link';

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
    <div className="navbar pad">
      {/* Left section for logo and search */}
      <div className="navbar-left">
        <Link href={'/'} className="logo">
          <CiLink />
        </Link>

        {/* Always render the search container for larger screens */}
        <div className={`search-container ${isSearchVisible ? 'active' : ''}`}>
          <HeaderSearch items={items} tags={tags} />
        </div>
      </div>

      {/* Right section for buttons and hamburger */}
      <div className="navbar-right">
        <Link href={'Create'} className="navbar-right-btn">
          <FaPlus />
        </Link>
        <Link href={'profile'} className="navbar-right-btn">
          <CgProfile />
        </Link>

        {/* Hamburger menu icon */}
        <button className="hamburger-menu" onClick={toggleSearch}>
          <FaBars />
        </button>
      </div>
    </div>
  );
};

export default Header;
