import { useState } from 'react'
import { useRouter } from 'next/router'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../lib/firebase'
import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaEnvelope, FaLock, FaRocket } from 'react-icons/fa'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      router.push('/')
    } catch (error) {
      console.error('Registration error:', error)
      setError(
        error.code === 'auth/email-already-in-use' ? 'An account with this email already exists' :
        error.code === 'auth/invalid-email' ? 'Invalid email address' :
        error.code === 'auth/weak-password' ? 'Password should be at least 6 characters' :
        'An error occurred during registration. Please try again.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Register - SkillBoost</title>
        <meta name="description" content="Create your SkillBoost account to start your learning journey" />
        <style>{`
          html, body {
            height: 100%;
            margin: 0;
            background: linear-gradient(to bottom right, rgb(239 246 255), rgb(238 242 255));
          }
        `}</style>
      </Head>

      <div className="min-h-screen w-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg"
        >
          <div>
            <motion.div 
              className="flex justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <FaRocket className="text-5xl text-blue-600" />
            </motion.div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Create Your Account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Start your learning journey with{' '}
              <span className="font-semibold text-blue-600">SkillBoost</span>
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 text-red-500 p-4 rounded-lg text-sm text-center"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                  />
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white ${
                  isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200`}
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  'Sign up'
                )}
              </button>
            </div>

            <div className="flex items-center justify-center">
              <div className="text-sm">
                <span className="text-gray-500">Already have an account?</span>{' '}
                <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200">
                  Sign in
                </Link>
              </div>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Join thousands of learners
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  )
}