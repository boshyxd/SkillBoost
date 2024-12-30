import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBrain, FaRedo, FaTrophy, FaChartLine } from 'react-icons/fa'

export default function LessonQuiz({
  lessonId,
  skillId,
  lessonContent,
  onQuizComplete,
  previousAttempts = [],
  isRetake = false
}) {
  const [questions, setQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [score, setScore] = useState(null)
  const [showResults, setShowResults] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [explanation, setExplanation] = useState('')

  useEffect(() => {
    if (lessonContent) {
      generateQuizQuestions()
    }
  }, [lessonContent])

  const generateQuizQuestions = async () => {
    try {
      // In production, this would make an API call to generate questions based on lesson content
      // For now, we'll use sample questions that would be AI-generated
      const generatedQuestions = [
        {
          id: 1,
          question: "What is the primary concept discussed in this lesson?",
          options: [
            "Option A - Main concept",
            "Option B - Secondary concept",
            "Option C - Related concept",
            "Option D - Unrelated concept"
          ],
          correctAnswer: 0,
          explanation: "The main concept is the foundation of this lesson and is crucial for understanding the topic."
        },
        {
          id: 2,
          question: "How would you apply the learned concept in a real-world scenario?",
          options: [
            "Application A",
            "Application B",
            "Application C",
            "Application D"
          ],
          correctAnswer: 1,
          explanation: "This application demonstrates practical usage of the concept."
        },
        {
          id: 3,
          question: "What is a potential challenge when implementing this concept?",
          options: [
            "Challenge A",
            "Challenge B",
            "Challenge C",
            "Challenge D"
          ],
          correctAnswer: 2,
          explanation: "Understanding potential challenges helps in better implementation."
        }
      ]
      setQuestions(generatedQuestions)
    } catch (error) {
      console.error('Error generating quiz questions:', error)
    }
  }

  const handleAnswer = (questionId, answerIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }))
    setExplanation(questions[currentQuestionIndex].explanation)
  }

  const calculateScore = () => {
    const totalQuestions = questions.length
    const correctAnswers = questions.reduce((count, question) => {
      return count + (answers[question.id] === question.correctAnswer ? 1 : 0)
    }, 0)
    return Math.round((correctAnswers / totalQuestions) * 100)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    const finalScore = calculateScore()
    setScore(finalScore)
    setShowResults(true)

    // Send results to parent component
    onQuizComplete({
      score: finalScore,
      answers,
      timestamp: new Date().toISOString(),
      isRetake
    })
    setIsSubmitting(false)
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
      setExplanation('')
    }
  }

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
      setExplanation(questions[currentQuestionIndex - 1].explanation)
    }
  }

  if (!questions.length) return null

  if (showResults) {
    return (
      <motion.div
        className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-center">
          <div className="inline-block p-4 rounded-full bg-blue-50 mb-4">
            <FaTrophy className="text-4xl text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Quiz Complete!</h2>
          <div className="text-5xl font-bold text-blue-600 mb-4">{score}%</div>
          
          <div className="mb-8">
            <h3 className="font-semibold text-gray-700 mb-2">Previous Attempts</h3>
            <div className="flex justify-center gap-2">
              {previousAttempts.map((attempt, index) => (
                <div key={index} className="px-3 py-1 rounded-full bg-gray-100 text-sm text-gray-600">
                  {attempt}%
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => {
                setShowResults(false)
                setAnswers({})
                setCurrentQuestionIndex(0)
                setScore(null)
                generateQuizQuestions()
              }}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors duration-300"
            >
              <FaRedo />
              Retake Quiz
            </button>
            
            <button
              onClick={() => window.location.href = `/profile#skills/${skillId}`}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-colors duration-300"
            >
              <FaChartLine />
              View Progress
            </button>
          </div>
        </div>
      </motion.div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <motion.div
      className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-xl bg-blue-50">
          <FaBrain className="text-2xl text-blue-500" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">Knowledge Check</h2>
          <p className="text-gray-600">Question {currentQuestionIndex + 1} of {questions.length}</p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-800 mb-4">{currentQuestion.question}</h3>
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(currentQuestion.id, index)}
              className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                answers[currentQuestion.id] === index
                  ? 'bg-blue-50 border-2 border-blue-500 text-blue-700'
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {explanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 bg-blue-50 rounded-xl p-4"
          >
            <p className="text-blue-700">{explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between">
        <button
          onClick={prevQuestion}
          disabled={currentQuestionIndex === 0}
          className={`px-6 py-3 rounded-xl font-semibold transition-colors duration-300 ${
            currentQuestionIndex === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Previous
        </button>

        {currentQuestionIndex === questions.length - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || Object.keys(answers).length !== questions.length}
            className={`px-6 py-3 rounded-xl font-semibold transition-colors duration-300 ${
              isSubmitting || Object.keys(answers).length !== questions.length
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
          </button>
        ) : (
          <button
            onClick={nextQuestion}
            disabled={!answers[currentQuestion.id]}
            className={`px-6 py-3 rounded-xl font-semibold transition-colors duration-300 ${
              !answers[currentQuestion.id]
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Next
          </button>
        )}
      </div>
    </motion.div>
  )
} 