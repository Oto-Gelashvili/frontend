'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './HeaderSearch.module.css';
import { FaSearch, FaTimes } from 'react-icons/fa'; // Import FaTimes for removing tags

interface Item {
  name: string;
  tags: string[];
}

interface HeaderSearchProps {
  items: Item[];
  tags: string[]; // Ensure tags prop is passed correctly
}

const HeaderSearch: React.FC<HeaderSearchProps> = ({ tags }) => {
  const [search, setSearch] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagSuggestions, setTagSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const tagInputRef = useRef<HTMLDivElement>(null);

  // Handle changes in search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // Handle changes in tag input
  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    const filteredTags = tags.filter((tag) =>
      tag.toLowerCase().includes(query)
    );
    setTagSuggestions(filteredTags); // Only set valid filtered tags
    setShowSuggestions(true);
  };

  // Handle tag selection
  const handleTagSelect = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags((prev) => [...prev, tag]);
    }
    setTagSuggestions([]); // Clear suggestions when tag is selected
    setShowSuggestions(false);
  };

  // Handle tag removal
  const handleTagRemove = (tag: string) => {
    setSelectedTags((prev) =>
      prev.filter((selectedTag) => selectedTag !== tag)
    );
  };

  // Close suggestions if clicked outside the input
  const handleClickOutside = (event: MouseEvent) => {
    if (
      tagInputRef.current &&
      !tagInputRef.current.contains(event.target as Node)
    ) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.searchContainer}>
      {/* Search Input */}
      <input
        className={styles.searchInput}
        id={styles.searchBox}
        type="text"
        placeholder="Enter Search Text"
        value={search}
        onChange={handleSearchChange}
      />

      {/* Tags Input */}
      <div className={styles.tagContainer} ref={tagInputRef}>
        <input
          className={styles.searchInput}
          id={styles.tagBox}
          type="text"
          placeholder="Choose Tag"
          onChange={handleTagInputChange}
        />
        {showSuggestions && tagSuggestions.length > 0 && (
          <ul className={styles.tagSuggestions}>
            {tagSuggestions.map((tag, index) => (
              <li
                key={index}
                className={styles.tagSuggestionItem}
                onClick={() => handleTagSelect(tag)}
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Selected Tags */}
      <div className={styles.selectedTags}>
        {selectedTags.map((tag, index) => (
          <span key={index} className={styles.selectedTag}>
            {tag}
            <button
              className={styles.removeTagBtn}
              onClick={() => handleTagRemove(tag)}
            >
              <FaTimes />
            </button>
          </span>
        ))}
      </div>

      <div className={styles.searchBtnContianer}>
        <button className={styles.searchButton}>
          <FaSearch />
        </button>
      </div>
    </div>
  );
};

export default HeaderSearch;
