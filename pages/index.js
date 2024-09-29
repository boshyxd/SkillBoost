import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../hooks/useAuth'
import { motion } from 'framer-motion'
import axios from 'axios'
import TestimonialCarousel from '../components/TestimonialCarousel'
import { v4 as uuidv4 } from 'uuid'
import { useUserSkills } from '../hooks/useUserSkills'
import LoadingAnimation from '../components/LoadingAnimation'
import { FaRocket, FaBrain, FaLightbulb, FaUsers, FaChartLine, FaCog } from 'react-icons/fa'

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

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    }
  }, [user, authLoading, router])

  const handleRecommendation = async () => {
    if (!interests.trim()) return

    setIsRecommending(true)
    setRecommendationError(null)
    setGenerationSuccess(false)
    try {
      const response = await axios.post('/api/recommend-skills', { 
        interests,
        userId: user.uid
      })
      if (response.data.recommendations && response.data.recommendations.length > 0) {
        const recommendationsWithIds = response.data.recommendations.map(skill => ({
          ...skill,
          id: skill.id || uuidv4(),
        }))
        setRecommendedSkills(recommendationsWithIds)
        // Store each recommended skill in Firebase
        for (const skill of recommendationsWithIds) {
          await addUserSkill(skill)
        }
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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleRecommendation()
    }
  }

  if (authLoading) {
    return <LoadingAnimation />
  }

  if (!user) {
    return null // This will prevent any flickering while redirecting
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Head>
        <title>SkillBoost - Elevate Your Learning Journey</title>
        <meta name="description" content="AI-powered personalized skill development platform" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Inter:wght@400;500&display=swap" rel="stylesheet" />
      </Head>

      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold mb-4 text-blue-900 font-poppins">
            <FaRocket className="inline-block mr-4 mb-2" />
            SkillBoost
          </h1>
          <p className="text-2xl text-gray-700 font-inter">
            Elevate Your Learning Journey with AI-Powered Personalization
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          <FeatureCard
            icon={<FaBrain className="text-4xl text-blue-500" />}
            title="AI-Powered Learning"
            description="Harness the power of AI to get personalized skill recommendations and learning paths."
          />
          <FeatureCard
            icon={<FaLightbulb className="text-4xl text-yellow-500" />}
            title="Adaptive Content"
            description="Experience dynamically generated lessons tailored to your learning style and pace."
          />
          <FeatureCard
            icon={<FaUsers className="text-4xl text-green-500" />}
            title="Community-Driven"
            description="Connect with peers, share projects, and learn collaboratively in our vibrant community."
          />
        </motion.div>

        {user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-lg shadow-xl p-8 mb-16"
          >
            <h2 className="text-3xl font-bold text-blue-900 mb-6 font-poppins flex items-center">
              <FaCog className="mr-4 text-blue-500" />
              AI-Powered Skill Recommender
            </h2>
            <p className="text-gray-700 mb-4 font-inter">Describe your interests, and our AI will recommend and generate personalized skills for you!</p>
            <textarea
              ref={interestsInputRef}
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 font-inter"
              rows="3"
              placeholder="E.g., I'm interested in creating websites, working with data, and solving complex problems..."
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              onKeyPress={handleKeyPress}
            ></textarea>
            <button
              className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300 flex items-center justify-center"
              onClick={handleRecommendation}
              disabled={isRecommending}
            >
              {isRecommending ? (
                <>
                  <FaRocket className="animate-spin mr-2" />
                  Generating Recommendations...
                </>
              ) : (
                <>
                  <FaRocket className="mr-2" />
                  Get AI-Generated Skills
                </>
              )}
            </button>
            {recommendationError && (
              <p className="text-red-500 mt-4">{recommendationError}</p>
            )}
            {generationSuccess && (
              <p className="text-green-500 mt-4 font-semibold">Skills generated successfully! Scroll down to see your personalized recommendations.</p>
            )}
          </motion.div>
        )}

        {recommendedSkills.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold mb-8 text-center text-blue-900 font-poppins flex items-center justify-center">
              <FaChartLine className="mr-4 text-blue-500" />
              Your Personalized Skill Path
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedSkills.map((skill, index) => (
                <RecommendedSkillCard key={skill.id} skill={skill} index={index} />
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-blue-900 font-poppins flex items-center justify-center">
            <FaUsers className="mr-4 text-green-500" />
            What Our Learners Say
          </h2>
          <TestimonialCarousel />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-8 text-blue-900 font-poppins">Start Your Learning Journey Today</h2>
          <Link href="/register" className="bg-blue-600 text-white px-8 py-4 rounded-full text-xl font-semibold hover:bg-blue-700 transition duration-300 inline-flex items-center">
            <FaRocket className="mr-2" />
            Join SkillBoost Now
          </Link>
        </motion.div>
      </main>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 font-poppins">{title}</h3>
      <p className="text-gray-600 font-inter">{description}</p>
    </div>
  )
}

function RecommendedSkillCard({ skill, index }) {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-md p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index }}
    >
      <h3 className="text-xl font-semibold mb-2 font-poppins">{skill.skill}</h3>
      <div className="flex items-center mb-3">
        <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
          <div 
            className="bg-blue-600 h-2.5 rounded-full" 
            style={{ width: `${skill.matchPercentage}%` }}
          ></div>
        </div>
        <span className="text-sm font-medium text-gray-500">{skill.matchPercentage}%</span>
      </div>
      <p className="text-gray-600 mb-4 font-inter">{skill.explanation}</p>
      <Link 
        href={{
          pathname: `/skills/${skill.id}`,
          query: { title: skill.skill, description: skill.explanation }
        }} 
        className="inline-flex items-center bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
      >
        <FaRocket className="mr-2" />
        Explore Skill
      </Link>
    </motion.div>
  )
}