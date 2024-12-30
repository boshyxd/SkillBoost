import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaLightbulb, FaSpinner, FaSyncAlt } from 'react-icons/fa'

export default function AIInsights() {
  const [insight, setInsight] = useState('')
  const [loading, setLoading] = useState(false)

  const generateInsight = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/generate-insight', {
        method: 'POST',
      })
      const data = await response.json()
      setInsight(data.insight)
    } catch (error) {
      console.error('Error generating insight:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <motion.button
        onClick={generateInsight}
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-xl font-semibold transition duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        whileHover={{ scale: loading ? 1 : 1.02 }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
      >
        {loading ? (
          <>
            <FaSpinner className="animate-spin text-xl" />
            Generating Insight...
          </>
        ) : (
          <>
            <FaLightbulb className="text-xl" />
            Generate New Insight
          </>
        )}
      </motion.button>

      <AnimatePresence mode="wait">
        {insight && (
          <motion.div
            key={insight}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gradient-to-br from-blue-50/50 to-indigo-50/50 rounded-xl p-6 shadow-md"
          >
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-2 rounded-lg">
                <FaLightbulb className="text-blue-600 text-xl" />
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 font-inter">
                  AI-Generated Insight
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {insight}
                </p>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <motion.button
                onClick={generateInsight}
                disabled={loading}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaSyncAlt className={loading ? 'animate-spin' : ''} />
                Regenerate
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!insight && !loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-500 py-8"
        >
          <FaLightbulb className="text-4xl text-blue-200 mx-auto mb-4" />
          <p className="font-inter">
            Click the button above to generate an AI insight about learning and skill development.
          </p>
        </motion.div>
      )}
    </div>
  )
}