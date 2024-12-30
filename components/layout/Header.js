import Link from 'next/link'
import { FaRocket } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useAuth } from '../../hooks/useAuth'

export default function Header() {
  const { user } = useAuth()

  return (
    <header className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white p-2 rounded-lg shadow-sm"
            >
              <FaRocket className="h-6 w-6 text-blue-600 transform transition-transform group-hover:text-blue-700" />
            </motion.div>
            <motion.span 
              className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              SkillBoost
            </motion.span>
          </Link>

          {user && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-4"
            >
              <div className="text-sm text-gray-600">
                Welcome back, <span className="font-semibold text-blue-600">{user.email}</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  )
}
