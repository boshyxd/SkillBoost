import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useSkills } from '../hooks/useSkills'
import { motion } from 'framer-motion'
import axios from 'axios'
import SkillMap from '../components/SkillMap'
import TestimonialCarousel from '../components/TestimonialCarousel'
import { v4 as uuidv4 } from 'uuid'; // Add this import
import { useUserSkills } from '../hooks/useUserSkills';

export default function Home() {
  const { user, loading } = useAuth()
  const { skills, isLoading: skillsLoading } = useSkills()
  const [interests, setInterests] = useState('')
  const [recommendedSkills, setRecommendedSkills] = useState([])
  const [isRecommending, setIsRecommending] = useState(false)
  const [randomSkills, setRandomSkills] = useState([])
  const [recommendationError, setRecommendationError] = useState(null)
  const [generationSuccess, setGenerationSuccess] = useState(false)
  const { userSkills, loading: userSkillsLoading, addUserSkill } = useUserSkills();

  useEffect(() => {
    if (skills && skills.length > 0) {
      const shuffled = [...skills].sort(() => 0.5 - Math.random())
      setRandomSkills(shuffled.slice(0, 2))
    }
  }, [skills])

  const handleRecommendation = async () => {
    setIsRecommending(true);
    setRecommendationError(null);
    setGenerationSuccess(false);
    try {
      const response = await axios.post('/api/recommend-skills', { interests });
      if (response.data.recommendations && response.data.recommendations.length > 0) {
        const recommendationsWithIds = response.data.recommendations.map(skill => ({
          ...skill,
          id: skill.id || uuidv4(), // Use the ID from the API or generate a new one if it doesn't exist
        }));
        setRecommendedSkills(recommendationsWithIds);
        // Store each recommended skill in Firebase
        for (const skill of recommendationsWithIds) {
          await addUserSkill(skill);
        }
        setGenerationSuccess(true);
      } else {
        setRecommendationError('Not enough information provided to generate skill recommendations. Please provide more detailed interests.');
      }
    } catch (error) {
      console.error('Error getting recommendations:', error);
      setRecommendationError(error.response?.data?.message || 'An error occurred while generating recommendations. Please try again.');
    } finally {
      setIsRecommending(false);
    }
  };

  if (loading || skillsLoading) return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Head>
        <title>SkillBoost - Elevate Your Learning Journey</title>
        <meta name="description" content="Personalized skill development platform" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Inter:wght@400;500&display=swap" rel="stylesheet" />
      </Head>

      <main className="container mx-auto px-4 py-12">
        <motion.h1 
          className="text-5xl font-bold mb-8 text-center text-blue-900 font-poppins"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Welcome to SkillBoost
        </motion.h1>
        
        <motion.p 
          className="text-xl text-center text-gray-700 mb-12 font-inter"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Discover, Learn, and Master New Skills Tailored to Your Interests
        </motion.p>

        {!user && (
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Link href="/login" className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold mr-4 hover:bg-blue-700 transition duration-300">
              Get Started
            </Link>
            <Link href="/explore" className="bg-teal-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-teal-600 transition duration-300">
              Explore Skills
            </Link>
          </motion.div>
        )}

        {user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-xl p-8 mb-16"
          >
            <h2 className="text-3xl font-bold text-blue-900 mb-6 font-poppins">AI-Powered Skill Recommender</h2>
            <p className="text-gray-700 mb-4 font-inter">Describe your interests, and our AI will recommend and generate personalized skills for you!</p>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 font-inter"
              rows="3"
              placeholder="E.g., I'm interested in creating websites, working with data, and solving complex problems..."
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
            ></textarea>
            <button
              className="bg-amber-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-amber-600 transition duration-300"
              onClick={handleRecommendation}
              disabled={isRecommending}
            >
              {isRecommending ? 'Generating Recommendations...' : 'Get AI-Generated Skills'}
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
            <h2 className="text-3xl font-bold mb-8 text-center text-blue-900 font-poppins">Your Personalized Skill Path</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedSkills.map((skill, index) => (
                <motion.div
                  key={skill.id} // Use skill.id as the key
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
                    className="inline-block bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
                  >
                    Explore Skill
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-blue-900 font-poppins">Featured Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {randomSkills.map((skill) => (
              <div key={skill.id} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-2 font-poppins">{skill.title}</h3>
                <p className="text-gray-600 mb-4 font-inter">{skill.description}</p>
                <Link 
                  href={`/skills/${skill.id}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
                >
                  Learn More
                </Link>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-blue-900 font-poppins">What Our Learners Say</h2>
          <TestimonialCarousel />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-8 text-blue-900 font-poppins">Start Your Learning Journey Today</h2>
          <Link href="/register" className="bg-blue-600 text-white px-8 py-4 rounded-full text-xl font-semibold hover:bg-blue-700 transition duration-300">
            Join SkillBoost Now
          </Link>
        </motion.div>
      </main>
    </div>
  )
}