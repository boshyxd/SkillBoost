import Head from 'next/head'
import Link from 'next/link'
import { useProgress } from '../hooks/useProgress'
import { useAuth } from '../hooks/useAuth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { db } from '../lib/firebase'
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaLightbulb, FaRocket, FaTrophy, FaChartLine, FaFire, 
  FaBook, FaGraduationCap, FaClock, FaBrain, FaStar,
  FaCalendarCheck, FaChartPie, FaStopwatch
} from 'react-icons/fa'
import LoadingSpinner from '../components/LoadingSpinner'
import SkillProgress from '../components/profile/SkillProgress'

export default function LearningJourney() {
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
          // Get user skills
          const q = query(collection(db, 'userSkills'), where('userId', '==', user.uid))
          const querySnapshot = await getDocs(q)
          const skills = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

          // For each skill, fetch the full skill data
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

          console.log('Fetched skills:', fullSkills)
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
  const mostActiveDay = calculateMostActiveDay(progress)
  const skillDistribution = calculateSkillDistribution(userSkills)

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FaChartPie },
    { id: 'skills', label: 'Skills', icon: FaBrain },
    { id: 'achievements', label: 'Achievements', icon: FaTrophy }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8">
      <Head>
        <title>Learning Analytics - SkillBoost</title>
        <meta name="description" content="Detailed analytics of your learning journey on SkillBoost" />
      </Head>

      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4 font-poppins">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Learning Analytics
            </span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Track your progress, analyze your learning patterns, and celebrate your achievements
          </p>
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

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            icon={<FaBook />} 
            title="Active Skills" 
            value={totalSkills} 
            subtitle="Currently Learning"
            color="from-blue-500 to-blue-600"
          />
          <StatCard 
            icon={<FaStopwatch />} 
            title="Learning Time" 
            value={`${totalLearningTime}h`}
            subtitle="This Week" 
            color="from-green-500 to-teal-600"
          />
          <StatCard 
            icon={<FaFire />} 
            title="Day Streak" 
            value={learningStreak}
            subtitle="Keep it up!" 
            color="from-orange-500 to-red-600"
          />
          <StatCard 
            icon={<FaStar />} 
            title="Completion Rate" 
            value={`${averageCompletionRate}%`}
            subtitle="Average Progress" 
            color="from-purple-500 to-pink-600"
          />
        </div>

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
          >
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <LearningPatterns 
                  mostActiveDay={mostActiveDay}
                  skillDistribution={skillDistribution}
                />
                <RecentActivity progress={progress} />
              </div>
            )}

            {activeTab === 'skills' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userSkills.map((userSkill) => {
                  // Get the full skill data
                  const skillDetails = userSkill.skill || {};
                  console.log('Detailed skill structure:', skillDetails);
                  
                  // Create lessons from objectives and prerequisites
                  const lessons = [
                    // Add prerequisites as initial lessons
                    ...(skillDetails.prerequisites || []).map((prereq, index) => ({
                      id: `lesson-${index + 1}`,
                      title: `Prerequisite ${index + 1}: ${prereq.description || prereq.title || prereq.name || 'Foundation Knowledge'}`,
                      description: prereq.description || prereq.details,
                      content: prereq.content,
                      type: 'prerequisite'
                    })),
                    // Add objectives as main lessons
                    ...(skillDetails.objectives || []).map((obj, index) => {
                      const lessonNumber = index + (skillDetails.prerequisites?.length || 0) + 1;
                      return {
                        id: `lesson-${lessonNumber}`,
                        title: `Lesson ${lessonNumber}: ${obj.description || obj.title || 'Core Concept'}`,
                        description: obj.details || obj.description,
                        content: obj.content,
                        type: 'objective'
                      };
                    })
                  ];

                  console.log('Created lessons with titles:', lessons.map(l => l.title));
                  
                  // Group progress by lesson
                  const lessonProgress = {};
                  const completedLessons = new Set();
                  
                  // Get all progress entries for this skill
                  const skillProgress = progress?.filter(p => p.skillId === userSkill.skillId) || [];
                  
                  skillProgress.forEach(p => {
                    // Use lessonId as key for lessonProgress
                    const lessonIndex = parseInt(p.lessonId) - 1;
                    if (!isNaN(lessonIndex) && (!lessonProgress[lessonIndex] || p.progress > lessonProgress[lessonIndex].progress)) {
                      lessonProgress[lessonIndex] = {
                        lessonId: p.lessonId,
                        lessonTitle: p.lessonTitle,
                        progress: p.progress,
                        quizScore: p.quizScore || 0,
                        lastQuizAttempt: p.updatedAt ? { seconds: new Date(p.updatedAt).getTime() / 1000 } : null
                      };
                      if (p.progress === 100) {
                        completedLessons.add(lessonIndex.toString());
                      }
                    }
                  });

                  // Prepare skill data
                  const skillData = {
                    ...userSkill,
                    skillId: userSkill.skillId,
                    skillTitle: skillDetails.title || userSkill.skillTitle,
                    description: skillDetails.description || userSkill.description,
                    totalLessons: lessons.length,
                    lessons: lessons
                  };

                  // Initialize progress for all lessons
                  skillData.lessons.forEach((_, index) => {
                    if (!lessonProgress[index]) {
                      lessonProgress[index] = {
                        lessonId: (index + 1).toString(),
                        progress: 0,
                        quizScore: 0
                      };
                    }
                  });

                  console.log('Final skill data:', {
                    skillId: skillData.skillId,
                    skillTitle: skillData.skillTitle,
                    totalLessons: skillData.totalLessons,
                    lessons: skillData.lessons,
                    progress: lessonProgress,
                    completedLessons: Array.from(completedLessons)
                  });

                  return (
                    <SkillProgress 
                      key={skillData.skillId}
                      skill={skillData}
                      progress={lessonProgress}
                      completedLessons={Array.from(completedLessons)}
                    />
                  );
                })}
              </div>
            )}

            {activeTab === 'achievements' && (
              <AchievementsSection 
                learningStreak={learningStreak}
                completedSkills={completedSkills}
                totalLearningTime={totalLearningTime}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

function StatCard({ icon, title, value, subtitle, color }) {
  return (
    <motion.div 
      className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden group"
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-10 
        group-hover:opacity-20 transition-opacity duration-300`} />
      
      <div className="relative p-6">
        <div className={`text-4xl bg-gradient-to-br ${color} bg-clip-text text-transparent mb-4 
          group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
          <p className={`text-3xl font-bold bg-gradient-to-br ${color} bg-clip-text text-transparent`}>
            {value}
          </p>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
      </div>
    </motion.div>
  )
}

function EnhancedSkillCard({ skill, progress }) {
  const skillProgress = progress ? progress.filter(p => p.skillId === skill.id).length : 0
  const totalLessons = skill.lessons ? skill.lessons.length : 1
  const progressPercentage = Math.round((skillProgress / totalLessons) * 100)

  return (
    <motion.div 
      className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden"
      whileHover={{ scale: 1.03, y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-800">{skill.skill}</h3>
          <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
            {progressPercentage}%
          </div>
        </div>

        <div className="mb-6">
          <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span className="text-gray-500">{skillProgress} of {totalLessons} lessons</span>
            <span className="text-blue-600 font-medium">
              {totalLessons - skillProgress} remaining
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <Link 
            href={`/skills/${skill.id}`}
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl 
              font-semibold text-center hover:shadow-lg transition-all duration-300"
          >
            Continue
          </Link>
          <button
            className="px-4 py-2 border-2 border-blue-200 rounded-xl text-blue-600 hover:bg-blue-50 
              transition-colors duration-300"
            onClick={() => {/* Add review functionality */}}
          >
            Review
          </button>
        </div>
      </div>
    </motion.div>
  )
}

function LearningPatterns({ mostActiveDay, skillDistribution }) {
  return (
    <motion.div 
      className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="text-xl font-semibold mb-6">Learning Patterns</h3>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaCalendarCheck className="text-2xl text-blue-500" />
            <div>
              <p className="text-gray-600">Most Active Day</p>
              <p className="text-lg font-semibold">{mostActiveDay}</p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-gray-600 mb-3">Skill Distribution</h4>
          <div className="space-y-3">
            {Object.entries(skillDistribution).map(([category, percentage]) => (
              <div key={category}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{category}</span>
                  <span className="text-blue-600 font-medium">{percentage}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function RecentActivity({ progress }) {
  const recentActivities = progress?.slice(-5).reverse() || []

  return (
    <motion.div 
      className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="text-xl font-semibold mb-6">Recent Activity</h3>
      <div className="space-y-4">
        {recentActivities.map((activity, index) => (
          <Link
            key={activity.id}
            href={`/lessons/${activity.skillId}/${activity.lessonId}`}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors duration-300"
            >
              <div className="bg-blue-100 p-3 rounded-xl">
                <FaBook className="text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">{activity.skillTitle}</p>
                <p className="text-sm text-gray-500">{activity.lessonTitle}</p>
              </div>
              <span className="ml-auto text-sm text-gray-400">
                {formatTimeAgo(activity.updatedAt)}
              </span>
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.div>
  )
}

function AchievementsSection({ learningStreak, completedSkills, totalLearningTime }) {
  const achievements = [
    {
      icon: FaFire,
      title: `${learningStreak} Day Streak`,
      description: "Keep learning daily to maintain your streak!",
      progress: (learningStreak / 30) * 100, // Example: goal is 30 days
      color: "from-orange-500 to-red-600"
    },
    {
      icon: FaTrophy,
      title: `${completedSkills} Skills Mastered`,
      description: "You're becoming a true polymath!",
      progress: (completedSkills / 10) * 100, // Example: goal is 10 skills
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: FaClock,
      title: `${totalLearningTime}h Learning Time`,
      description: "Time invested in your growth",
      progress: (totalLearningTime / 100) * 100, // Example: goal is 100 hours
      color: "from-green-500 to-teal-600"
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {achievements.map((achievement, index) => (
        <motion.div
          key={achievement.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6"
        >
          <div className={`text-4xl bg-gradient-to-br ${achievement.color} bg-clip-text text-transparent mb-4`}>
            <achievement.icon />
          </div>
          <h3 className="text-xl font-semibold mb-2">{achievement.title}</h3>
          <p className="text-gray-600 mb-4">{achievement.description}</p>
          <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
            <motion.div
              className={`h-full bg-gradient-to-r ${achievement.color}`}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(achievement.progress, 100)}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
          <div className="mt-2 text-right">
            <span className="text-sm font-medium text-gray-500">
              {Math.round(achievement.progress)}% Complete
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// Helper functions
function calculateTotalLearningTime(progress) {
  // Implement actual calculation based on your progress data
  return progress ? Math.round(progress.length * 1.5) : 0
}

function calculateCompletionRate(skills) {
  if (!skills || skills.length === 0) return 0
  const completed = skills.filter(skill => skill.completed).length
  return Math.round((completed / skills.length) * 100)
}

function calculateMostActiveDay(progress) {
  // Implement actual calculation based on your progress data
  return "Wednesday"
}

function calculateSkillDistribution(skills) {
  // Example implementation - replace with actual categories and calculation
  return {
    "Programming": 40,
    "Design": 30,
    "Business": 20,
    "Other": 10
  }
}

function formatTimeAgo(timestamp) {
  if (!timestamp) return '';
  
  const date = new Date(timestamp);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days === 1 ? '' : 's'} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  } else {
    return 'Just now';
  }
}

function calculateStreak(progress) {
  return progress && progress.length > 0 ? progress.length : 0
}
