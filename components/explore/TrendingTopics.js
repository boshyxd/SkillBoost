import { useState, useEffect } from 'react'

export default function TrendingTopics() {
  const [topics, setTopics] = useState([])

  useEffect(() => {
    // In a real app, fetch this data from an API
    setTopics([
      { id: 1, title: "Artificial Intelligence in Healthcare", popularity: 95 },
      { id: 2, title: "Blockchain for Supply Chain", popularity: 88 },
      { id: 3, title: "Quantum Computing Basics", popularity: 82 },
      { id: 4, title: "Sustainable Energy Technologies", popularity: 79 },
      { id: 5, title: "Augmented Reality in Education", popularity: 75 },
    ])
  }, [])

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Trending Topics</h2>
      <ul className="space-y-2">
        {topics.map(topic => (
          <li key={topic.id} className="flex items-center justify-between">
            <span>{topic.title}</span>
            <span className="text-sm text-gray-500">{topic.popularity}% trending</span>
          </li>
        ))}
      </ul>
    </div>
  )
}