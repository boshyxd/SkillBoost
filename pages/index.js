import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../hooks/useAuth'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import TestimonialCarousel from '../components/TestimonialCarousel'
import { v4 as uuidv4 } from 'uuid'
import { useUserSkills } from '../hooks/useUserSkills'
import LoadingAnimation from '../components/LoadingAnimation'
import { FaRocket, FaBrain, FaLightbulb, FaUsers, FaChartLine, FaCog, FaArrowRight, FaLock, FaSignInAlt, FaUserPlus, FaInfinity, FaClock } from 'react-icons/fa'
import { getApiUrl, getPageUrl } from '../utils/path'
import { collection, getCountFromServer } from 'firebase/firestore'
import { db } from '../lib/firebase'

export default function Home() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [interests, setInterests] = useState('')
  const [recommendedSkills, setRecommendedSkills] = useState([])
  const [isRecommending, setIsRecommending] = useState(false)
  const [recommendationError, setRecommendationError] = useState(null)
  const [generationSuccess, setGenerationSuccess] = useState(false)
  const { addUserSkill } = useUserSkills()
  const interestsInputRef = useRef(null)
  const [userCount, setUserCount] = useState(0)
  const [isCountLoading, setIsCountLoading] = useState(true)

  useEffect(() => {
    // Remove the redirect logic
  }, [user, authLoading, router])

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const usersCol = collection(db, 'users')
        const snapshot = await getCountFromServer(usersCol)
        setUserCount(snapshot.data().count)
      } catch (error) {
        console.error('Error fetching user count:', error)
      } finally {
        setIsCountLoading(false)
      }
    }

    fetchUserCount()
  }, [])

  const handleRecommendation = async () => {
    if (!interests.trim()) return

    setIsRecommending(true)
    setRecommendationError(null)
    setGenerationSuccess(false)
    try {
      const response = await axios.post(getApiUrl('/recommend-skills'), { 
        interests,
        userId: user.uid
      })
      if (response.data.recommendations && response.data.recommendations.length > 0) {
        const recommendationsWithIds = response.data.recommendations.map(skill => ({
          ...skill,
          id: skill.id || uuidv4(),
        }))
        setRecommendedSkills(recommendationsWithIds)
        setGenerationSuccess(true)
        setInterests('')
      } else {
        setRecommendationError('Not enough information provided to generate skill recommendations. Please provide more detailed interests.')
      }
    } catch (error) {
      console.error('Error getting recommendations:', error)
      setRecommendationError(error.response?.data?.message || 'An error occurred while generating recommendations. Please try again.')
    } finally {
      setIsRecommending(false)
    }
  }

  const handleStartLearning = async (skill) => {
    try {
      await addUserSkill(skill)
      router.push(`/skills/${skill.id}`)
    } catch (error) {
      console.error('Error starting skill:', error)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleRecommendation()
    }
  }

  if (authLoading) {
    return <LoadingAnimation />
  }

  return (
    <>
      <Head>
        <title>SkillBoost - Elevate Your Learning Journey</title>
        <meta name="description" content="AI-powered personalized skill development platform" />
        <link rel="icon" href="/favicon.ico" />
        <style>{`
          .gradient-text {
            background: linear-gradient(135deg, #3B82F6, #6366F1);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .hero-gradient {
            background: radial-gradient(circle at top right, rgba(99, 102, 241, 0.15) 0%, rgba(59, 130, 246, 0.15) 30%, rgba(147, 197, 253, 0.15) 100%);
          }
          .floating {
            animation: float 6s ease-in-out infinite;
          }
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0px); }
          }
          .glow {
            animation: glow 3s ease-in-out infinite alternate;
          }
          @keyframes glow {
            from { box-shadow: 0 0 20px -10px rgba(59, 130, 246, 0.5); }
            to { box-shadow: 0 0 30px 5px rgba(99, 102, 241, 0.6); }
          }
          .highlight-pulse {
            animation: highlightPulse 2s infinite;
          }
          @keyframes highlightPulse {
            0% { background-color: rgba(59, 130, 246, 0.1); }
            50% { background-color: rgba(99, 102, 241, 0.2); }
            100% { background-color: rgba(59, 130, 246, 0.1); }
          }
        `}</style>
      </Head>

      <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-50">
        <main className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative text-center mb-12 hero-gradient rounded-3xl p-8 md:p-12 shadow-lg overflow-hidden"
          >
            {/* Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-200 rounded-full opacity-20 blur-3xl"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                  delay: 0.2 
                }}
                className="inline-block p-4 bg-white rounded-2xl shadow-xl mb-6 glow"
              >
                <motion.div
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <FaRocket className="text-4xl md:text-5xl text-blue-600" />
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="max-w-3xl mx-auto"
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text font-poppins leading-tight tracking-tight">
                  Boost Your Skills
                  <br />
                  <span className="text-3xl md:text-4xl">with AI-Powered Learning</span>
                </h1>
                <motion.div
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut"
                  }}
                  className="mb-4"
                >
                  <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 highlight-pulse text-blue-600 text-lg md:text-xl font-semibold">
                    100% Free Forever
                  </span>
                </motion.div>
                <p className="text-lg md:text-xl text-gray-700 font-inter max-w-2xl mx-auto mb-6">
                  Experience personalized learning pathways that adapt to your goals and interests, 
                  <span className="font-semibold text-blue-600"> without spending a penny</span>
                </p>

                {!user && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="flex flex-wrap gap-3 justify-center"
                  >
                    <Link href="/register">
                      <motion.div
                        className="inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-lg font-semibold transition duration-300 hover:shadow-lg group"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaRocket className="mr-2 transform group-hover:rotate-12 transition-transform duration-300" />
                        Get Started Free
                        <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                      </motion.div>
                    </Link>
                    <Link href="/explore">
                      <motion.div
                        className="inline-flex items-center px-6 py-2.5 bg-white text-blue-600 rounded-xl text-lg font-semibold transition duration-300 hover:shadow-lg group border-2 border-blue-100"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaLightbulb className="mr-2" />
                        Explore Skills
                      </motion.div>
                    </Link>
                  </motion.div>
                )}
              </motion.div>

              {/* Stats Section */}
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap justify-center gap-6 mt-8"
              >
                <motion.div 
                  className="bg-white/90 backdrop-blur-sm px-5 py-3 rounded-xl group hover:bg-white transition-all duration-300"
                  whileHover={{ y: -2 }}
                >
                  <div className="flex items-center justify-center mb-1">
                    <FaInfinity className="text-3xl text-blue-600 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="text-gray-600 text-center text-sm font-medium">Unlimited Skills</div>
                </motion.div>

                <motion.div 
                  className="bg-white/90 backdrop-blur-sm px-5 py-3 rounded-xl group hover:bg-white transition-all duration-300"
                  whileHover={{ y: -2 }}
                >
                  <div className="flex items-center justify-center space-x-2 mb-1">
                    <motion.div
                      className="text-2xl font-bold text-blue-600"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {isCountLoading ? (
                        <span className="inline-block w-12 h-6 bg-blue-100 rounded animate-pulse"></span>
                      ) : (
                        <motion.span
                          key={userCount}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ type: "spring", stiffness: 200 }}
                        >
                          {userCount}+
                        </motion.span>
                      )}
                    </motion.div>
                    <FaUsers className="text-2xl text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="text-gray-600 text-center text-sm font-medium">Active Learners</div>
                </motion.div>

                <motion.div 
                  className="bg-white/90 backdrop-blur-sm px-5 py-3 rounded-xl group hover:bg-white transition-all duration-300"
                  whileHover={{ y: -2 }}
                >
                  <div className="flex items-center justify-center mb-1">
                    <FaRocket className="text-3xl text-blue-600 transform group-hover:rotate-12 transition-all duration-300" />
                  </div>
                  <div className="text-gray-600 text-center text-sm font-medium">AI-Powered Learning</div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* AI Recommender Section - Moved up for emphasis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl shadow-xl p-8 md:p-12 mb-16 overflow-hidden"
          >
            {/* Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full opacity-10 blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200 rounded-full opacity-10 blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
            </div>
            
            {/* Content */}
            <div className="relative">
              <div className="flex flex-col items-center text-center mb-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="mb-4"
                >
                  <FaCog className="text-5xl text-blue-600/20" />
                </motion.div>
                <h2 className="text-4xl font-bold gradient-text font-poppins mb-4">
                  AI-Powered Skill Recommender
                </h2>
                <p className="text-xl text-gray-700 font-inter max-w-2xl">
                  Describe your interests, and our AI will recommend and generate personalized skills for you!
                </p>
              </div>

              {!user ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm flex flex-col items-center justify-center z-10 rounded-3xl"
                >
                  <div className="text-center p-8 max-w-lg">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                      className="bg-white/10 p-4 rounded-full inline-block mb-6"
                    >
                      <FaLock className="text-white text-4xl" />
                    </motion.div>
                    <h3 className="text-white text-2xl font-bold mb-4">
                      Unlock AI-Powered Learning
                    </h3>
                    <p className="text-white/90 mb-8 text-lg">
                      Sign in to get personalized skill recommendations tailored just for you.
                    </p>
                    <div className="flex gap-4 justify-center">
                      <Link href="/login">
                        <motion.div
                          className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold transition duration-300 hover:shadow-lg group"
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaSignInAlt className="mr-2" />
                          Sign In
                        </motion.div>
                      </Link>
                      <Link href="/register">
                        <motion.div
                          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold transition duration-300 hover:shadow-lg group"
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaUserPlus className="mr-2" />
                          Register
                        </motion.div>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ) : null}
              
              <div className="relative max-w-3xl mx-auto">
                <div className="relative">
                  <textarea
                    ref={interestsInputRef}
                    className="w-full p-6 border-2 border-blue-100 rounded-2xl font-inter bg-white shadow-lg focus:ring-4 focus:ring-blue-200 focus:border-blue-300 transition-all duration-300 text-lg"
                    rows="3"
                    placeholder="E.g., I'm interested in creating websites, working with data, and solving complex problems..."
                    value={interests}
                    onChange={(e) => setInterests(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={!user}
                  />
                  <div className="absolute right-4 top-4 text-blue-300">
                    <FaRocket className="text-2xl" />
                  </div>
                </div>
                
                <motion.button
                  className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-2xl font-semibold text-lg transition duration-300 flex items-center justify-center group hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleRecommendation}
                  disabled={isRecommending || !user}
                  whileHover={{ scale: user ? 1.02 : 1 }}
                  whileTap={{ scale: user ? 0.98 : 1 }}
                >
                  {isRecommending ? (
                    <>
                      <FaRocket className="animate-spin mr-3 text-xl" />
                      Generating Recommendations...
                    </>
                  ) : (
                    <>
                      <FaRocket className="mr-3 text-xl transform group-hover:rotate-12 transition-transform duration-300" />
                      Get AI-Generated Skills
                    </>
                  )}
                </motion.button>
              </div>

              <AnimatePresence>
                {recommendationError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-6 p-4 bg-red-50 text-red-600 rounded-xl max-w-3xl mx-auto text-center"
                  >
                    {recommendationError}
                  </motion.div>
                )}
                {generationSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-6 p-4 bg-green-50 text-green-600 rounded-xl max-w-3xl mx-auto text-center font-semibold"
                  >
                    Skills generated successfully! Scroll down to see your personalized recommendations.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Evidence-Based Learning Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-16 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl shadow-xl p-8 md:p-12 overflow-hidden"
          >
            <div className="relative">
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full opacity-10 blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200 rounded-full opacity-10 blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
              </div>

              <div className="relative text-center mb-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  className="inline-block p-4 bg-white rounded-2xl shadow-xl mb-6 glow"
                >
                  <FaBrain className="text-4xl text-blue-600" />
                </motion.div>
                <h2 className="text-4xl font-bold gradient-text font-poppins mb-4">
                  Evidence-Based Learning
                </h2>
                <p className="text-xl text-gray-700 font-inter max-w-2xl mx-auto">
                  Our platform integrates proven learning techniques to maximize your skill development
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-blue-50 rounded-xl">
                      <FaClock className="text-2xl text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">Spaced Repetition</h3>
                  </div>
                  <p className="text-gray-600">
                    Review material at scientifically optimized intervals to enhance long-term retention
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-green-50 rounded-xl">
                      <FaLightbulb className="text-2xl text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">Active Recall</h3>
                  </div>
                  <p className="text-gray-600">
                    Strengthen your understanding through self-explanation and interactive quizzes
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-purple-50 rounded-xl">
                      <FaChartLine className="text-2xl text-purple-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">Progress Tracking</h3>
                  </div>
                  <p className="text-gray-600">
                    Monitor your learning journey with detailed analytics and comprehension scores
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          >
            <FeatureCard
              icon={<FaBrain />}
              title="AI-Powered Learning"
              description="Harness the power of AI to get personalized skill recommendations and learning paths."
              color="blue"
            />
            <FeatureCard
              icon={<FaLightbulb />}
              title="Adaptive Content"
              description="Experience dynamically generated lessons tailored to your learning style and pace."
              color="yellow"
            />
            <FeatureCard
              icon={<FaUsers />}
              title="Community-Driven"
              description="Connect with peers, share projects, and learn collaboratively in our vibrant community."
              color="green"
            />
          </motion.div>

          {/* Recommended Skills Section */}
          <AnimatePresence>
            {user && recommendedSkills.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-16"
            >
                <h2 className="text-3xl font-bold mb-8 text-center gradient-text font-poppins flex items-center justify-center">
                  <FaChartLine className="mr-4" />
                Recommended Skills for You
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedSkills.map((skill, index) => (
                  <RecommendedSkillCard 
                    key={skill.id} 
                    skill={skill} 
                    index={index}
                    onStartLearning={() => handleStartLearning(skill)}
                  />
                ))}
              </div>
            </motion.div>
          )}
          </AnimatePresence>

          {/* Testimonials Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mb-16 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl shadow-xl p-8 md:p-12 overflow-hidden"
          >
            <div className="relative">
              <h2 className="text-3xl font-bold mb-8 text-center gradient-text font-poppins flex items-center justify-center">
                <FaUsers className="mr-4" />
              What Our Learners Say
            </h2>
            <TestimonialCarousel />
            </div>
          </motion.div>

          {/* CTA Section - Only show for non-logged in users */}
          {!user && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
              className="text-center bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl shadow-xl p-12 text-white relative overflow-hidden"
            >
              {/* Decorative Elements */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full opacity-5 blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full opacity-5 blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
              </div>

              <div className="relative">
                <h2 className="text-3xl font-bold mb-6 font-poppins">Start Your Learning Journey Today</h2>
                <div className="flex flex-wrap gap-6 justify-center">
                  <Link href="/login">
                    <motion.div
                      className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-xl text-xl font-semibold transition duration-300 hover:shadow-lg group"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaSignInAlt className="mr-3" />
                      Sign In
                    </motion.div>
                  </Link>
                  <Link href="/register">
                    <motion.div
                      className="inline-flex items-center px-8 py-4 bg-blue-500 text-white rounded-xl text-xl font-semibold transition duration-300 hover:shadow-lg group border-2 border-white/20"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaUserPlus className="mr-3" />
                      Register Now
                      <FaArrowRight className="ml-3 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </motion.div>
            </Link>
                </div>
              </div>
          </motion.div>
          )}
        </main>
      </div>
    </>
  )
}

