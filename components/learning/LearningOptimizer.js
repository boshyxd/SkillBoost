import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBrain, FaClock, FaLightbulb, FaCheckCircle, FaRedo, FaChartLine } from 'react-icons/fa'
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../../lib/firebase'

export default function LearningOptimizer({
  user,
  skillId,
  lessonId,
  content,
  onComplete,
  isReview = false
}) {
  const [learningState, setLearningState] = useState('initial') // initial, learning, review, complete
  const [explanations, setExplanations] = useState([])
  const [reviewSchedule, setReviewSchedule] = useState(null)
  const [lastReviewDate, setLastReviewDate] = useState(null)
  const [comprehensionScore, setComprehensionScore] = useState(0)
  const [showSelfExplanation, setShowSelfExplanation] = useState(false)

  useEffect(() => {
    if (user) {
      loadLearningState()
    }
  }, [user, skillId, lessonId])

  const loadLearningState = async () => {
    try {
      const learningRef = doc(db, 'learningStates', `${user.uid}_${skillId}_${lessonId}`)
      const learningDoc = await getDoc(learningRef)
      
      if (learningDoc.exists()) {
        const data = learningDoc.data()
        setLearningState(data.state)
        setExplanations(data.explanations || [])
        setReviewSchedule(data.reviewSchedule)
        setLastReviewDate(data.lastReviewDate)
        setComprehensionScore(data.comprehensionScore || 0)
      }
    } catch (error) {
      console.error('Error loading learning state:', error)
    }
  }

  const updateLearningState = async (newState, additionalData = {}) => {
    try {
      const learningRef = doc(db, 'learningStates', `${user.uid}_${skillId}_${lessonId}`)
      const timestamp = serverTimestamp()
      
      const updateData = {
        state: newState,
        lastUpdated: timestamp,
        ...additionalData
      }

      await setDoc(learningRef, updateData, { merge: true })
      setLearningState(newState)
    } catch (error) {
      console.error('Error updating learning state:', error)
    }
  }

  const calculateNextReviewDate = (currentLevel = 0) => {
    // Implement spaced repetition intervals (e.g., 1 day, 3 days, 7 days, 14 days, 30 days)
    const intervals = [1, 3, 7, 14, 30]
    const days = intervals[Math.min(currentLevel, intervals.length - 1)]
    const nextDate = new Date()
    nextDate.setDate(nextDate.getDate() + days)
    return nextDate
  }

  const handleSelfExplanation = async (explanation) => {
    const newExplanations = [...explanations, {
      text: explanation,
      timestamp: new Date().toISOString()
    }]
    
    await updateLearningState(learningState, {
      explanations: newExplanations,
      comprehensionScore: Math.min(comprehensionScore + 10, 100)
    })
    
    setExplanations(newExplanations)
    setShowSelfExplanation(false)
  }

  const scheduleNextReview = async () => {
    const nextReviewDate = calculateNextReviewDate(reviewSchedule?.level || 0)
    const newSchedule = {
      nextReviewDate,
      level: (reviewSchedule?.level || 0) + 1,
      lastReviewDate: new Date()
    }
    
    await updateLearningState(learningState, {
      reviewSchedule: newSchedule,
      lastReviewDate: serverTimestamp()
    })
    
    setReviewSchedule(newSchedule)
    setLastReviewDate(new Date())
  }

  return (
    <div className="space-y-6">
      {/* Learning Progress Indicator */}
      <motion.div
        className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-blue-50">
              <FaBrain className="text-2xl text-blue-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Learning Progress</h3>
              <p className="text-gray-600">Optimizing your learning experience</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-32 h-2 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${comprehensionScore}%` }}
              />
            </div>
            <span className="text-sm font-medium text-gray-600">
              {comprehensionScore}%
            </span>
          </div>
        </div>

        {/* Spaced Repetition Schedule */}
        {reviewSchedule && (
          <div className="mb-6 p-4 bg-blue-50 rounded-xl">
            <div className="flex items-center gap-2 text-blue-700 mb-2">
              <FaClock className="text-lg" />
              <span className="font-semibold">Next Review</span>
            </div>
            <p className="text-blue-600">
              Scheduled for: {reviewSchedule.nextReviewDate.toLocaleDateString()}
            </p>
          </div>
        )}

        {/* Self-Explanation Prompt */}
        <AnimatePresence>
          {showSelfExplanation ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6"
            >
              <textarea
                className="w-full p-4 border-2 border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all duration-300"
                rows="4"
                placeholder="Explain this concept in your own words..."
                onChange={(e) => handleSelfExplanation(e.target.value)}
              />
            </motion.div>
          ) : (
            <button
              onClick={() => setShowSelfExplanation(true)}
              className="w-full px-4 py-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <FaLightbulb />
              Explain This Concept
            </button>
          )}
        </AnimatePresence>

        {/* Previous Explanations */}
        {explanations.length > 0 && (
          <div className="mt-6">
            <h4 className="font-semibold text-gray-700 mb-3">Your Understanding</h4>
            <div className="space-y-3">
              {explanations.map((exp, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">{exp.text}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(exp.timestamp).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={scheduleNextReview}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-300"
          >
            <FaRedo />
            Schedule Review
          </button>
          <button
            onClick={() => onComplete(comprehensionScore)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors duration-300"
          >
            <FaCheckCircle />
            Complete Lesson
          </button>
        </div>
      </motion.div>

      {/* Learning Tips */}
      <motion.div
        className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FaLightbulb className="text-yellow-500" />
          Learning Tips
        </h4>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <FaCheckCircle className="text-green-500 mt-1" />
            <span className="text-gray-700">
              Explain concepts in your own words to strengthen understanding
            </span>
          </li>
          <li className="flex items-start gap-3">
            <FaCheckCircle className="text-green-500 mt-1" />
            <span className="text-gray-700">
              Review material at scheduled intervals for better retention
            </span>
          </li>
          <li className="flex items-start gap-3">
            <FaCheckCircle className="text-green-500 mt-1" />
            <span className="text-gray-700">
              Test yourself regularly with practice questions
            </span>
          </li>
        </ul>
      </motion.div>
    </div>
  )
} 