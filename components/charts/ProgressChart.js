import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

export default function ProgressChart({ progress }) {
  const data = [
    { name: 'Completed', value: progress },
    { name: 'Remaining', value: 100 - progress }
  ]
  const COLORS = ['#4CAF50', '#ECEFF1']

  return (
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
      <p className="text-center text-xl font-semibold">{progress}% Complete</p>
    </div>
  )
}