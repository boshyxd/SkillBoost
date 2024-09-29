import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import QuizQuestion from '../../components/quiz/QuizQuestion';
import { useQuiz } from '../../hooks/useQuiz';

export default function Quiz() {
  const router = useRouter();
  const { id } = router.query;
  const { quiz, isLoading, error } = useQuiz(id);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  if (isLoading) return <div>Loading quiz...</div>;
  if (error) return <div>Error loading quiz: {error.message}</div>;
  if (!quiz) return null;

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleAnswer = (answer) => {
    setUserAnswers([...userAnswers, answer]);
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz completed, submit answers
      submitQuizResults();
    }
  };

  const submitQuizResults = async () => {
    // TODO: Implement submission to API
    console.log('Quiz completed:', userAnswers);
    router.push('/quiz-results');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>{quiz.title} - SkillBoost Quiz</title>
      </Head>
      <h1 className="text-3xl font-bold mb-6">{quiz.title}</h1>
      <QuizQuestion
        question={currentQuestion}
        onAnswer={handleAnswer}
      />
    </div>
  );
}