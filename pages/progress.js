import Head from 'next/head'
import Link from 'next/link'
import { useProgress } from '../hooks/useProgress'
import { useAuth } from '../hooks/useAuth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { db } from '../lib/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { motion } from 'framer-motion'
import { FaLightbulb, FaRocket, FaTrophy, FaChartLine } from 'react-icons/fa'
import LoadingSpinner from '../components/LoadingSpinner';

export default function LearningJourney() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const { progress, isLoading: progressLoading } = useProgress()
  const [userSkills, setUserSkills] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    async function fetchUserSkills() {
      if (user) {
        const q = query(collection(db, 'userSkills'), where('userId', '==', user.uid))
        const querySnapshot = await getDocs(q)
        const skills = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setUserSkills(skills)
        setIsLoading(false)
      }
    }

    fetchUserSkills()
  }, [user])

  if (authLoading || isLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return null
  }

  const totalSkills = userSkills.length
  const completedSkills = userSkills.filter(skill => skill.completed).length
  const learningStreak = calculateStreak(progress)

  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Your Learning Journey - SkillBoost</title>
        <meta name="description" content="Track your AI-powered learning journey on SkillBoost" />
      </Head>

      <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">Your AI Learning Journey</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard icon={<FaLightbulb />} title="Total Skills" value={totalSkills} />
        <StatCard icon={<FaRocket />} title="Skills in Progress" value={totalSkills - completedSkills} />
        <StatCard icon={<FaTrophy />} title="Completed Skills" value={completedSkills} />
        <StatCard icon={<FaChartLine />} title="Learning Streak" value={`${learningStreak} days`} />
      </div>

      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Your AI-Generated Skills</h2>
      {userSkills.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userSkills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} progress={progress} />
          ))}
        </div>
      ) : (
        <p className="text-center text-xl text-gray-600">You haven't generated any skills yet. Try using our AI Skill Recommender!</p>
      )}
    </div>
  )
}

function StatCard({ icon, title, value }) {
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="text-4xl text-blue-500 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-center">{title}</h3>
      <p className="text-3xl font-bold text-blue-600">{value}</p>
    </motion.div>
  )
}

function SkillCard({ skill, progress }) {
  const skillProgress = progress ? progress.filter(p => p.skillId === skill.id).length : 0
  const totalLessons = skill.lessons ? skill.lessons.length : 1
  const progressPercentage = Math.round((skillProgress / totalLessons) * 100)

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md p-6"
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <h3 className="text-xl font-semibold mb-2">{skill.skill}</h3>
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-1">{progressPercentage}% Complete</p>
      </div>
      <Link 
        href={`/skills/${skill.id}`}
        className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300 inline-block w-full text-center"
      >
        Continue Learning
      </Link>
    </motion.div>
  )
}

function calculateStreak(progress) {
  // Implement a more sophisticated streak calculation here
  return progress && progress.length > 0 ? progress.length : 0;
}
