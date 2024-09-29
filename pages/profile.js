import Head from 'next/head'
import { useAuth } from '../hooks/useAuth'
import { useProgress } from '../hooks/useProgress'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { db } from '../lib/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { motion } from 'framer-motion'
import { FaUser, FaMedal, FaBrain, FaCalendarCheck, FaRocket } from 'react-icons/fa'
import LoadingSpinner from '../components/LoadingSpinner'

export default function Profile() {
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
        <title>Your AI Learning Profile - SkillBoost</title>
        <meta name="description" content="View your AI-powered learning profile on SkillBoost" />
      </Head>

      <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">Your AI Learning Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <UserInfoCard user={user} />
        <LearningStatsCard 
          totalSkills={totalSkills}
          completedSkills={completedSkills}
          learningStreak={learningStreak}
        />
      </div>

      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Recent AI-Generated Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userSkills.slice(0, 3).map((skill) => (
          <RecentSkillCard key={skill.id} skill={skill} />
        ))}
      </div>
    </div>
  )
}

function UserInfoCard({ user }) {
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md p-6"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-center mb-4">
        <FaUser className="text-4xl text-blue-500 mr-4" />
        <h2 className="text-2xl font-semibold">Personal Information</h2>
      </div>
      <p className="text-lg mb-2"><strong>Name:</strong> {user.displayName}</p>
      <p className="text-lg mb-2"><strong>Email:</strong> {user.email}</p>
      <p className="text-lg"><strong>Member since:</strong> {new Date(user.metadata.creationTime).toLocaleDateString()}</p>
    </motion.div>
  )
}

function LearningStatsCard({ totalSkills, completedSkills, learningStreak }) {
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md p-6"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <h2 className="text-2xl font-semibold mb-4">Learning Statistics</h2>
      <div className="grid grid-cols-2 gap-4">
        <StatItem icon={<FaBrain />} label="Total Skills" value={totalSkills} />
        <StatItem icon={<FaMedal />} label="Completed Skills" value={completedSkills} />
        <StatItem icon={<FaCalendarCheck />} label="Learning Streak" value={`${learningStreak} days`} />
        <StatItem icon={<FaRocket />} label="Skills in Progress" value={totalSkills - completedSkills} />
      </div>
    </motion.div>
  )
}

function StatItem({ icon, label, value }) {
  return (
    <div className="flex items-center">
      <div className="text-2xl text-blue-500 mr-2">{icon}</div>
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className="text-lg font-semibold">{value}</p>
      </div>
    </div>
  )
}

function RecentSkillCard({ skill }) {
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md p-6"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <h3 className="text-xl font-semibold mb-2">{skill.skill}</h3>
      <p className="text-gray-600 mb-4">{skill.explanation.substring(0, 100)}...</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-blue-500 font-semibold">{skill.matchPercentage}% Match</span>
        <motion.button 
          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Continue
        </motion.button>
      </div>
    </motion.div>
  )
}

function calculateStreak(progress) {
  // Implement a more sophisticated streak calculation here
  return progress && progress.length > 0 ? progress.length : 0;
}