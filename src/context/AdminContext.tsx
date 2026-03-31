import {
  signOut as firebaseSignOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../lib/firebase'

const ADMIN_LS_KEY = 'portfolio:admin'

interface AdminContextValue {
  isAdmin: boolean
  needsPassword: boolean
  authenticate: (password: string) => Promise<void>
  dismissAdmin: () => void
}

const AdminContext = createContext<AdminContextValue>({
  isAdmin: false,
  needsPassword: false,
  authenticate: async () => {},
  dismissAdmin: () => {},
})

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [needsPassword, setNeedsPassword] = useState(false)

  useEffect(() => {
    const secret = import.meta.env.VITE_ADMIN_SECRET
    if (!secret) return

    const stored = localStorage.getItem(ADMIN_LS_KEY)
    if (stored !== secret) return

    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setIsAdmin(true)
        setNeedsPassword(false)
      } else {
        setNeedsPassword(true)
      }
    })

    return unsubscribe
  }, [])

  const authenticate = async (password: string) => {
    const email = import.meta.env.VITE_ADMIN_EMAIL
    await signInWithEmailAndPassword(auth, email, password)
    // onAuthStateChanged handles setting isAdmin
  }

  const dismissAdmin = () => {
    localStorage.removeItem(ADMIN_LS_KEY)
    firebaseSignOut(auth)
    setIsAdmin(false)
    setNeedsPassword(false)
  }

  return (
    <AdminContext.Provider
      value={{ isAdmin, needsPassword, authenticate, dismissAdmin }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export const useAdmin = () => useContext(AdminContext)
