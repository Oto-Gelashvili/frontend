'use client';
import ReadMore from '../Components/ReadMore/ReadMore';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { MessageCircle, Send } from 'lucide-react';
import './questionDetails.css';

// Types for our data structures
interface User {
  id: string;
  username: string;
  avatar?: string;
}

interface Answer {
  id: string;
  user: User;
  content: string;
  createdAt: Date;
}

interface QuestionData {
  id: string;
  title: string;
  description: string;
  tags: string[];
  author: User;
  createdAt: Date;
  answers: Answer[];
}

// Mock data with multiple questions
const mockQuestions: QuestionData[] = [
  {
    id: 'q1',
    title: 'How do I manage state in a large React application?',
    description:
      "I'm building a complex web application and struggling with state management. What are the best practices for handling global state in a scalable way?",
    tags: ['React', 'JavaScript', 'State Management'],
    author: {
      id: 'u1',
      username: 'DevLearner',
      avatar: '/api/placeholder/40/40',
    },
    createdAt: new Date('2024-03-15T10:30:00Z'),
    answers: [
      {
        id: 'a1',
        user: {
          id: 'u2',
          username: 'ReactPro',
          avatar: '/api/placeholder/40/40',
        },
        content:
          'I recommend using Redux Toolkit or Zustand for global state management. They provide simple and efficient ways to handle complex state in React applicationsrecommend using Redux Toolkit or Zustand for global state management. They provide simple and efficient ways to handle complex state in React applicationsrecommend using Redux Toolkit or Zustand for global state management. They provide simple and efficient ways to handle complex state in React applicationsrecommend using Redux Toolkit or Zustand for global state management. They provide simple and efficient ways to handle complex state in React applicationsrecommend using Redux Toolkit or Zustand for global state management. They provide simple and efficient ways to handle complex state in React applicationsrecommend using Redux Toolkit or Zustand for global state management. They provide simple and efficient ways to handle complex state in React applicationsrecommend using Redux Toolkit or Zustand for global state management. They provide simple and efficient ways to handle complex state in React applicationsrecommend using Redux Toolkit or Zustand for global state management. They provide simple and efficient ways to handle complex state in React applicationsrecommend using Redux Toolkit or Zustand for global state management. They provide simple and efficient ways to handle complex state in React applicationsrecommend using Redux Toolkit or Zustand for global state management. They provide simple and efficient ways to handle complex state in React applicationsrecommend using Redux Toolkit or Zustand for global state management. They provide simple and efficient ways to handle complex state in React applicationsrecommend using Redux Toolkit or Zustand for global state management. They provide simple and efficient ways to handle complex state in React applicationsrecommend using Redux Toolkit or Zustand for global state management. They provide simple and efficient ways to handle complex state in React applications.',
        createdAt: new Date('2024-03-15T11:45:00Z'),
      },
      {
        id: 'a10',
        user: {
          id: 'u10',
          username: 'ReactPro',
          avatar: '/api/placeholder/40/40',
        },
        content:
          'I recommend using Redux Toolkit or Zustand for global state management. They provide simple and efficient ways to handle complex state in React applications.',
        createdAt: new Date('2024-03-15T11:45:00Z'),
      },
    ],
  },
  {
    id: 'q2',
    title: 'Best practices for TypeScript in large projects',
    description:
      "I'm looking to improve type safety and maintainability in my large-scale TypeScript project. What are some advanced TypeScript patterns and best practices?",
    tags: ['TypeScript', 'Best Practices', 'Large-scale Development'],
    author: {
      id: 'u3',
      username: 'TypeScriptEnthusiast',
      avatar: '/api/placeholder/40/40',
    },
    createdAt: new Date('2024-03-16T14:20:00Z'),
    answers: [
      {
        id: 'a2',
        user: {
          id: 'u4',
          username: 'TypeScriptGuru',
          avatar: '/api/placeholder/40/40',
        },
        content:
          'Consider using mapped types, conditional types, and creating custom type guards. Implement strict null checks and use interfaces for complex type definitions.',
        createdAt: new Date('2024-03-16T15:30:00Z'),
      },
    ],
  },
  {
    id: 'q3',
    title: 'Optimizing performance in Next.js applications',
    description:
      "What are the most effective strategies for improving performance and reducing load times in a Next.js application? I'm looking for both client-side and server-side optimization techniques.",
    tags: ['Next.js', 'Performance', 'Web Development'],
    author: {
      id: 'u5',
      username: 'WebPerformanceNerd',
      avatar: '/api/placeholder/40/40',
    },
    createdAt: new Date('2024-03-17T09:45:00Z'),
    answers: [
      {
        id: 'a3',
        user: {
          id: 'u6',
          username: 'NextJsExpert',
          avatar: '/api/placeholder/40/40',
        },
        content:
          'Focus on code splitting, implementing static site generation (SSG), and using incremental static regeneration (ISR). Optimize images, minimize client-side JavaScript, and leverage Next.js built-in performance features.',
        createdAt: new Date('2024-03-17T11:00:00Z'),
      },
    ],
  },
];

