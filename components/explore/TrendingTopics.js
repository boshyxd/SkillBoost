import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaArrowUp, FaArrowRight } from 'react-icons/fa'

export default function TrendingTopics() {
  const [topics, setTopics] = useState([])

  useEffect(() => {
    // In a real app, fetch this data from an API
    setTopics([
      { id: 1, title: "Artificial Intelligence in Healthcare", popularity: 95 },
      { id: 2, title: "Blockchain for Supply Chain", popularity: 88 },
      { id: 3, title: "Quantum Computing Basics", popularity: 82 },
      { id: 4, title: "Sustainable Energy Technologies", popularity: 79 },
      { id: 5, title: "Augmented Reality in Education", popularity: 75 },
    ])
  }, [])

  return (
    <div className="space-y-4">
      {topics.map((topic, index) => (
        <motion.div
          key={topic.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-gradient-to-br from-blue-50/50 to-indigo-50/50 rounded-xl p-4 hover:shadow-md transition-all duration-300 group cursor-pointer"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-800 font-inter group-hover:text-blue-600 transition-colors duration-300">
              {topic.title}
            </h3>
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="text-blue-500"
            >
              <FaArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          </div>
          <div className="flex items-center gap-2">
            <FaArrowUp className="text-green-500" />
            <div className="flex-grow bg-gray-200 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${topic.popularity}%` }}
                transition={{ duration: 1, delay: index * 0.1 }}
                className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full"
              />
            </div>
            <span className="text-sm text-blue-600 font-medium">
              {topic.popularity}%
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}