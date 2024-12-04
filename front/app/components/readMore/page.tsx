'use client';
import React, { useState } from 'react';

interface ReadMoreProps {
  text: string;
  maxLength?: number;
}

const ReadMore: React.FC<ReadMoreProps> = ({ text, maxLength = 150 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // If text is shorter than maxLength, show full text
  if (text.length <= maxLength) {
    return <p>{text}</p>;
  }

  // Truncate text if not expanded
  const displayText = isExpanded ? text : text.slice(0, maxLength) + '...';

  return (
    <div>
      <p>
        {displayText}
        {!isExpanded && (
          <button onClick={() => setIsExpanded(true)} className="readMore">
            Read More
          </button>
        )}
      </p>
      {isExpanded && (
        <button onClick={() => setIsExpanded(false)} className="readMore">
          Show Less
        </button>
      )}
    </div>
  );
};

export default ReadMore;
