import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaBook, FaChartLine, FaTrophy, FaClock, FaLock } from 'react-icons/fa'
import Link from 'next/link'

export default function SkillProgress({ skill, progress, completedLessons = [] }) {
  const [expandedLesson, setExpandedLesson] = useState(null)

  const calculateOverallProgress = () => {
    if (!progress) return 0
    const lessonScores = Object.values(progress).map(lesson => 
      lesson.quizScore ? lesson.quizScore : 0
    )
    return lessonScores.length > 0 
      ? Math.round(lessonScores.reduce((a, b) => a + b, 0) / lessonScores.length)
      : 0
  }

  const formatDate = (timestamp) => {
    if (!timestamp) return ''
    return new Date(timestamp.seconds * 1000).toLocaleDateString()
  }

  const isLessonUnlocked = (index) => {
    if (index === 0) return true; // First lesson is always unlocked
    // A lesson is unlocked if the previous lesson is completed
    return completedLessons.includes((index - 1).toString());
  }

  // Calculate completed lessons count
  const completedCount = Object.values(progress || {}).filter(p => p.progress === 100).length;

  return (
    <motion.div
      className="bg-white rounded-3xl shadow-xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Skill Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">{skill.skillTitle}</h2>
            <p className="text-blue-100">{skill.description || 'Master this skill through our structured lessons'}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-white mb-1">{calculateOverallProgress()}%</div>
            <div className="text-blue-100 text-sm">Overall Score</div>
          </div>
        </div>
      </div>

      {/* Progress Stats */}
      <div className="grid grid-cols-3 gap-4 p-6 bg-gray-50">
        <div className="text-center">
          <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2">
            <FaBook className="text-blue-600 text-xl" />
          </div>
          <div className="text-sm font-medium text-gray-600">
            {skill.totalLessons || 0} Lessons
          </div>
        </div>
        <div className="text-center">
          <div className="bg-green-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2">
            <FaChartLine className="text-green-600 text-xl" />
          </div>
          <div className="text-sm font-medium text-gray-600">
            {completedCount} Completed
          </div>
        </div>
        <div className="text-center">
          <div className="bg-yellow-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2">
            <FaTrophy className="text-yellow-600 text-xl" />
          </div>
          <div className="text-sm font-medium text-gray-600">
            Best Score: {Math.max(...Object.values(progress || {}).map(l => l.quizScore || 0), 0)}%
          </div>
        </div>
      </div>

      {/* Lesson List */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Lesson Progress</h3>
        <div className="space-y-4">
          {(skill.lessons || []).map((lesson, index) => {
            const lessonProgress = progress?.[index] || {}
            const isExpanded = expandedLesson === index
            const isUnlocked = isLessonUnlocked(index)

            return (
              <motion.div
                key={index}
                className={`border rounded-xl overflow-hidden ${!isUnlocked ? 'opacity-75' : ''}`}
                initial={false}
                animate={{ height: isExpanded ? 'auto' : '72px' }}
              >
                <div 
                  className={`p-4 bg-white ${isUnlocked ? 'cursor-pointer hover:bg-gray-50' : 'bg-gray-50'} transition-colors duration-300`}
                  onClick={() => isUnlocked && setExpandedLesson(isExpanded ? null : index)}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      {!isUnlocked && (
                        <div className="flex-shrink-0">
                          <FaLock className="text-gray-400 text-lg" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <h4 className="font-medium text-gray-800 truncate">
                          {lesson.title || 'Untitled Lesson'}
                        </h4>
                        {lessonProgress.lastQuizAttempt && (
                          <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                            <FaClock className="text-gray-400 flex-shrink-0" />
                            <span className="truncate">Last attempt: {formatDate(lessonProgress.lastQuizAttempt)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <div className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-medium whitespace-nowrap">
                        {lessonProgress.quizScore || '0'}%
                      </div>
                      {isUnlocked && (
                        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                          <svg
                            className={`w-4 h-4 text-gray-500 transform transition-transform duration-300 ${
                              isExpanded ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                {isExpanded && isUnlocked && (
                  <div className="p-4 bg-gray-50 border-t">
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium text-gray-700 mb-2">Quiz Performance</h5>
                        <div className="flex items-center gap-4">
                          <div className="flex-1">
                            <div className="h-2 bg-gray-200 rounded-full">
                              <div
                                className="h-full bg-blue-500 rounded-full"
                                style={{ width: `${lessonProgress.quizScore || 0}%` }}
                              />
                            </div>
                          </div>
                          <div className="font-medium text-gray-700">
                            {lessonProgress.quizScore || 0}%
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Link href={`/skills/${skill.skill?.id || skill.skillId}`}>
                          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
                            {lessonProgress.quizScore !== undefined ? 'Review Lesson' : 'Start Lesson'}
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
} 