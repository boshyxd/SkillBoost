import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '../../hooks/useAuth'
import AuthNav from './AuthNav'

const navItems = [
  { href: '/', label: 'Home', icon: '🏠' },
  { href: '/explore', label: 'Explore', icon: '🔍' },
  { href: '/progress', label: 'Progress', icon: '📊' },
  { href: '/profile', label: 'Profile', icon: '👤' },
]

export default function BottomNav() {
  const router = useRouter()
  const { user } = useAuth()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <ul className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className={`flex flex-col items-center p-2 ${
              router.pathname === item.href ? 'text-blue-500' : 'text-gray-500'
            }`}>
              <span className="text-2xl">{item.icon}</span>
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          </li>
        ))}
        <li>
          <AuthNav />
        </li>
      </ul>
    </nav>
  )
}
