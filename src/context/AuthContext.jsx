/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react'
import { getCurrentUser, signIn, signUp, signOut } from '../services/auth'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    getCurrentUser().then(({ user }) => {
      if (mounted) {
        setUser(user)
        setLoading(false)
      }
    }).catch(() => {
      if (mounted) {
        setUser(null)
        setLoading(false)
      }
    })
    return () => { mounted = false }
  }, [])

  const login = async (email, password) => {
    const { data, error } = await signIn(email, password)
    if (!error) setUser(data.user)
    return { data, error }
  }

  const register = async (email, password) => {
    const { data, error } = await signUp(email, password)
    if (!error) setUser(data.user)
    return { data, error }
  }

  const logout = async () => {
    await signOut()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
