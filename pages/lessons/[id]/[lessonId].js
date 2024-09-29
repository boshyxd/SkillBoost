import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '../../../hooks/useAuth'
import LoadingSpinner from '../../../components/LoadingSpinner'
import SEO from '../../../components/SEO'
import { useUserSkills } from '../../../hooks/useUserSkills'
import { db } from '../../../lib/firebase'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import axios from 'axios'

export default function LessonPage() {
  const router = useRouter()
  const { id, lessonId } = router.query
  const { user } = useAuth()
  const { userSkills, loading: userSkillsLoading, addUserSkill } = useUserSkills()
  const [skillData, setSkillData] = useState(null)
  const [currentLesson, setCurrentLesson] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (id && lessonId && !userSkillsLoading && user) {
      console.log('Fetching skill data for id:', id, 'lessonId:', lessonId)
      fetchSkillData()
    }
  }, [id, lessonId, userSkillsLoading, user])

  const fetchSkillData = async () => {
    setIsLoading(true)
    setError(null)
    try {
      console.log('Fetching skill data for id:', id, 'lessonId:', lessonId)
      console.log('userSkills:', userSkills)

      // First, check if the skill is in userSkills
      const userSkill = userSkills.find(s => s.id === id)
      if (userSkill) {
        console.log('Found skill in userSkills:', userSkill)
        if (userSkill.lessons) {
          setSkillData(userSkill)
          setCurrentLesson(userSkill.lessons[parseInt(lessonId) - 1])
        } else {
          console.log('userSkill does not have lessons, generating skill content')
          await generateSkillContent(userSkill)
        }
      } else {
        console.log('Skill not found in userSkills, fetching from Firebase')
        const skillDoc = await getDoc(doc(db, 'generatedSkills', id))
        if (skillDoc.exists()) {
          const data = skillDoc.data()
          console.log('Fetched skill data from Firebase:', data)
          setSkillData(data)
          if (data.lessons && data.lessons[parseInt(lessonId) - 1]) {
            setCurrentLesson(data.lessons[parseInt(lessonId) - 1])
          } else {
            console.error('Lesson not found in Firebase data')
            setError('Lesson not found')
          }
          // Add the skill to userSkills
          await addUserSkill(data)
        } else {
          console.error('Skill not found in Firebase')
          setError('Skill not found')
        }
      }
      // Update user progress
      await updateUserProgress(id, parseInt(lessonId))
    } catch (error) {
      console.error('Error fetching skill data:', error)
      setError(`Failed to fetch skill data: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const generateSkillContent = async (userSkill) => {
    try {
      const token = await user.getIdToken()
      const response = await axios.post('/api/generate-skill', 
        { skillName: userSkill.skill, description: userSkill.explanation },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      console.log('Generated skill content:', response.data)
      setSkillData(response.data)
      setCurrentLesson(response.data.lessons[parseInt(lessonId) - 1])
      // Update the skill in userSkills
      await addUserSkill(response.data)
    } catch (error) {
      console.error('Error generating skill content:', error)
      setError(`Failed to generate skill content: ${error.response?.data?.message || error.message}`)
    }
  }

  const updateUserProgress = async (skillId, lessonNumber) => {
    if (!user) return
    const progressRef = doc(db, 'userProgress', user.uid)
    try {
      const progressDoc = await getDoc(progressRef)
      if (progressDoc.exists()) {
        await updateDoc(progressRef, {
          [`${skillId}`]: lessonNumber
        })
      } else {
        await setDoc(progressRef, {
          [`${skillId}`]: lessonNumber
        })
      }
    } catch (error) {
      console.error('Error updating user progress:', error)
    }
  }

  if (isLoading) return <LoadingSpinner />
  if (error) {
    console.error('Error state:', error)
    return <div className="text-red-500">{error}</div>
  }
  if (!skillData || !currentLesson) {
    console.error('No skill data or current lesson:', { skillData, currentLesson })
    return <div>Lesson not found</div>
  }

  console.log('Rendering lesson:', currentLesson)

  return (
    <div className="container mx-auto px-4 py-8 flex">
      <SEO 
        title={`${currentLesson.title} - ${skillData.skillPage?.title || 'Lesson'}`}
        description={`Lesson ${lessonId} of ${skillData.skillPage?.title || 'Skill'}`}
      />

      {/* Sidebar */}
      <div className="w-1/4 pr-8">
        <h2 className="text-xl font-semibold mb-4">Lessons</h2>
        <ul>
          {skillData.lessons && skillData.lessons.map((lesson, index) => (
            <li key={index} className="mb-2">
              <Link 
                href={`/lessons/${id}/${index + 1}`}
                className={`text-blue-500 hover:underline ${parseInt(lessonId) === index + 1 ? 'font-bold' : ''}`}
              >
                {lesson.title}
              </Link>
            </li>
          ))}
        </ul>
        <Link 
          href={`/skills/${id}`}
          className="mt-4 inline-block bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition duration-300"
        >
          Back to Skill
        </Link>
      </div>

      {/* Main content */}
      <div className="w-3/4">
        <h1 className="text-4xl font-bold mb-8">{currentLesson.title}</h1>
        
        <div className="mb-8">
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: currentLesson.content }} />
        </div>

        {currentLesson.keyTakeaways && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Key Takeaways</h2>
            <ul className="list-disc list-inside">
              {currentLesson.keyTakeaways.map((takeaway, index) => (
                <li key={index}>{takeaway}</li>
              ))}
            </ul>
          </div>
        )}

        {currentLesson.task && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Task</h2>
            <p className="mb-4">{currentLesson.task.description}</p>
            {currentLesson.task.steps && (
              <ol className="list-decimal list-inside mb-4">
                {currentLesson.task.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            )}
            {currentLesson.task.tips && (
              <>
                <h3 className="text-xl font-semibold mb-2">Tips:</h3>
                <ul className="list-disc list-inside">
                  {currentLesson.task.tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}

        <div className="mt-8 flex justify-between">
          {parseInt(lessonId) > 1 && (
            <Link 
              href={`/lessons/${id}/${parseInt(lessonId) - 1}`}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
            >
              Previous Lesson
            </Link>
          )}
          {skillData.lessons && parseInt(lessonId) < skillData.lessons.length && (
            <Link 
              href={`/lessons/${id}/${parseInt(lessonId) + 1}`}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Next Lesson
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}