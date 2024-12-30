import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaStar, FaGithub, FaArrowRight } from 'react-icons/fa'

export default function CommunityProjects() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    // In a real app, fetch this data from an API
    setProjects([
      { id: 1, title: "Open Source AI Assistant", author: "AI_Enthusiast", stars: 1200, tags: ["AI", "Python"] },
      { id: 2, title: "Eco-Friendly Smart Home System", author: "GreenTech", stars: 980, tags: ["IoT", "Sustainability"] },
      { id: 3, title: "Decentralized Social Media Platform", author: "BlockchainDev", stars: 850, tags: ["Blockchain", "Web3"] },
      { id: 4, title: "AR-based Language Learning App", author: "PolyglotCoder", stars: 720, tags: ["AR", "Education"] },
      { id: 5, title: "AI-powered Music Composer", author: "MelodyMaker", stars: 650, tags: ["AI", "Music"] },
    ])
  }, [])

  return (
    <div className="space-y-4">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-gradient-to-br from-blue-50/50 to-indigo-50/50 rounded-xl p-4 hover:shadow-md transition-all duration-300 group cursor-pointer"
        >
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="font-semibold text-gray-800 font-inter group-hover:text-blue-600 transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-sm text-gray-600">by {project.author}</p>
            </div>
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="text-blue-500"
            >
              <FaArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          </div>
          
          <div className="flex items-center justify-between mt-3">
            <div className="flex gap-2">
              {project.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-600 font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-1 text-yellow-500">
              <FaStar />
              <span className="text-sm font-medium">{project.stars}</span>
            </div>
          </div>
        </motion.div>
      ))}
      
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-4 flex items-center justify-center gap-2 text-blue-600 font-semibold py-2 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors duration-300"
      >
        <FaGithub className="text-xl" />
        View All Projects
      </motion.button>
    </div>
  )
}