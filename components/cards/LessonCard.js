import { motion } from 'framer-motion';
import ProgressBar from '../ui/ProgressBar';
import Link from 'next/link';

export default function LessonCard({ id, title, description, progress, image, quizId }) {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">{title}</h3>
      </div>
      <div className="p-6">
        <p className="text-gray-600 mb-4">{description}</p>
        <ProgressBar progress={progress} />
        <p className="text-sm text-gray-500 mt-2">{progress}% Complete</p>
      </div>
      <div className="flex">
        <Link href={`/lessons/${id}`} className="w-1/2">
          <motion.button
            className="w-full bg-blue-500 text-white py-3 px-4 font-semibold"
            whileHover={{ backgroundColor: "#2c5282" }}
            whileTap={{ scale: 0.95 }}
          >
            Continue Learning
          </motion.button>
        </Link>
        {quizId && (
          <Link href={`/quiz/${quizId}`} className="w-1/2">
            <motion.button
              className="w-full bg-green-500 text-white py-3 px-4 font-semibold"
              whileHover={{ backgroundColor: "#2f855a" }}
              whileTap={{ scale: 0.95 }}
            >
              Take Quiz
            </motion.button>
          </Link>
        )}
      </div>
    </motion.div>
  );
}
