export default function RecentActivity({ activities }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
      <ul className="space-y-2">
        {activities.slice(0, 5).map((activity, index) => (
          <li key={index} className="flex items-center">
            <span className="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
            <span>{activity.lessonTitle} completed</span>
          </li>
        ))}
      </ul>
    </div>
  )
}