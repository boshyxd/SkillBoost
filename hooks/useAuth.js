import { useState, useEffect } from 'react'
import { auth } from '../lib/firebase'
import { 
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth'
import { useRouter } from 'next/router'

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      setUser(userCredential.user)
      return userCredential.user
    } catch (error) {
      throw error
    }
  }

  const signOut = async () => {
    try {
      await firebaseSignOut(auth)
      setUser(null)
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return {
    user,
    loading,
    signIn,
    signOut
  }
}