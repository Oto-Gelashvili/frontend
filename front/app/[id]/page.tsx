'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import './questionDetails.css';

interface Question {
  id: number;
  title: string;
  content: string;
  author: string;
  created_at: string;
}

interface Answer {
  id: number;
  content: string;
  author: string;
  created_at: string;
}

const QuestionDetailsPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query; // Extract the `id` from the route
  const [question, setQuestion] = useState<Question | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newAnswer, setNewAnswer] = useState('');

  // Fetch question and answers data
  useEffect(() => {
    const fetchQuestionDetails = async () => {
      try {
        setIsLoading(true);

        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('Authorization token is missing');
        }

        const [questionResponse, answersResponse] = await Promise.all([
          fetch(`http://165.232.116.35:8000/api/forum/questions/${id}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }),
          fetch(`http://165.232.116.35:8000/api/forum/${id}/answers`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }),
        ]);

        if (!questionResponse.ok || !answersResponse.ok) {
          throw new Error('Failed to fetch question details or answers');
        }

        const questionData: Question = await questionResponse.json();
        const answersData: Answer[] = await answersResponse.json();

        setQuestion(questionData);
        setAnswers(answersData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred'
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchQuestionDetails();
  }, [id]);

  // Handle answer submission
  const handleAnswerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Authorization token is missing');
      }

      const response = await fetch(
        `http://165.232.116.35:8000/api/forum/${id}/answers`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content: newAnswer }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to submit the answer');
      }

      const createdAnswer: Answer = await response.json();
      setAnswers((prevAnswers) => [...prevAnswers, createdAnswer]);
      setNewAnswer(''); // Clear the answer input field
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unknown error occurred'
      );
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!question) return <div>Question not found</div>;

  return (
    <div id="question-details-container">
      <h1>{question.title}</h1>
      <p>{question.content}</p>
      <p>
        <strong>Author:</strong> {question.author}
      </p>
      <p>
        <strong>Created At:</strong>{' '}
        {new Date(question.created_at).toLocaleString()}
      </p>

      <h2>Answers</h2>
      <div id="answers-list">
        {answers.map((answer) => (
          <div key={answer.id} className="answer-item">
            <p>{answer.content}</p>
            <p>
              <strong>Author:</strong> {answer.author}
            </p>
            <p>
              <strong>Created At:</strong>{' '}
              {new Date(answer.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <h2>Submit Your Answer</h2>
      <form onSubmit={handleAnswerSubmit}>
        <textarea
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          placeholder="Write your answer here..."
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default QuestionDetailsPage;
