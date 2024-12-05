'use client';
import { useState } from 'react';
import { X, Check } from 'lucide-react';
import './createQuestion.css';
import { useRouter } from 'next/navigation';

interface FormErrors {
  title: boolean;
  desc: boolean;
}

const PREDEFINED_TAGS = [
  'JavaScript',
  'React',
  'TypeScript',
  'Next.js',
  'CSS',
  'HTML',
  'Backend',
  'Frontend',
  'Database',
  'Algorithms',
];

export default function CreateQuestion() {
  const router = useRouter();

  const [formErrors, setFormErrors] = useState<FormErrors>({
    title: false,
    desc: false,
  });

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagSearchInput, setTagSearchInput] = useState<string>('');
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  // Check if all predefined tags have been selected
  const allTagsSelected = selectedTags.length === PREDEFINED_TAGS.length;

  // Filter predefined tags based on search input
  const filteredTags = tagSearchInput
    ? PREDEFINED_TAGS.filter(
        (tag) =>
          tag.toLowerCase().startsWith(tagSearchInput.toLowerCase()) &&
          !selectedTags.includes(tag)
      )
    : PREDEFINED_TAGS.filter((tag) => !selectedTags.includes(tag));

  const handleTagSelect = (tag: string) => {
    // Prevent adding duplicate tags
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
      setTagSearchInput('');
      setShowSuggestions(false); // Hide suggestions after selecting a tag
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const titleValid = form.checkValidity();
    const descValid = form.checkValidity();

    setFormErrors({
      title: !titleValid,
      desc: !descValid,
    });

    if (titleValid && descValid) {
      console.log('Form submitted');
      console.log('Selected Tags:', selectedTags);
      router.push('/');
    }
  };

  return (
    <main id="createQuestion">
      <div className="submit-form">
        <h3 className="third-text stuff">Create Question</h3>
        <form onSubmit={handleSubmit} noValidate>
          <div
            className={`input-box title-box ${formErrors.title ? 'error' : ''}`}
          >
            <input
              type="text"
              id="title"
              name="title"
              className="input"
              required
            />
            <label htmlFor="title">Title</label>
            {formErrors.title && (
              <p className="error-message">Title is required.</p>
            )}
          </div>
          <div
            className={`input-box desc-input ${formErrors.desc ? 'error' : ''}`}
          >
            <textarea
              id="desc"
              name="desc"
              className="input"
              required
            ></textarea>
            <label htmlFor="desc">Description</label>
            {formErrors.desc && (
              <p className="error-message">Description is required.</p>
            )}
          </div>

          {/* Predefined Tags Section */}
          <div className="input-box tags-input">
            <div className="tags-container">
              {/* Selected Tags */}
              {selectedTags.map((tag) => (
                <span key={tag} className="tag selected-tag">
                  {tag}
                  <button
                    type="button"
                    className="tag-delete"
                    onClick={() => handleTagRemove(tag)}
                  >
                    <X size={16} />
                  </button>
                </span>
              ))}

              {/* Tag Search Input */}
              <input
                type="text"
                placeholder={
                  allTagsSelected ? 'No more to show' : 'Search and select tags'
                }
                value={tagSearchInput}
                onChange={(e) => setTagSearchInput(e.target.value)}
                onFocus={() => setShowSuggestions(true)} // Show suggestions when input is focused
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // Hide suggestions after losing focus
                className="tag-input"
              />
            </div>

            {/* Tag Suggestions */}
            {(tagSearchInput || showSuggestions) &&
              filteredTags.length > 0 &&
              !allTagsSelected && (
                <div className="tag-suggestions">
                  {filteredTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      className="tag-suggestion"
                      onClick={() => handleTagSelect(tag)}
                    >
                      <Check size={16} className="check-icon" />
                      {tag}
                    </button>
                  ))}
                </div>
              )}
          </div>

          <input type="submit" value="CREATE" className="btn" />
        </form>
      </div>
    </main>
  );
}
