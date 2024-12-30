import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '../../hooks/useAuth'
import AuthNav from './AuthNav'
import { FaHome, FaSearch, FaChartBar, FaUser, FaBook } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { href: '/', label: 'Home', icon: FaHome },
  { href: '/explore', label: 'Explore', icon: FaSearch },
  { href: '/create-lesson', label: 'Create', icon: FaBook },
  { href: '/progress', label: 'Progress', icon: FaChartBar },
  { href: '/profile', label: 'Profile', icon: FaUser },
]

export default function BottomNav() {
  const router = useRouter()
  const { user } = useAuth()

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center items-center pb-6 pt-2 pointer-events-none z-50">
      <motion.nav 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="w-[90%] max-w-md mx-auto pointer-events-auto"
      >
        {/* Main Container with Glow */}
        <div className="relative">
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 via-indigo-500/30 to-purple-500/30 rounded-[20px] blur-lg group-hover:blur-xl transition-all duration-300" />
          
          {/* Glass Background */}
          <div className="relative bg-white/90 backdrop-blur-xl border border-white/20 shadow-2xl rounded-[20px] p-2">
            <ul className="flex justify-between items-center gap-1">
              <AnimatePresence mode="wait">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = router.pathname === item.href
                  return (
                    <motion.li 
                      key={item.href}
                      className="flex-1"
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link 
                        href={item.href} 
                        className="relative flex flex-col items-center py-2"
                      >
                        <div className={`relative p-2 rounded-2xl transition-all duration-300 ${
                          isActive 
                            ? 'bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30 scale-110' 
                            : 'hover:bg-blue-50 hover:scale-105'
                        }`}>
                          <Icon className={`text-xl transition-all duration-300 ${
                            isActive ? 'text-white' : 'text-gray-500'
                          }`} />
                          
                          {/* Ripple effect for active state */}
                          {isActive && (
                            <motion.div
                              layoutId="ripple"
                              className="absolute inset-0 rounded-2xl bg-white/20"
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 1.2, opacity: 0 }}
                              transition={{ duration: 0.5 }}
                            />
                          )}
                        </div>

                        {/* Label with floating animation */}
                        <motion.span 
                          className={`text-[11px] font-medium mt-1.5 transition-all duration-300 ${
                            isActive 
                              ? 'text-blue-600 font-semibold' 
                              : 'text-gray-500'
                          }`}
                          animate={isActive ? {
                            scale: [1, 1.1, 1],
                            y: [0, -2, 0],
                          } : {}}
                          transition={{ duration: 0.3 }}
                        >
                          {item.label}
                        </motion.span>

                        {/* Active indicator dot */}
                        {isActive && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="absolute -bottom-0.5 left-1/2 w-1 h-1 bg-blue-600 rounded-full transform -translate-x-1/2"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                      </Link>
                    </motion.li>
                  )
                })}
                
                {/* Auth Navigation */}
                <motion.li
                  className="flex-1"
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <AuthNav />
                </motion.li>
              </AnimatePresence>
            </ul>
          </div>
        </div>
      </motion.nav>
    </div>
  )
}
