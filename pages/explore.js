import Head from 'next/head'
import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../hooks/useAuth'
import { useRouter } from 'next/router'
import TrendingTopics from '../components/explore/TrendingTopics'
import CommunityProjects from '../components/explore/CommunityProjects'
import AIInsights from '../components/explore/AIInsights'
import { FaRocket, FaBrain, FaUsers, FaRobot, FaLightbulb, FaPaperPlane, FaSpinner, FaUser } from 'react-icons/fa'
import axios from 'axios'
import { getApiUrl } from '../utils/path'
import LoadingAnimation from '../components/LoadingAnimation'
import ReactMarkdown from 'react-markdown'

export default function Explore() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [aiCompanionChat, setAiCompanionChat] = useState([])
  const [userInput, setUserInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const chatContainerRef = useRef(null)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [aiCompanionChat])

  const handleAICompanionChat = async () => {
    if (!userInput.trim() || !user) return

    setIsLoading(true)
    const newMessage = { role: 'user', content: userInput }
    setAiCompanionChat(prev => [...prev, newMessage, { role: 'assistant', content: 'Thinking...', isThinking: true }])
    setUserInput('')

    try {
      const response = await axios.post(getApiUrl('/ai-companion'), {
        messages: [...aiCompanionChat, newMessage],
        userId: user.uid
      })
      
      setAiCompanionChat(prev => [...prev.slice(0, -1), { role: 'assistant', content: response.data.reply }])
    } catch (error) {
      console.error('Error in AI Companion chat:', error)
      setAiCompanionChat(prev => [...prev.slice(0, -1), { role: 'assistant', content: "I'm sorry, I'm having trouble responding right now." }])
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

  if (authLoading) {
    return <LoadingAnimation />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <Head>
          <title>AI Skill Advisor - SkillBoost</title>
          <meta name="description" content="Get personalized learning recommendations and guidance from your AI Skill Advisor" />
        </Head>

        <div className="max-w-4xl mx-auto mb-16">
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-4 font-poppins">
              <span className="gradient-text">Your AI Skill Advisor</span>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Get personalized learning recommendations, explore new skills, and create your custom learning path with AI-powered guidance.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="border-b border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500 p-2 rounded-xl">
                    <FaBrain className="text-white text-xl" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold font-poppins">AI Skill Advisor</h2>
                    <p className="text-sm text-gray-500">Online • Ready to help</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <FaRobot className="text-blue-400" />
                  <span>Powered by AI</span>
                </div>
              </div>
            </div>
            
            <div 
              ref={chatContainerRef} 
              className="p-6 h-[500px] overflow-y-auto bg-gradient-to-br from-gray-50 to-blue-50/30"
            >
              {aiCompanionChat.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-6">
                  <div className="bg-blue-100 p-4 rounded-full">
                    <FaRobot className="text-5xl text-blue-500" />
                  </div>
                  <div className="text-center max-w-md">
                    <h3 className="text-xl font-semibold mb-2 text-gray-700">Welcome to Your AI Skill Advisor!</h3>
                    <p className="text-gray-600">
                      Ask me anything about learning paths, skill development, or career guidance. I'm here to help you succeed!
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2 mt-4">
                    {["What skills should I learn?", "Create a learning path", "Recommend resources"].map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => setUserInput(suggestion)}
                        className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-full text-sm transition-colors duration-200"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                aiCompanionChat.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`mb-6 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.role === 'assistant' && (
                      <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                        <FaRobot className="text-blue-500 text-sm" />
                      </div>
                    )}
                    <div 
                      className={`max-w-[80%] p-4 rounded-2xl ${
                        message.role === 'user' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-white text-gray-700'
                      } shadow-md`}
                    >
                      <div className={`prose prose-sm max-w-none ${message.role === 'user' ? 'text-white prose-headings:text-white prose-strong:text-white' : ''}`}>
                        {message.isThinking ? (
                          <div className="flex items-center gap-2">
                            <span>Thinking</span>
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ repeat: Infinity, duration: 1.5 }}
                            >
                              ...
                            </motion.span>
                          </div>
                        ) : (
                          <ReactMarkdown
                            components={{
                              // Style headings
                              h1: ({node, ...props}) => <h1 className="text-xl font-bold mb-2" {...props} />,
                              h2: ({node, ...props}) => <h2 className="text-lg font-bold mb-2" {...props} />,
                              h3: ({node, ...props}) => <h3 className="text-md font-bold mb-2" {...props} />,
                              // Style links
                              a: ({node, ...props}) => <a className="text-blue-300 hover:underline" {...props} />,
                              // Style lists
                              ul: ({node, ...props}) => <ul className="list-disc ml-4 mb-2 space-y-1" {...props} />,
                              ol: ({node, ...props}) => <ol className="list-decimal ml-4 mb-2 space-y-1" {...props} />,
                              li: ({node, children, ...props}) => <li className="pl-1" {...props}>{children}</li>,
                              // Style paragraphs
                              p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                              // Style code blocks
                              code: ({node, ...props}) => <code className="bg-gray-800/10 rounded px-1" {...props} />,
                              // Style emphasis
                              em: ({node, ...props}) => <em className="italic" {...props} />,
                              // Style strong text
                              strong: ({node, ...props}) => <strong className="font-bold" {...props} />
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>
                        )}
                      </div>
                    </div>
                    {message.role === 'user' && (
                      <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center ml-3">
                        <FaUser className="text-white text-sm" />
                      </div>
                    )}
                  </motion.div>
                ))
              )}
            </div>

            <div className="border-t border-gray-100 p-4 bg-white">
              <div className="flex gap-4">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about skills, learning paths, or career guidance..."
                  className="flex-grow p-4 border-2 border-blue-100 rounded-xl font-inter bg-white/50 shadow-sm focus:ring-4 focus:ring-blue-100 focus:border-blue-300 transition-all duration-300"
                />
                <motion.button
                  onClick={handleAICompanionChat}
                  disabled={isLoading || !userInput.trim()}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 rounded-xl font-semibold transition duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    <>
                      <FaPaperPlane className="mr-2" />
                      Send
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center font-poppins">
            <span className="gradient-text">Explore More</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {/* Trending Topics */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6">
              <h3 className="text-xl font-semibold mb-6 font-poppins flex items-center">
                <FaLightbulb className="mr-3 text-yellow-500" />
                <span className="gradient-text">Trending Topics</span>
              </h3>
              <TrendingTopics />
            </div>

            {/* Community Projects */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6">
              <h3 className="text-xl font-semibold mb-6 font-poppins flex items-center">
                <FaUsers className="mr-3 text-green-500" />
                <span className="gradient-text">Community Projects</span>
              </h3>
              <CommunityProjects />
            </div>

            {/* AI Insights */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6">
              <h3 className="text-xl font-semibold mb-6 font-poppins flex items-center">
                <FaRobot className="mr-3 text-blue-500" />
                <span className="gradient-text">AI Insights</span>
              </h3>
              <AIInsights />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}