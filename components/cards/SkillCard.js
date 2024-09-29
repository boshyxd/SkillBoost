import { motion } from 'framer-motion';
import Link from 'next/link';

export default function SkillCard({ id, title, icon, description, difficulty, lessons }) {
  const difficultyColor = {
    Beginner: 'bg-green-100 text-green-800',
    Intermediate: 'bg-yellow-100 text-yellow-800',
    Advanced: 'bg-red-100 text-red-800',
  };

  const firstLessonId = lessons && lessons.length > 0 ? lessons[0].id : null;

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="p-6">
        <motion.div
          className="text-4xl mb-4 inline-block"
          initial={{ rotate: 0 }}
          whileHover={{ rotate: 15 }}
        >
          {icon}
        </motion.div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <span className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full ${difficultyColor[difficulty]}`}>
          {difficulty}
        </span>
      </div>
      {firstLessonId ? (
        <Link href={`/lessons/${firstLessonId}`}>
          <motion.button
            className="w-full bg-blue-500 text-white py-3 px-4 font-semibold"
            whileHover={{ backgroundColor: "#2c5282" }}
            whileTap={{ scale: 0.95 }}
          >
            Start Learning
          </motion.button>
        </Link>
      ) : (
        <p className="text-center py-3 px-4 text-gray-500">No lessons available</p>
      )}
    </motion.div>
  );
}
