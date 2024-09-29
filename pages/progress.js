import Head from 'next/head'
import { useProgress } from '../hooks/useProgress'
import { useSkills } from '../hooks/useSkills'
import ProgressChart from '../components/progress/ProgressChart'
import SkillProgressList from '../components/progress/SkillProgressList'
import LearningStreak from '../components/progress/LearningStreak'

export default function Progress() {
  const { progress, isLoading: progressLoading } = useProgress()
  const { skills, isLoading: skillsLoading } = useSkills()

  if (progressLoading || skillsLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Your Progress - SkillBoost</title>
        <meta name="description" content="Track your learning progress on SkillBoost" />
      </Head>

      <h1 className="text-3xl font-bold mb-6">Your Progress</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProgressChart progress={progress || []} />
        <LearningStreak streak={calculateStreak(progress)} />
      </div>

      <div className="mt-8">
        <SkillProgressList skills={skills || []} progress={progress || []} />
      </div>
    </div>
  )
}

function calculateStreak(progress) {
  // Implement streak calculation logic here
  return progress && progress.length > 0 ? progress.length : 0;
}
