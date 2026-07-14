import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import './Login.css'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [registerEmail, setRegisterEmail] = useState('')
  const [localError, setLocalError] = useState('')
  const { login, register, isLoading, error: authError } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLocalError('')
    try {
      await login(username, password)
      navigate('/dashboard')
    } catch (err) {
      setLocalError(err.message || 'Login failed')
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setLocalError('')
    
    if (!username || !registerEmail || !password) {
      setLocalError('All fields are required')
      return
    }
    
    try {
      await register(username, registerEmail, password)
      setShowRegister(false)
      navigate('/dashboard')
    } catch (err) {
      setLocalError(err.message || 'Registration failed')
    }
  }

  const displayError = localError || authError

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1>Runbook Automation</h1>
          <p>Dashboard</p>
        </div>

        {displayError && <div className="error-message">{displayError}</div>}

        {!showRegister ? (
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-group">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="login-button"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="login-form">
            <div className="form-group">
              <label htmlFor="reg-username">Username</label>
              <input
                id="reg-username"
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="reg-email">Email</label>
              <input
                id="reg-email"
                type="email"
                placeholder="Enter email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="reg-password">Password</label>
              <div className="password-input-group">
                <input
                  id="reg-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="login-button"
              disabled={isLoading}
            >
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </form>
        )}

        <div className="login-footer">
          <button
            type="button"
            className="toggle-mode"
            onClick={() => {
              setShowRegister(!showRegister)
              setLocalError('')
            }}
            disabled={isLoading}
          >
            {showRegister
              ? 'Already have an account? Login'
              : "Don't have an account? Register"}
          </button>
        </div>

        {!showRegister && (
          <div className="demo-info">
            <p><strong>Demo Account:</strong></p>
            <p>Username: <code>admin</code></p>
            <p>Password: <code>admin123</code></p>
          </div>
        )}
      </div>
    </div>
  )
}