// Components
const QuestionHeader: React.FC<{ question: QuestionData }> = ({ question }) => {
  return (
    <div id="question-header">
      <h1>{question.title}</h1>
      <div className="quest-info">
        <span>Asked by {question.author.username}</span>
        <span>
          {new Date(question.createdAt).toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
          })}
        </span>
      </div>
      <div className="tags">
        {question.tags.map((tag) => (
          <span className="tag" key={tag}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

const AnswerInput: React.FC<{ onSubmitAnswer: (content: string) => void }> = ({
  onSubmitAnswer,
}) => {
  const [answerContent, setAnswerContent] = useState('');

  const handleSubmit = () => {
    if (answerContent.trim()) {
      onSubmitAnswer(answerContent);
      setAnswerContent('');
    }
  };

  return (
    <div className="answer-input-cont">
      <div className="answer-input">
        <textarea
          rows={3}
          placeholder="Write your answer here..."
          value={answerContent}
          onChange={(e) => setAnswerContent(e.target.value)}
          className="answer-field"
        />
        <button onClick={handleSubmit} className="sendBtn">
          <Send size={24} />
        </button>
      </div>
    </div>
  );
};

const AnswerList: React.FC<{ answers: Answer[] }> = ({ answers }) => {
  return (
    <div className="answer-cont">
      <h2>
        <MessageCircle /> {answers.length} Answers
      </h2>
      {answers.map((answer) => (
        <div className="answer" key={answer.id}>
          <div className="answer-header-cont">
            <div className="user-info-cont">
              <img src={answer.user.avatar} alt={answer.user.username} />
              <p>{answer.user.username}</p>
            </div>
            <p className="answer-date">
              {new Date(answer.createdAt).toLocaleDateString('en-US', {
                month: '2-digit',
                day: '2-digit',
                year: 'numeric',
              })}
            </p>
          </div>
          <ReadMore text={answer.content} maxLength={300} />
        </div>
      ))}
    </div>
  );
};

export default function QuestionDetailsPage() {
  const { id } = useParams();
  const [question, setQuestion] = useState<QuestionData | null>(null);

  useEffect(() => {
    if (id) {
      const selectedQuestion = mockQuestions.find((q) => q.id === id);
      setQuestion(selectedQuestion || null);
    }
  }, [id]);

  if (!question) {
    return <div>Question not found</div>;
  }

  const handleSubmitAnswer = (content: string) => {
    const newAnswer: Answer = {
      id: `a${question.answers.length + 1}`,
      user: {
        id: 'current-user',
        username: 'CurrentUser',
        avatar: '/api/placeholder/40/40',
      },
      content,
      createdAt: new Date(),
    };

    setQuestion({
      ...question,
      answers: [...question.answers, newAnswer],
    });
  };

  return (
    <main id="question-details" className="pad header-margin">
      <QuestionHeader question={question} />
      <div className="desc">
        <p>{question.description} </p>
      </div>
      <AnswerList answers={question.answers} />
      <AnswerInput onSubmitAnswer={handleSubmitAnswer} />
    </main>
  );
}
