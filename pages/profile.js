import Head from 'next/head'
import { useAuth } from '../hooks/useAuth'
import { useProgress } from '../hooks/useProgress'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { db } from '../lib/firebase'
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaUser, FaMedal, FaBrain, FaCalendarCheck, FaRocket,
  FaLightbulb, FaTrophy, FaChartLine, FaFire, 
  FaBook, FaGraduationCap, FaClock, FaStar,
  FaChartPie, FaStopwatch, FaArrowLeft
} from 'react-icons/fa'
import LoadingSpinner from '../components/LoadingSpinner'
import SkillProgress from '../components/profile/SkillProgress'

export default function Profile() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const { progress, isLoading: progressLoading } = useProgress()
  const [userSkills, setUserSkills] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedTimeframe, setSelectedTimeframe] = useState('week')
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    async function fetchUserSkills() {
      if (user) {
        try {
        const q = query(collection(db, 'userSkills'), where('userId', '==', user.uid))
        const querySnapshot = await getDocs(q)
        const skills = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

          const fullSkills = await Promise.all(skills.map(async (userSkill) => {
            const skillRef = doc(db, 'skills', userSkill.skillId)
            const skillDoc = await getDoc(skillRef)
            if (skillDoc.exists()) {
              return {
                ...userSkill,
                skill: { id: skillDoc.id, ...skillDoc.data() }
              }
            }
            return userSkill
          }))

          setUserSkills(fullSkills)
          setIsLoading(false)
        } catch (error) {
          console.error('Error fetching skills:', error)
        setIsLoading(false)
        }
      }
    }

    fetchUserSkills()
  }, [user])

  if (authLoading || isLoading) {
    return <LoadingSpinner />
  }

  if (!user) {
    return null
  }

  const totalSkills = userSkills.length
  const completedSkills = userSkills.filter(skill => skill.completed).length
  const learningStreak = calculateStreak(progress)
  const totalLearningTime = calculateTotalLearningTime(progress)
  const averageCompletionRate = calculateCompletionRate(userSkills)

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FaChartPie },
    { id: 'skills', label: 'Skills Journey', icon: FaBrain },
    { id: 'achievements', label: 'Achievements', icon: FaTrophy }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8">
      <Head>
        <title>{user.displayName}'s Learning Profile - SkillBoost</title>
        <meta name="description" content="View your personalized AI learning journey on SkillBoost" />
      </Head>

      <div className="container mx-auto px-4">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              {user.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt={user.displayName} 
                  className="w-16 h-16 rounded-full mr-4"
                />
              ) : (
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <FaUser className="text-3xl text-blue-500" />
                </div>
              )}
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{user.displayName}</h1>
                <p className="text-gray-600">Member since {new Date(user.metadata.creationTime).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <StatBadge icon={<FaFire />} value={learningStreak} label="Day Streak" />
              <StatBadge icon={<FaMedal />} value={completedSkills} label="Skills Mastered" />
              <StatBadge icon={<FaClock />} value={`${totalLearningTime}h`} label="Learning Time" />
            </div>
          </div>
        </motion.div>

        {/* Time Range Selector */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 flex justify-center gap-4"
        >
          {['week', 'month', 'year'].map((timeframe) => (
            <button
              key={timeframe}
              onClick={() => setSelectedTimeframe(timeframe)}
              className={`px-6 py-2 rounded-xl font-medium transition-all duration-300 ${
                selectedTimeframe === timeframe
                  ? 'bg-white shadow-lg text-blue-600 scale-105'
                  : 'text-gray-500 hover:bg-white/50'
              }`}
            >
              {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Tab Navigation */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 mb-8 flex justify-center">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="text-lg" />
                {tab.label}
              </button>
            )
          })}
      </div>

        {/* Main Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            {activeTab === 'overview' && (
              <OverviewTab 
                userSkills={userSkills}
                progress={progress}
                timeframe={selectedTimeframe}
              />
            )}

            {activeTab === 'skills' && (
              <SkillsTab 
                userSkills={userSkills}
                progress={progress}
              />
            )}

            {activeTab === 'achievements' && (
              <AchievementsTab 
                learningStreak={learningStreak}
                completedSkills={completedSkills}
                totalSkills={totalSkills}
                totalLearningTime={totalLearningTime}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

function StatBadge({ icon, value, label }) {
  return (
    <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
      <div className="text-blue-500">{icon}</div>
      <div>
        <div className="font-semibold text-gray-800">{value}</div>
        <div className="text-sm text-gray-500">{label}</div>
      </div>
    </div>
  )
}

function OverviewTab({ userSkills, progress, timeframe }) {
  // Filter progress based on timeframe and combine with skill data
  const filteredProgress = filterProgressByTimeframe(progress, timeframe)
    .map(p => {
      // Find the corresponding skill
      const skill = userSkills.find(s => s.skillId === p.skillId)
      return {
        ...p,
        skillName: skill?.skill?.name || skill?.skillName || p.skillName || 'Unnamed Skill',
        type: p.type || (p.progress >= 1 ? 'completion' : p.progress >= 0.5 ? 'milestone' : 'progress')
      }
    })
  const recentProgress = filteredProgress?.slice(0, 5) || []
  
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">Learning Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent Activity Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Recent Activity</h3>
              <span className="text-sm text-gray-500">{timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}ly Activity</span>
            </div>
            {recentProgress.length > 0 ? (
              <div className="space-y-4">
                {recentProgress.map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      {activity.type === 'completion' ? (
                        <FaTrophy className="text-yellow-500" />
                      ) : activity.type === 'milestone' ? (
                        <FaStar className="text-blue-500" />
                      ) : (
                        <FaLightbulb className="text-blue-500" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{activity.skillName}</h4>
                        {activity.type === 'completion' && (
                          <span className="px-2 py-1 bg-green-50 text-green-600 text-xs font-medium rounded-full">
                            Completed
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {activity.lessonTitle || `Made progress on ${activity.skillName}`}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-gray-500">{formatTimeAgo(activity.timestamp)}</span>
                        {activity.duration && (
                          <>
                            <span className="text-xs text-gray-300">•</span>
                            <span className="text-xs text-gray-500">{Math.round(activity.duration / 60)} min</span>
                          </>
                        )}
                        <span className="text-xs text-gray-300">•</span>
                        <span className="text-xs text-gray-500">{Math.round(activity.progress * 100)}% complete</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaBook className="text-gray-400 text-xl" />
                </div>
                <p className="text-gray-500 mb-2">No recent activity</p>
                <p className="text-sm text-gray-400">Start learning to see your progress here!</p>
              </div>
            )}
          </div>
          
          {/* Skills Distribution Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Skills Distribution</h3>
              <select className="text-sm border-gray-200 rounded-lg">
                <option value="category">By Category</option>
                <option value="status">By Status</option>
              </select>
            </div>
            {/* Add visualization here */}
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <p className="text-gray-500">Skills visualization coming soon</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function SkillsTab({ userSkills, progress }) {
  const [selectedSkill, setSelectedSkill] = useState(null)
  const router = useRouter()

  const handleContinueSkill = (skill) => {
    router.push(`/learn/${skill.skillId}`)
  }

  if (selectedSkill) {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => setSelectedSkill(null)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <FaArrowLeft /> Back to Skills
          </button>
          <h2 className="text-2xl font-bold">{selectedSkill.skill?.name || selectedSkill.skillName}</h2>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          {/* Skill Header */}
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <FaBrain className="text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold">{selectedSkill.skill?.name || selectedSkill.skillName}</h3>
              </div>
              <p className="text-gray-600">{selectedSkill.skill?.description || 'No description available'}</p>
            </div>
            <div className="flex gap-2">
              {selectedSkill.tags?.map((tag, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Progress Section */}
          <div className="border-t border-b border-gray-100 py-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Overall Progress</span>
              <span className="font-semibold">{calculateSkillProgress(selectedSkill, progress)}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3">
              <div 
                className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${calculateSkillProgress(selectedSkill, progress)}%` }}
              />
            </div>
          </div>

          {/* Learning Path */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Learning Path</h4>
            <div className="space-y-4">
              {selectedSkill.skill?.objectives?.map((objective, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="font-semibold text-blue-600">{index + 1}</span>
                  </div>
                  <div>
                    <h5 className="font-medium mb-1">{objective.title || `Objective ${index + 1}`}</h5>
                    <p className="text-gray-600 text-sm">{objective.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => handleContinueSkill(selectedSkill)}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <FaRocket />
              Continue Learning
            </button>
          </div>
        </div>
      </div>
  )
}

  return (
    <div className="space-y-8">
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Your Skills Journey</h2>
          <div className="flex gap-4">
            <select className="px-4 py-2 rounded-lg border border-gray-200 bg-white">
              <option value="all">All Skills</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userSkills.map((userSkill) => (
            <SkillCard 
              key={userSkill.id}
              skill={userSkill}
              progress={progress?.filter(p => p.skillId === userSkill.skillId) || []}
              onClick={() => setSelectedSkill(userSkill)}
              onContinue={() => handleContinueSkill(userSkill)}
            />
          ))}
      </div>
      </section>
    </div>
  )
}

function SkillCard({ skill, progress, onClick, onContinue }) {
  const progressPercentage = calculateSkillProgress(skill, progress)
  
  return (
    <motion.div 
      className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
      whileHover={{ y: -2 }}
      onClick={onClick}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <FaBrain className="text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold">{skill.skill?.name || skill.skillName}</h3>
          </div>
          {skill.completed && (
            <div className="bg-green-50 text-green-600 px-2 py-1 rounded-md text-sm font-medium">
              Completed
            </div>
          )}
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {skill.skill?.description || 'No description available'}
        </p>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium">{progressPercentage}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        <div className="mt-4 flex gap-2 flex-wrap">
          {skill.tags?.map((tag, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-blue-50 text-blue-600 rounded-md text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <div className="border-t border-gray-100 p-4 bg-gray-50">
        <button 
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          onClick={(e) => {
            e.stopPropagation()
            onContinue()
          }}
        >
          <FaRocket className="text-sm" />
          Continue Learning
        </button>
      </div>
    </motion.div>
  )
}

function AchievementsTab({ learningStreak, completedSkills, totalSkills, totalLearningTime }) {
  const achievements = [
    {
      icon: <FaFire className="text-orange-500" />,
      title: 'Learning Streak',
      description: `${learningStreak} days of consistent learning`,
      progress: Math.min((learningStreak / 30) * 100, 100)
    },
    {
      icon: <FaMedal className="text-yellow-500" />,
      title: 'Skills Mastered',
      description: `${completedSkills} out of ${totalSkills} skills completed`,
      progress: (completedSkills / totalSkills) * 100
    },
    {
      icon: <FaClock className="text-blue-500" />,
      title: 'Learning Time',
      description: `${totalLearningTime} hours of focused learning`,
      progress: Math.min((totalLearningTime / 100) * 100, 100)
    }
  ]

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-6">Your Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm"
              whileHover={{ y: -2 }}
            >
              <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                {achievement.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{achievement.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{achievement.description}</p>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${achievement.progress}%` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}

// Utility functions
function calculateStreak(progress) {
  if (!progress || progress.length === 0) return 0
  
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  let streak = 0
  let currentDate = new Date(today)
  
  while (true) {
    const hasActivityOnDate = progress.some(p => {
      const progressDate = new Date(p.timestamp)
      progressDate.setHours(0, 0, 0, 0)
      return progressDate.getTime() === currentDate.getTime()
    })
    
    if (!hasActivityOnDate) break
    
    streak++
    currentDate.setDate(currentDate.getDate() - 1)
  }
  
  return streak
}

function calculateTotalLearningTime(progress) {
  if (!progress) return 0
  return Math.round(progress.reduce((total, p) => total + (p.duration || 0), 0) / 60)
}

function calculateCompletionRate(skills) {
  if (!skills || skills.length === 0) return 0
  const completed = skills.filter(s => s.completed).length
  return Math.round((completed / skills.length) * 100)
}

function calculateSkillProgress(skill, progress) {
  if (!progress || progress.length === 0) return 0
  const latestProgress = progress.reduce((max, p) => 
    p.progress > max ? p.progress : max, 0
  )
  return Math.round(latestProgress * 100)
}

function formatTimeAgo(timestamp) {
  const now = new Date()
  const date = new Date(timestamp)
  const seconds = Math.floor((now - date) / 1000)
  
  if (seconds < 60) return 'just now'
  
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  
  const months = Math.floor(days / 30)
  if (months < 12) return `${months}mo ago`
  
  return `${Math.floor(months / 12)}y ago`
}

function filterProgressByTimeframe(progress, timeframe) {
  if (!progress) return []
  
  const now = new Date()
  const cutoff = new Date()
  
  switch (timeframe) {
    case 'week':
      cutoff.setDate(now.getDate() - 7)
      break
    case 'month':
      cutoff.setMonth(now.getMonth() - 1)
      break
    case 'year':
      cutoff.setFullYear(now.getFullYear() - 1)
      break
    default:
      cutoff.setDate(now.getDate() - 7)
  }
  
  return progress
    .filter(p => new Date(p.timestamp) > cutoff)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
}