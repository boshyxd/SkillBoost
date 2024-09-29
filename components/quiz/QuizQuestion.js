import { motion } from 'framer-motion';

export default function QuizQuestion({ question, onAnswer }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">{question.text}</h2>
      <div className="space-y-2">
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            className="w-full text-left p-3 border rounded-md hover:bg-blue-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onAnswer(option)}
          >
            {option}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
