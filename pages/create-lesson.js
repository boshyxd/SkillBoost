import { useState } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { FaLightbulb, FaBook, FaRocket } from 'react-icons/fa';
import axios from 'axios';

export default function CreateLesson() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { user } = useAuth();

  const handleGenerateLesson = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!user) {
        throw new Error('Please sign in to create a lesson');
      }

      if (!topic.trim()) {
        throw new Error('Please enter a topic');
      }

      console.log('Generating lesson for topic:', topic);
      const response = await axios.post('/api/generate-skill', {
        topic: topic.trim(),
        userId: user.uid,
        additionalContext: ''
      });

      console.log('Response received:', response.data);
      const { id: skillId, lessons } = response.data;
      
      // Redirect to the first lesson
      if (skillId && lessons && lessons.length > 0) {
        const firstLessonId = lessons[0].id;
        router.push(`/lessons/${skillId}/${firstLessonId}?skillTitle=${encodeURIComponent(response.data.title)}`);
      } else {
        console.error('Invalid response structure:', response.data);
        throw new Error('Invalid response structure: missing required data');
      }
    } catch (error) {
      console.error('Error details:', error.response?.data || error);
      setError(
        error.response?.data?.details || 
        error.response?.data?.error || 
        error.message || 
        'Failed to generate lesson'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Create Your Custom Lesson
            </span>
          </h1>
          <p className="text-gray-600 text-lg">
            Tell us what you want to learn, and our AI will create a personalized lesson just for you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-sm border border-gray-100"
        >
          <form onSubmit={handleGenerateLesson} className="space-y-6">
            <div>
              <label htmlFor="topic" className="block text-lg font-semibold mb-2 text-gray-700">
                What would you like to learn?
              </label>
              <input
                id="topic"
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter a topic or skill (e.g., Python Data Analysis, Web Development)"
                className="w-full p-4 rounded-xl border-2 border-gray-100 bg-white/50 text-gray-800 placeholder-gray-400 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                disabled={loading}
              />
            </div>

            <AnimatePresence mode="sync">
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={loading}
              className={`w-full p-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold 
                transition-all duration-200 flex items-center justify-center gap-2
                ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg'}`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating Your Lesson...
                </span>
              ) : (
                <>
                  <FaBook className="text-xl" />
                  Generate Lesson
                </>
              )}
            </button>
          </form>

          <div className="mt-12 space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                <FaLightbulb className="text-yellow-500" />
                Tips for Best Results
              </h2>
              <div className="grid gap-4">
                {[
                  {
                    icon: <FaRocket className="text-blue-500" />,
                    title: "Be Specific",
                    description: "Include the technology or field (e.g., 'React Hooks' instead of just 'Hooks')"
                  },
                  {
                    icon: <FaBook className="text-indigo-500" />,
                    title: "Mention Skill Level",
                    description: "Add your desired skill level if relevant (e.g., 'Beginner Python')"
                  },
                  {
                    icon: <FaLightbulb className="text-yellow-500" />,
                    title: "Include Goals",
                    description: "Specify your learning goals (e.g., 'Data Visualization with D3.js')"
                  }
                ].map((tip, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-start gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100"
                  >
                    <div className="shrink-0">
                      {tip.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{tip.title}</h3>
                      <p className="text-gray-600">{tip.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 