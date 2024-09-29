import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useAuth } from '../../hooks/useAuth'
import LoadingSpinner from '../../components/LoadingSpinner'
import SEO from '../../components/SEO'
import { useUserSkills } from '../../hooks/useUserSkills'
import { db } from '../../lib/firebase'
import { doc, getDoc } from 'firebase/firestore'

export default function SkillPage() {
  const router = useRouter()
  const { id } = router.query
  const { user } = useAuth()
  const [skillData, setSkillData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [videoId, setVideoId] = useState(null)
  const { userSkills, loading: userSkillsLoading } = useUserSkills()

  useEffect(() => {
    if (id && !userSkillsLoading && user) {
      fetchSkillData()
    }
  }, [id, userSkillsLoading, user])

  useEffect(() => {
    if (skillData && skillData.skillPage) {
      fetchYoutubeVideo()
    }
  }, [skillData])

  const fetchSkillData = async () => {
    setIsLoading(true)
    setError(null)
    try {
      // Check if the skill exists in userSkills
      const userSkill = userSkills.find(s => s.id === id)
      
      // Check if the skill exists in generatedSkills
      const skillDoc = await getDoc(doc(db, 'generatedSkills', id))
      
      if (skillDoc.exists()) {
        // If the skill exists in generatedSkills, use that data
        setSkillData(skillDoc.data())
      } else if (userSkill) {
        // If the skill exists in userSkills but not in generatedSkills, generate it
        const token = await user.getIdToken()
        const response = await axios.post('/api/generate-skill', 
          { skillName: userSkill.skill, description: userSkill.explanation },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        setSkillData(response.data)
      } else {
        setError('Skill not found')
      }
    } catch (error) {
      console.error('Error fetching/generating skill data:', error)
      setError(`Failed to fetch/generate skill data: ${error.response?.data?.message || error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchYoutubeVideo = async () => {
    if (skillData && skillData.skillPage) {
      try {
        const response = await axios.get(`/api/youtube-video?skill=${encodeURIComponent(skillData.skillPage.title)}`);
        setVideoId(response.data.videoId);
      } catch (error) {
        console.error('Error fetching YouTube video:', error);
      }
    }
  };

  if (isLoading) return <LoadingSpinner />
  if (error) return <div className="text-red-500">{error}</div>
  if (!skillData || !skillData.skillPage) return null

  const { skillPage, lessons } = skillData

  return (
    <div className="container mx-auto px-4 py-8 flex">
      <SEO 
        title={skillPage.title || 'Skill Page'}
        description={skillPage.description || 'Learn about this skill'}
      />

      {/* Sidebar */}
      <div className="w-1/4 pr-8">
        <h2 className="text-xl font-semibold mb-4">Lessons</h2>
        <ul>
          {lessons && lessons.map((lesson, index) => (
            <li key={index} className="mb-2">
              <Link 
                href={{
                  pathname: `/lessons/${id}/${index + 1}`,
                  query: { 
                    skillTitle: skillPage.title,
                    lessonData: JSON.stringify(lesson)
                  }
                }}
                className="text-blue-500 hover:underline"
              >
                {lesson.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Main content */}
      <div className="w-3/4">
        <h1 className="text-4xl font-bold mb-8">{skillPage.title}</h1>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">About this Skill</h2>
          <p>{skillPage.description}</p>
        </div>

        {skillPage.learningObjectives && skillPage.learningObjectives.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Learning Objectives</h2>
            <ul className="list-disc list-inside">
              {skillPage.learningObjectives.map((objective, index) => (
                <li key={index}>{objective}</li>
              ))}
            </ul>
          </div>
        )}

        {skillPage.importance && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Why is this skill important?</h2>
            <p>{skillPage.importance}</p>
          </div>
        )}

        {skillPage.applications && skillPage.applications.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Potential Applications</h2>
            <ul className="list-disc list-inside">
              {skillPage.applications.map((application, index) => (
                <li key={index}>{application}</li>
              ))}
            </ul>
          </div>
        )}

        {skillPage.prerequisites && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Prerequisites</h2>
            <p>{skillPage.prerequisites}</p>
          </div>
        )}

        {skillPage.estimatedTime && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Estimated Time to Master</h2>
            <p>{skillPage.estimatedTime}</p>
          </div>
        )}

        {/* New sections */}
        {skillPage.keyTechnologies && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Key Technologies</h2>
            <ul className="list-disc list-inside">
              {skillPage.keyTechnologies.map((tech, index) => (
                <li key={index}>{tech}</li>
              ))}
            </ul>
          </div>
        )}

        {skillPage.careerOpportunities && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Career Opportunities</h2>
            <p>{skillPage.careerOpportunities}</p>
          </div>
        )}

        {skillPage.industryTrends && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Industry Trends</h2>
            <p>{skillPage.industryTrends}</p>
          </div>
        )}

        {videoId ? (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Related Video</h2>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        ) : (
          null
        )}

        <div className="mt-12 text-center">
          {lessons && lessons.length > 0 && (
            <Link 
              href={{
                pathname: `/lessons/${id}/1`,
                query: { 
                  skillTitle: skillPage.title,
                  lessonData: JSON.stringify(lessons[0])
                }
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition duration-300"
            >
              Start Lessons
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}