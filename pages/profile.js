import Head from 'next/head'
import { useAuth } from '../hooks/useAuth'
import { useProgress } from '../hooks/useProgress'
import { useSkills } from '../hooks/useSkills'
import ProgressOverview from '../components/profile/ProgressOverview'
import SkillsRadarChart from '../components/profile/SkillsRadarChart'
import RecentActivity from '../components/profile/RecentActivity'

export default function Profile() {
  const { user } = useAuth()
  const { progress, isLoading: progressLoading } = useProgress()
  const { skills, isLoading: skillsLoading } = useSkills()

  if (!user || progressLoading || skillsLoading) return <div>Loading...</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Your Profile - SkillBoost</title>
        <meta name="description" content="Manage your SkillBoost profile and track your progress" />
      </Head>

      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
          <p><strong>Name:</strong> {user.displayName}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>

        <ProgressOverview progress={progress} />
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <SkillsRadarChart skills={skills || []} />
        <RecentActivity activities={progress || []} />
      </div>
    </div>
  )
}
