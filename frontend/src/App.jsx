import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './hooks/useAuth.jsx'
import { ThemeProvider } from './hooks/useTheme.jsx'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Runbook from './pages/Runbook'
import RunbookDetails from './pages/RunbookDetails'
import RunbookLibrary from './pages/RunbookLibrary'
import CreateRunbook from './pages/CreateRunbook'
import Reports from './pages/Reports'
import ProtectedRoute from './components/ProtectedRoute'
import './styles/theme.css'
import './App.css'

function AppContent() {
  const { isAuthenticated } = useAuth()

  return (
    <Routes>
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} 
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/runbook"
        element={
          <ProtectedRoute>
            <Runbook />
          </ProtectedRoute>
        }
      />
      <Route
        path="/runbook/create"
        element={
          <ProtectedRoute>
            <CreateRunbook />
          </ProtectedRoute>
        }
      />
      <Route
        path="/runbook/:id"
        element={
          <ProtectedRoute>
            <RunbookDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/runbook/:id/edit"
        element={
          <ProtectedRoute>
            <RunbookDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/runbook-library"
        element={
          <ProtectedRoute>
            <RunbookLibrary />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  )
}

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </Router>
  )
}

export default App
