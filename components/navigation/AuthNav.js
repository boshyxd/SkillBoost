import Link from 'next/link'
import { useAuth } from '../../hooks/useAuth'
import { auth } from '../../lib/firebase'
import { signOut } from 'firebase/auth'
import { useRouter } from 'next/router'
import { FaSignOutAlt, FaSignInAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function AuthNav() {
  const { user } = useAuth()
  const router = useRouter()
  const isLoginPage = router.pathname === '/login'

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  if (user) {
    return (
      <motion.button
        onClick={handleLogout}
        className="relative flex flex-col items-center py-2 w-full"
      >
        <div className="relative p-2 rounded-2xl transition-all duration-300 hover:bg-blue-50 hover:scale-105">
          <FaSignOutAlt className="text-xl text-gray-500 transition-all duration-300" />
        </div>
        <motion.span 
          className="text-[11px] font-medium mt-1.5 text-gray-500"
          whileHover={{ scale: 1.1, y: -2 }}
          transition={{ duration: 0.3 }}
        >
          Logout
        </motion.span>
      </motion.button>
    )
  }

  return (
    <Link 
      href="/login" 
      className="relative flex flex-col items-center py-2 w-full"
    >
      <div className={`relative p-2 rounded-2xl transition-all duration-300 ${
        isLoginPage 
          ? 'bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30 scale-110' 
          : 'hover:bg-blue-50 hover:scale-105'
      }`}>
        <FaSignInAlt className={`text-xl transition-all duration-300 ${
          isLoginPage ? 'text-white' : 'text-gray-500'
        }`} />
        
        {isLoginPage && (
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
      <motion.span 
        className={`text-[11px] font-medium mt-1.5 transition-all duration-300 ${
          isLoginPage 
            ? 'text-blue-600 font-semibold' 
            : 'text-gray-500'
        }`}
        animate={isLoginPage ? {
          scale: [1, 1.1, 1],
          y: [0, -2, 0],
        } : {}}
        transition={{ duration: 0.3 }}
      >
        Login
      </motion.span>
      {isLoginPage && (
        <motion.div
          layoutId="activeIndicator"
          className="absolute -bottom-0.5 left-1/2 w-1 h-1 bg-blue-600 rounded-full transform -translate-x-1/2"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </Link>
  )
}