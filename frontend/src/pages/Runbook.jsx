import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Sidebar from '../components/Sidebar';
import { LineChart, Line, AreaChart, Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { FiMoreVertical, FiSearch } from 'react-icons/fi';
import '../styles/Runbook.css';

const Runbook = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedCard, setExpandedCard] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [filteredRunbooks, setFilteredRunbooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDropdown, setOpenDropdown] = useState(null);

  // KPI Data
  const kpiData = [
    { label: 'Executed Today', value: '126', icon: '📊', color: '#3B82F6' },
    { label: 'Success Rate', value: '98.7%', icon: '✅', color: '#22C55E' },
    { label: 'Running Now', value: '12', icon: '⚙️', color: '#06B6D4' },
    { label: 'Failed Today', value: '3', icon: '❌', color: '#EF4444' },
    { label: 'Avg Duration', value: '1m 23s', icon: '⏱️', color: '#8B5CF6' },
    { label: 'Scheduled Jobs', value: '18', icon: '📅', color: '#F59E0B' }
  ];

  // Trend data for mini charts
  const getTrendData = () => [
    { day: 'Mon', success: 94, failed: 6 },
    { day: 'Tue', success: 96, failed: 4 },
    { day: 'Wed', success: 91, failed: 9 },
    { day: 'Thu', success: 98, failed: 2 },
    { day: 'Fri', success: 99, failed: 1 },
    { day: 'Sat', success: 95, failed: 5 },
    { day: 'Sun', success: 97, failed: 3 }
  ];

  // Runbook mock data with enhanced features
  const runbooksData = [
    {
      id: 1,
      name: 'Database Backup',
      status: 'Success',
      lastExecuted: '2024-07-14 10:30 AM',
      nextScheduled: '2024-07-15 02:00 AM',
      executionCount: 145,
      owner: 'Admin',
      description: 'Daily backup of production database',
      healthScore: 92,
      successRate: 98,
      avgRuntime: 43,
      environment: 'PROD',
      tags: ['PostgreSQL', 'Production', 'Nightly', 'Critical'],
      trendData: getTrendData(),
      executionSteps: [
        { step: 'Started', time: '10:30', status: 'completed' },
        { step: 'Connected DB', time: '10:30', status: 'completed' },
        { step: 'Backup Created', time: '10:33', status: 'completed' },
        { step: 'Uploaded To Storage', time: '10:35', status: 'completed' },
        { step: 'Completed', time: '10:35', status: 'completed' }
      ]
    },
    {
      id: 2,
      name: 'Server Health Check',
      status: 'Success',
      lastExecuted: '2024-07-14 09:00 AM',
      nextScheduled: '2024-07-14 03:00 PM',
      executionCount: 892,
      owner: 'DevOps Team',
      description: 'Monitor server health and resources',
      healthScore: 88,
      successRate: 95,
      avgRuntime: 25,
      environment: 'UAT',
      tags: ['Monitoring', 'Health', 'Hourly'],
      trendData: getTrendData(),
      executionSteps: [
        { step: 'Started', time: '09:00', status: 'completed' },
        { step: 'CPU Check', time: '09:00', status: 'completed' },
        { step: 'Memory Check', time: '09:01', status: 'completed' },
        { step: 'Disk Check', time: '09:01', status: 'completed' },
        { step: 'Completed', time: '09:02', status: 'completed' }
      ]
    },
    {
      id: 3,
      name: 'Deploy Release',
      status: 'Running',
      lastExecuted: '2024-07-13 05:30 PM',
      nextScheduled: 'Manual',
      executionCount: 23,
      owner: 'Dev Team',
      description: 'Deploy new release to production',
      healthScore: 78,
      successRate: 82,
      avgRuntime: 180,
      environment: 'PROD',
      tags: ['Deployment', 'Production'],
      trendData: getTrendData(),
      progress: 70,
      currentStep: 7,
      totalSteps: 10,
      executionSteps: [
        { step: 'Started', time: '14:20', status: 'completed' },
        { step: 'Pulled Code', time: '14:20', status: 'completed' },
        { step: 'Build Tests', time: '14:22', status: 'completed' },
        { step: 'Build Complete', time: '14:25', status: 'running' },
        { step: 'Deploy Staging', time: '-', status: 'pending' },
        { step: 'Smoke Tests', time: '-', status: 'pending' },
        { step: 'Deploy Production', time: '-', status: 'pending' }
      ]
    },
    {
      id: 4,
      name: 'Cache Cleanup',
      status: 'Failed',
      lastExecuted: '2024-07-14 11:00 AM',
      nextScheduled: 'N/A',
      executionCount: 567,
      owner: 'Infrastructure',
      description: 'Clear expired cache entries',
      healthScore: 65,
      successRate: 72,
      avgRuntime: 15,
      environment: 'DEV',
      tags: ['Cache', 'Cleanup', 'Daily'],
      trendData: getTrendData(),
      executionSteps: [
        { step: 'Started', time: '11:00', status: 'completed' },
        { step: 'Connected to Cache', time: '11:00', status: 'completed' },
        { step: 'Identified Expired', time: '11:01', status: 'completed' },
        { step: 'Deletion Failed', time: '11:02', status: 'failed' }
      ],
      failureReason: 'Connection timeout to cache server'
    }
  ];

  // AI recommendations
  const aiRecommendations = [
    {
      icon: '🤖',
      title: 'Database Backup Alert',
      description: 'Failed twice in the last 7 days.',
      suggestion: 'Check Storage Capacity',
      severity: 'high'
    },
    {
      icon: '📈',
      title: 'Performance Improvement',
      description: 'Server Health Check runtime increased by 40%.',
      suggestion: 'Review system resources',
      severity: 'medium'
    }
  ];

  // Live activity
  const liveActivity = [
    { time: '10:45', status: '✅', action: 'DB Backup Completed' },
    { time: '10:44', status: '🔄', action: 'Cache Cleanup Running' },
    { time: '10:42', status: '❌', action: 'Release Deployment Failed' },
    { time: '10:40', status: '✅', action: 'Health Check Completed' },
    { time: '10:35', status: '✅', action: 'Backup Uploaded' }
  ];

  useEffect(() => {
    filterRunbooks(activeFilter, searchQuery);
  }, [activeFilter, searchQuery]);

  const filterRunbooks = (filter, search) => {
    let filtered = runbooksData;

    if (filter !== 'All') {
      filtered = filtered.filter(r => r.status === filter);
    }

    if (search) {
      filtered = filtered.filter(r => r.name.toLowerCase().includes(search.toLowerCase()));
    }

    setFilteredRunbooks(filtered);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getEnvironmentColor = (env) => {
    const colors = {
      PROD: '#22C55E',
      UAT: '#F59E0B',
      DEV: '#3B82F6',
      DR: '#8B5CF6'
    };
    return colors[env] || '#64748B';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Success': return '#22C55E';
      case 'Failed': return '#EF4444';
      case 'Running': return '#06B6D4';
      default: return '#F59E0B';
    }
  };

  return (
    <div className="layout-wrapper">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className={`layout-main ${!sidebarOpen ? 'sidebar-collapsed' : ''}`}>
        <header className="layout-header">
          <button className="layout-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
          <h1 className="layout-title">Executed Runbooks</h1>
          <div className="layout-user">
            <span className="user-info">Welcome, {user?.username}</span>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </div>
        </header>

        <main className="layout-content runbook-page-content">
          {/* KPI Cards */}
          <div className="kpi-section">
            {kpiData.map((kpi, idx) => (
              <div key={idx} className="kpi-card" style={{ borderLeftColor: kpi.color }}>
                <div className="kpi-icon">{kpi.icon}</div>
                <div className="kpi-info">
                  <p className="kpi-label">{kpi.label}</p>
                  <h3 className="kpi-value">{kpi.value}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="charts-section">
            <div className="chart-container">
              <h3>Success Trend (Last 7 Days)</h3>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={getTrendData()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                  <XAxis dataKey="day" stroke="var(--text-tertiary)" />
                  <YAxis stroke="var(--text-tertiary)" />
                  <Tooltip contentStyle={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '8px' }} />
                  <Area type="monotone" dataKey="success" stackId="1" stroke="#22C55E" fill="rgba(34, 197, 94, 0.2)" />
                  <Area type="monotone" dataKey="failed" stackId="1" stroke="#EF4444" fill="rgba(239, 68, 68, 0.2)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="runbook-controls">
            <div className="search-box">
              <FiSearch className="search-icon" />
              <input 
                type="text" 
                placeholder="Search runbooks..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="filter-buttons">
              {['All', 'Success', 'Failed', 'Running'].map(filter => (
                <button 
                  key={filter} 
                  className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content with Runbooks and Live Feed */}
          <div className="runbook-main-layout">
            {/* Runbooks Grid */}
            <div className="runbook-cards-container">
              <div className="runbooks-grid">
                {filteredRunbooks.map((runbook) => (
                  <div 
                    key={runbook.id} 
                    className={`runbook-card-modern ${expandedCard === runbook.id ? 'expanded' : ''}`}
                    onMouseEnter={() => setExpandedCard(runbook.id)}
                    onMouseLeave={() => setExpandedCard(null)}
                  >
                    {/* Card Header */}
                    <div className="runbook-card-header-modern">
                      <div className="runbook-title-section">
                        <h3>{runbook.name}</h3>
                        <div className="environment-badge" style={{ backgroundColor: getEnvironmentColor(runbook.environment) }}>
                          {runbook.environment}
                        </div>
                      </div>
                      <div className="runbook-dropdown">
                        <button 
                          className="dropdown-toggle"
                          onClick={() => setOpenDropdown(openDropdown === runbook.id ? null : runbook.id)}
                        >
                          <FiMoreVertical />
                        </button>
                        {openDropdown === runbook.id && (
                          <div className="dropdown-menu">
                            <button className="dropdown-item">▶ Run Now</button>
                            <button className="dropdown-item">📋 View Logs</button>
                            <button className="dropdown-item">📅 Schedule</button>
                            <button className="dropdown-item">✏ Edit</button>
                            <button className="dropdown-item">📊 Analytics</button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Health Score and Metrics */}
                    <div className="runbook-health-section">
                      <div className="health-score">
                        <div className="score-label">Health Score</div>
                        <div className="score-bar">
                          <div className="score-fill" style={{ width: `${runbook.healthScore}%` }}></div>
                        </div>
                        <div className="score-value">{runbook.healthScore}%</div>
                      </div>

                      <div className="quick-metrics">
                        <div className="metric">
                          <span className="metric-label">Success Rate</span>
                          <span className="metric-value">{runbook.successRate}%</span>
                        </div>
                        <div className="metric">
                          <span className="metric-label">Avg Runtime</span>
                          <span className="metric-value">{runbook.avgRuntime}s</span>
                        </div>
                      </div>
                    </div>

                    {/* Mini Trend Chart */}
                    <div className="mini-trend">
                      <ResponsiveContainer width="100%" height={60}>
                        <LineChart data={runbook.trendData}>
                          <Line type="monotone" dataKey="success" stroke="#22C55E" strokeWidth={1.5} dot={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Tags */}
                    <div className="runbook-tags">
                      {runbook.tags.map((tag, idx) => (
                        <span key={idx} className="tag">[{tag}]</span>
                      ))}
                    </div>

                    {/* Running Progress */}
                    {runbook.status === 'Running' && (
                      <div className="progress-section">
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: `${runbook.progress}%` }}></div>
                        </div>
                        <p className="progress-text">Step {runbook.currentStep} of {runbook.totalSteps}</p>
                      </div>
                    )}

                    {/* Status Badge and Last Execution */}
                    <div className="runbook-footer-modern">
                      <span className="status-badge" style={{ backgroundColor: getStatusColor(runbook.status), color: 'white' }}>
                        {runbook.status}
                      </span>
                      <span className="last-exec">Last: {runbook.lastExecuted}</span>
                    </div>

                    {/* Expanded Content */}
                    {expandedCard === runbook.id && (
                      <div className="expanded-content">
                        <div className="execution-timeline">
                          <h4>Last Execution Timeline</h4>
                          {runbook.executionSteps.map((step, idx) => (
                            <div key={idx} className="timeline-step">
                              <div className="step-icon">
                                {step.status === 'completed' && '✅'}
                                {step.status === 'running' && '⚙️'}
                                {step.status === 'failed' && '❌'}
                                {step.status === 'pending' && '⏳'}
                              </div>
                              <div className="step-info">
                                <p>{step.step}</p>
                                <span>{step.time}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Sidebar - Live Activity and AI */}
            <div className="right-sidebar">
              {/* Live Activity Feed */}
              <div className="activity-panel">
                <h3>Live Activity</h3>
                <div className="activity-list">
                  {liveActivity.map((activity, idx) => (
                    <div key={idx} className="activity-item">
                      <span className="activity-time">{activity.time}</span>
                      <span className="activity-status">{activity.status}</span>
                      <span className="activity-text">{activity.action}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Recommendations */}
              <div className="ai-panel">
                <h3>AI Insights</h3>
                {aiRecommendations.map((rec, idx) => (
                  <div key={idx} className={`ai-card severity-${rec.severity}`}>
                    <div className="ai-icon">{rec.icon}</div>
                    <div className="ai-content">
                      <p className="ai-title">{rec.title}</p>
                      <p className="ai-desc">{rec.description}</p>
                      <p className="ai-suggestion">💡 {rec.suggestion}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Runbook;
