'use client';
import { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import './createQuestion.css';
import { useRouter } from 'next/navigation';

interface FormErrors {
  title: boolean;
  desc: boolean;
}

interface Tag {
  id: number;
  name: string;
}

export default function CreateQuestion() {
  const router = useRouter();

  const [formErrors, setFormErrors] = useState<FormErrors>({
    title: false,
    desc: false,
  });

  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [tagSearchInput, setTagSearchInput] = useState<string>('');
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/forum/tags', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch tags');
        }

        const data: Tag[] = await response.json();
        setAllTags(data);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    fetchTags();
  }, []);

  const handleTagSelect = (tag: Tag) => {
    if (!selectedTags.some((selected) => selected.id === tag.id)) {
      setSelectedTags([...selectedTags, tag]);
      setTagSearchInput('');
      setShowSuggestions(false); // Hide suggestions after selecting a tag
    }
  };

  const handleTagRemove = (tagToRemove: Tag) => {
    setSelectedTags(selectedTags.filter((tag) => tag.id !== tagToRemove.id));
  };

  const filteredTags = tagSearchInput
    ? allTags.filter(
        (tag) =>
          tag.name.toLowerCase().startsWith(tagSearchInput.toLowerCase()) &&
          !selectedTags.some((selected) => selected.id === tag.id)
      )
    : allTags.filter(
        (tag) => !selectedTags.some((selected) => selected.id === tag.id)
      );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const title = form.trim();
    const desc = form.trim();

    const titleValid = !!title;
    const descValid = !!desc;

    setFormErrors({
      title: !titleValid,
      desc: !descValid,
    });

    if (titleValid && descValid) {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('Authorization token is missing');
        }

        const response = await fetch(
          'http://127.0.0.1:8000/api/forum/questions',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              title,
              description: desc,
              tags: selectedTags.map((tag) => tag.id),
            }),
          }
        );

        if (!response.ok) {
          throw new Error('Failed to create question');
        }

        const data = await response.json();
        console.log('Question created:', data);
        router.push(`/questions/${data.id}`);
      } catch (error) {
        console.error('Error submitting question:', error);
      }
    }
  };

  return (
    <main id="createQuestion" className="pad header-margin">
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

          {/* Dynamic Tags Section */}
          <div className="input-box tags-input">
            <div className="tags-container">
              {/* Selected Tags */}
              {selectedTags.map((tag) => (
                <span key={tag.id} className="tag selected-tag">
                  {tag.name}
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
                  filteredTags.length === 0
                    ? 'No more tags to show'
                    : 'Search and select tags'
                }
                value={tagSearchInput}
                onChange={(e) => setTagSearchInput(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="tag-input"
              />
            </div>

            {/* Tag Suggestions */}
            {(tagSearchInput || showSuggestions) && filteredTags.length > 0 && (
              <div className="tag-suggestions">
                {filteredTags.map((tag) => (
                  <button
                    key={tag.id}
                    type="button"
                    className="tag-suggestion"
                    onClick={() => handleTagSelect(tag)}
                  >
                    <Check size={16} className="check-icon" />
                    {tag.name}
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
