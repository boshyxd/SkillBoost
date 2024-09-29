export default function LearningStreak({ streak }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Learning Streak</h2>
      <div className="flex items-center justify-center">
        <div className="text-6xl font-bold text-blue-600">{streak}</div>
        <div className="ml-4 text-xl">days</div>
      </div>
      <p className="text-center mt-4">Keep up the great work!</p>
    </div>
  )
}