import { motion } from 'framer-motion'
import Link from 'next/link'

export default function SkillMap({ skills }) {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {skills.map((skill, index) => (
        <motion.div
          key={skill.id}
          className={`bg-white rounded-lg shadow-md p-6 w-64 ${skill.available ? 'border-2 border-green-500' : ''}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
        >
          <h3 className="text-xl font-semibold mb-2 font-poppins">{skill.title}</h3>
          <p className="text-sm text-gray-600 mb-4 font-inter">{skill.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-green-500 font-semibold">{skill.matchPercentage}% Match</span>
            {skill.available && (
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                Available
              </span>
            )}
          </div>
          {skill.available && (
            <Link 
              href={`/skills/${skill.id}`}
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 transition duration-300 text-center block"
            >
              Learn More
            </Link>
          )}
        </motion.div>
      ))}
    </div>
  )
}