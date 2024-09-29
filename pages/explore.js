import Head from 'next/head'
import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../hooks/useAuth'
import TrendingTopics from '../components/explore/TrendingTopics'
import CommunityProjects from '../components/explore/CommunityProjects'
import AIInsights from '../components/explore/AIInsights'
import { FaRocket, FaBrain, FaUsers, FaRobot, FaLightbulb } from 'react-icons/fa'
import axios from 'axios'

export default function Explore() {
  const { user } = useAuth()
  const [aiCompanionChat, setAiCompanionChat] = useState([])
  const [userInput, setUserInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const chatContainerRef = useRef(null)

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [aiCompanionChat])

  const handleAICompanionChat = async () => {
    if (!userInput.trim() || !user) return

    setIsLoading(true)
    const newMessage = { role: 'user', content: userInput }
    setAiCompanionChat(prev => [...prev, newMessage])
    setUserInput('')

    try {
      const response = await axios.post('/api/ai-companion', {
        messages: [...aiCompanionChat, newMessage],
        userId: user.uid
      })
      
      setAiCompanionChat(prev => [...prev, { role: 'assistant', content: response.data.reply }])
    } catch (error) {
      console.error('Error in AI Companion chat:', error)
      setAiCompanionChat(prev => [...prev, { role: 'assistant', content: "I'm sorry, I'm having trouble responding right now." }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleAICompanionChat()
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Explore AI Learning - SkillBoost</title>
        <meta name="description" content="Explore AI-powered learning paths and interact with your AI Learning Companion" />
      </Head>

      <motion.h1 
        className="text-4xl font-bold mb-8 text-center text-blue-600"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FaRocket className="inline-block mr-2 mb-1" />
        Explore AI-Powered Learning
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <FaBrain className="mr-2 text-purple-500" />
            AI Learning Companion
          </h2>
          <div ref={chatContainerRef} className="bg-white rounded-lg shadow-md p-4 mb-4 h-96 overflow-y-auto">
            {aiCompanionChat.map((message, index) => (
              <div key={index} className={`mb-2 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block p-2 rounded-lg ${message.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                  {message.content}
                </span>
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask your AI Learning Companion..."
              className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              onClick={handleAICompanionChat}
              disabled={isLoading}
              className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition duration-300"
            >
              {isLoading ? 'Thinking...' : 'Ask'}
            </button>
          </div>
        </motion.div>
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div>
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <FaLightbulb className="mr-2 text-yellow-500" />
              Trending Topics
            </h2>
            <TrendingTopics />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <FaUsers className="mr-2 text-green-500" />
              Community Projects
            </h2>
            <CommunityProjects />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <FaRobot className="mr-2 text-blue-500" />
              AI Insights
            </h2>
            <AIInsights />
          </div>
        </motion.div>
      </div>
    </div>
  )
}