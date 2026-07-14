import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Sidebar from '../components/Sidebar'
import { motion } from 'framer-motion'
import { LineChart, Line, PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts'
import { FiPlay, FiCalendar, FiPlus, FiServer, FiTrendingUp, FiUsers, FiClock, FiZap } from 'react-icons/fi'
import './Dashboard.css'

// Custom Tooltip Components
const CustomExecutionTrendTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <div className="tooltip-header">
          <strong>{payload[0]?.payload?.date}</strong>
        </div>
        <div className="tooltip-content">
          {payload.map((entry, index) => (
            <div key={index} className="tooltip-row">
              <span className="tooltip-label" style={{ color: entry.color }}>
                ● {entry.name}:
              </span>
              <span className="tooltip-value">{entry.value}</span>
            </div>
          ))}
          <div className="tooltip-divider"></div>
          <div className="tooltip-row">
            <span className="tooltip-label">Total:</span>
            <span className="tooltip-value">
              {payload.reduce((sum, entry) => sum + entry.value, 0)}
            </span>
          </div>
        </div>
      </div>
    )
  }
  return null
}

const CustomPieTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const total = 1236
    const percentage = ((payload[0].value / total) * 100).toFixed(1)
    return (
      <div style={{
        position: 'relative',
        zIndex: 1001
      }}>
        <div className="custom-tooltip">
          <div className="tooltip-header">
            <strong>{payload[0].payload.name}</strong>
          </div>
          <div className="tooltip-content">
            <div className="tooltip-row">
              <span className="tooltip-label" style={{ color: payload[0].payload.color }}>
                ● Count:
              </span>
              <span className="tooltip-value">{payload[0].value.toLocaleString()}</span>
            </div>
            <div className="tooltip-row">
              <span className="tooltip-label">Percentage:</span>
              <span className="tooltip-value">{percentage}%</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return null
}

const CustomBarTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <div className="tooltip-header">
          <strong>{payload[0]?.payload?.name}</strong>
        </div>
        <div className="tooltip-content">
          <div className="tooltip-row">
            <span className="tooltip-label">● Executions:</span>
            <span className="tooltip-value" style={{ color: '#3B82F6' }}>
              {payload[0].value}
            </span>
          </div>
          <div className="tooltip-divider"></div>
          <div className="tooltip-row">
            <span className="tooltip-label">Rank:</span>
            <span className="tooltip-value">
              #{payload[0]?.payload?.rank || '—'}
            </span>
          </div>
        </div>
      </div>
    )
  }
  return null
}

