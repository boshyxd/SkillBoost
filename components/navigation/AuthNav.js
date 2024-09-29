import Link from 'next/link'
import { useAuth } from '../../hooks/useAuth'
import { auth } from '../../lib/firebase'
import { signOut } from 'firebase/auth'
import { useRouter } from 'next/router'

export default function AuthNav() {
  const { user } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  if (user) {
    return (
      <button
        onClick={handleLogout}
        className="flex flex-col items-center p-2 text-gray-500"
      >
        <span className="text-2xl">🚪</span>
        <span className="text-xs mt-1">Logout</span>
      </button>
    )
  }

  return (
    <div className="flex flex-col items-center p-2">
      <Link href="/login" className="text-blue-500 hover:underline text-xs">
        Login
      </Link>
      <Link href="/register" className="text-green-500 hover:underline text-xs mt-1">
        Register
      </Link>
    </div>
  )
}