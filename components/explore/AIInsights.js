import { useState } from 'react'

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
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">AI-Generated Insight</h2>
      <button
        onClick={generateInsight}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Insight'}
      </button>
      {insight && (
        <div className="bg-gray-100 p-4 rounded">
          <p>{insight}</p>
        </div>
      )}
    </div>
  )
}