function FeatureCard({ icon, title, description, color }) {
  const colors = {
    blue: "from-blue-500/10 to-blue-600/5 hover:from-blue-500/20 hover:to-blue-600/10 [&_svg]:text-blue-500",
    yellow: "from-yellow-500/10 to-yellow-600/5 hover:from-yellow-500/20 hover:to-yellow-600/10 [&_svg]:text-yellow-500",
    green: "from-green-500/10 to-green-600/5 hover:from-green-500/20 hover:to-green-600/10 [&_svg]:text-green-500"
  }

  return (
    <motion.div
      className={`relative bg-gradient-to-br ${colors[color]} rounded-2xl p-8 transition-all duration-300 group overflow-hidden`}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="absolute inset-0 bg-white opacity-80 -z-10"></div>
      <motion.div 
        className="text-4xl mb-6 transition-transform duration-300 group-hover:scale-110"
        whileHover={{ rotate: 5 }}
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-semibold mb-3 font-poppins gradient-text">{title}</h3>
      <p className="text-gray-600 font-inter">{description}</p>
    </motion.div>
  )
}

function RecommendedSkillCard({ skill, index, onStartLearning }) {
  return (
    <motion.div
      className="relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl overflow-hidden group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <div className="absolute inset-0 bg-white opacity-90 -z-10"></div>
      <div className="relative p-6">
        <h3 className="text-xl font-semibold mb-3 font-poppins gradient-text">{skill.title}</h3>
        <p className="text-gray-600 mb-4 font-inter">{skill.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-500/10 to-indigo-500/10 text-blue-600">
            {skill.difficulty}
          </span>
          <motion.button
            onClick={() => onStartLearning(skill)}
            className="flex items-center text-blue-600 font-semibold group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Learning
            <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}