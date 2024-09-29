import Head from 'next/head'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useSkills } from '../hooks/useSkills'
import SkillCard from '../components/cards/SkillCard'
import TrendingTopics from '../components/explore/TrendingTopics'
import CommunityProjects from '../components/explore/CommunityProjects'
import AIInsights from '../components/explore/AIInsights'

export default function Explore() {
  const { skills, isLoading, isError } = useSkills()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredSkills = skills?.filter(skill => 
    skill.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Explore - SkillBoost</title>
        <meta name="description" content="Explore new skills and trending topics on SkillBoost" />
      </Head>

      <h1 className="text-4xl font-bold mb-8 text-center">Explore SkillBoost</h1>

      <div className="mb-8">
        <input
          type="text"
          placeholder="Search skills..."
          className="w-full p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Available Skills</h2>
          {isLoading && <p>Loading skills...</p>}
          {isError && <p>Error loading skills</p>}
          {filteredSkills && (
            <motion.div 
              className="grid grid-cols-1 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, staggerChildren: 0.1 }}
            >
              {filteredSkills.map((skill) => (
                <SkillCard key={skill.id} {...skill} />
              ))}
            </motion.div>
          )}
        </div>
        <div>
          <TrendingTopics />
          <CommunityProjects />
          <AIInsights />
        </div>
      </div>
    </div>
  )
}