export default function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  // Mock data
  const executionTrendData = [
    { date: 'Mon', executions: 45, successful: 43, failed: 2 },
    { date: 'Tue', executions: 52, successful: 50, failed: 2 },
    { date: 'Wed', executions: 38, successful: 35, failed: 3 },
    { date: 'Thu', executions: 61, successful: 58, failed: 3 },
    { date: 'Fri', executions: 55, successful: 53, failed: 2 },
    { date: 'Sat', executions: 42, successful: 40, failed: 2 },
    { date: 'Sun', executions: 48, successful: 46, failed: 2 }
  ]

  const successFailureData = [
    { name: 'Successful', value: 1218, color: '#22C55E' },
    { name: 'Failed', value: 18, color: '#EF4444' }
  ]

  const topRunbooksData = [
    { name: 'DB Backup', executions: 285, rank: 1 },
    { name: 'Health Check', executions: 234, rank: 2 },
    { name: 'Deploy', executions: 198, rank: 3 },
    { name: 'Cache Clean', executions: 156, rank: 4 },
    { name: 'Log Rotate', executions: 142, rank: 5 }
  ]

  const serverHealthData = [
    { name: 'Server 1', health: 95 },
    { name: 'Server 2', health: 88 },
    { name: 'Server 3', health: 92 },
    { name: 'Server 4', health: 85 },
    { name: 'Server 5', health: 90 }
  ]

  const statCards = [
    { icon: FiZap, label: 'Total Runbooks', value: '24', trend: '+3 this week', color: '#3B82F6' },
    { icon: FiTrendingUp, label: 'Successful', value: '1,234', trend: '+8%', color: '#22C55E' },
    { icon: FiUsers, label: 'Failed', value: '18', trend: '-2%', color: '#EF4444' },
    { icon: FiClock, label: 'Avg Duration', value: '2m 30s', trend: '-5%', color: '#8B5CF6' },
    { icon: FiServer, label: 'Running Jobs', value: '3', trend: 'Live', color: '#06B6D4' },
    { icon: FiCalendar, label: 'Scheduled', value: '8', trend: 'Today', color: '#F59E0B' }
  ]

  const quickActions = [
    { icon: FiPlus, label: 'Create Runbook', action: () => navigate('/runbook/create') },
    { icon: FiPlay, label: 'Execute Now', action: () => navigate('/runbook') },
    { icon: FiCalendar, label: 'Schedule Job', action: () => {} },
    { icon: FiServer, label: 'Add Server', action: () => {} }
  ]

  const recentActivities = [
    { id: 1, runbook: 'DB Backup', user: 'admin', status: 'Successful', timestamp: '2 minutes ago', duration: '2m 30s' },
    { id: 2, runbook: 'Health Check', user: 'john', status: 'Successful', timestamp: '5 minutes ago', duration: '45s' },
    { id: 3, runbook: 'Deploy', user: 'admin', status: 'Failed', timestamp: '12 minutes ago', duration: '1m 15s' },
    { id: 4, runbook: 'Cache Clean', user: 'jane', status: 'Running', timestamp: 'In progress', duration: '30s' },
    { id: 5, runbook: 'Log Rotate', user: 'admin', status: 'Successful', timestamp: '25 minutes ago', duration: '3m 45s' },
    { id: 6, runbook: 'DB Backup', user: 'john', status: 'Successful', timestamp: '1 hour ago', duration: '2m 15s' }
  ]

  return (
    <div className="layout-wrapper">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className={`layout-main ${!sidebarOpen ? 'sidebar-collapsed' : ''}`}>
        <header className="layout-header">
          <button 
            className="layout-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          <h1 className="layout-title">Dashboard</h1>
          <div className="layout-user">
            <span className="user-info">Welcome, {user?.username}</span>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>

        <main className="layout-content">
          {/* Welcome Section */}
          <motion.div className="welcome-section" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="welcome-content">
              <h2>Welcome back, {user?.username} 👋</h2>
              <p>Enterprise Runbook Automation Platform</p>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div className="quick-actions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
            {quickActions.map((action, idx) => {
              const Icon = action.icon
              return (
                <button key={idx} className="action-btn" onClick={action.action}>
                  <Icon className="action-icon" />
                  <span>{action.label}</span>
                </button>
              )
            })}
          </motion.div>

          {/* Stat Cards Grid */}
          <div className="stats-grid">
            {statCards.map((card, idx) => {
              const Icon = card.icon
              return (
                <motion.div 
                  key={idx} 
                  className="stat-card-modern"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -5, boxShadow: 'var(--card-hover-shadow)' }}
                >
                  <div className="stat-icon-wrapper" style={{ borderLeftColor: card.color }}>
                    <Icon className="stat-icon" style={{ color: card.color }} />
                  </div>
                  <div className="stat-info">
                    <h3 className="stat-label">{card.label}</h3>
                    <p className="stat-value">{card.value}</p>
                    <span className="stat-trend">{card.trend}</span>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Charts Section */}
          <div className="charts-grid">
            {/* Execution Trend */}
            <motion.div className="chart-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h3>Execution Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={executionTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                  <XAxis dataKey="date" stroke="var(--text-tertiary)" />
                  <YAxis stroke="var(--text-tertiary)" />
                  <Tooltip content={<CustomExecutionTrendTooltip />} />
                  <Legend />
                  <Line type="monotone" dataKey="successful" stroke="#22C55E" strokeWidth={2} dot={{ fill: '#22C55E' }} />
                  <Line type="monotone" dataKey="failed" stroke="#EF4444" strokeWidth={2} dot={{ fill: '#EF4444' }} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Success vs Failure */}
            <motion.div className="chart-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h3>Success vs Failure</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={successFailureData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" label>
                    {successFailureData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    content={<CustomPieTooltip />}
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      boxShadow: 'none',
                      outline: 'none'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Bottom Charts Row */}
          <div className="charts-grid">
            {/* Top Runbooks */}
            <motion.div className="chart-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h3>Top Used Runbooks</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topRunbooksData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                  <XAxis dataKey="name" stroke="var(--text-tertiary)" />
                  <YAxis stroke="var(--text-tertiary)" />
                  <Tooltip content={<CustomBarTooltip />} />
                  <Bar dataKey="executions" fill="#3B82F6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Server Health */}
            <motion.div className="chart-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h3>Server Health</h3>
              <div className="server-health-list">
                {serverHealthData.map((server, idx) => (
                  <div key={idx} className="health-item">
                    <span className="server-name">{server.name}</span>
                    <div className="health-bar">
                      <div className="health-fill" style={{ width: `${server.health}%`, backgroundColor: server.health > 80 ? '#22C55E' : server.health > 60 ? '#F59E0B' : '#EF4444' }} />
                    </div>
                    <span className="health-value">{server.health}%</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Recent Activity Timeline */}
          <motion.div className="recent-activity-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <h3>Recent Activity Timeline</h3>
            <div className="activity-table">
              <div className="activity-header">
                <div className="activity-col-header">Runbook</div>
                <div className="activity-col-header">User</div>
                <div className="activity-col-header">Status</div>
                <div className="activity-col-header">Time</div>
                <div className="activity-col-header">Duration</div>
              </div>
              {recentActivities.map((activity) => (
                <div key={activity.id} className="activity-row">
                  <div className="activity-cell activity-runbook">{activity.runbook}</div>
                  <div className="activity-cell activity-user">@{activity.user}</div>
                  <div className="activity-cell">
                    <span className={`status-badge status-${activity.status.toLowerCase().replace(' ', '-')}`}>
                      {activity.status}
                    </span>
                  </div>
                  <div className="activity-cell activity-time">{activity.timestamp}</div>
                  <div className="activity-cell activity-duration">{activity.duration}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
