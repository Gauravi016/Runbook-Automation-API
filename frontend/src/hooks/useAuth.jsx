import { useState, useContext, createContext } from 'react'
import { tasksAPI } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token') || null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Load user from localStorage on mount
  useState(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser && token) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (err) {
        console.error('Error parsing saved user:', err)
      }
    }
  }, [token])

  const login = async (username, password) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Login failed')
      }

      const data = await response.json()
      setUser(data.user)
      setToken(data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      localStorage.setItem('token', data.token)
    } catch (err) {
      setError(err.message || 'Login failed')
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (username, email, password) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password })
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Registration failed')
      }

      const data = await response.json()
      setUser(data.user)
      setToken(data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      localStorage.setItem('token', data.token)
    } catch (err) {
      setError(err.message || 'Registration failed')
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  const value = {
    user,
    token,
    isLoading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user && !!token
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
