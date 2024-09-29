import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

export default function ProgressOverview({ progress }) {
  if (!progress) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Progress Overview</h2>
        <p>No progress data available yet.</p>
      </div>
    )
  }

  const completedValue = progress.length || 0
  const data = [
    { name: 'Completed', value: completedValue },
    { name: 'Remaining', value: 100 - completedValue },
  ]
  const COLORS = ['#0088FE', '#FFBB28']

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Progress Overview</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <p className="text-center mt-4">{completedValue}% of skills completed</p>
    </div>
  )
}