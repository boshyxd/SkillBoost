import { useState, useEffect } from 'react'

export default function CommunityProjects() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    // In a real app, fetch this data from an API
    setProjects([
      { id: 1, title: "Open Source AI Assistant", author: "AI_Enthusiast", stars: 1200 },
      { id: 2, title: "Eco-Friendly Smart Home System", author: "GreenTech", stars: 980 },
      { id: 3, title: "Decentralized Social Media Platform", author: "BlockchainDev", stars: 850 },
      { id: 4, title: "AR-based Language Learning App", author: "PolyglotCoder", stars: 720 },
      { id: 5, title: "AI-powered Music Composer", author: "MelodyMaker", stars: 650 },
    ])
  }, [])

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Community Projects</h2>
      <ul className="space-y-2">
        {projects.map(project => (
          <li key={project.id} className="flex items-center justify-between">
            <span>{project.title}</span>
            <span className="text-sm text-gray-500">{project.stars} ⭐</span>
          </li>
        ))}
      </ul>
    </div>
  )
}