import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Sidebar from '../components/Sidebar';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  BarChart,
  Bar,
  AreaChart,
  Area,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';
import {
  FiDownload,
  FiFilter,
  FiCalendar,
  FiServer,
  FiFileText,
  FiTrendingUp,
  FiCheck,
  FiX,
  FiZap
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import '../styles/Reports.css';

const Reports = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Filter States
  const [dateRange, setDateRange] = useState('last-7-days');
  const [selectedRunbook, setSelectedRunbook] = useState('all');
  const [selectedServer, setSelectedServer] = useState('all');
  const [selectedEnvironment, setSelectedEnvironment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // All Raw Execution Data - used for filtering
  const allExecutionData = [
    { date: '14-Jul', runbook: 'Health Check', server: 'Server-01', environment: 'Production', status: 'Success', duration: '40 sec', user: 'Admin' },
    { date: '14-Jul', runbook: 'Restart Service', server: 'Server-02', environment: 'UAT', status: 'Failed', duration: '18 sec', user: 'John' },
    { date: '14-Jul', runbook: 'Backup Job', server: 'Server-01', environment: 'Production', status: 'Success', duration: '2 min 15 sec', user: 'System' },
    { date: '13-Jul', runbook: 'Log Cleanup', server: 'Server-03', environment: 'Dev', status: 'Success', duration: '1 min 30 sec', user: 'Admin' },
    { date: '13-Jul', runbook: 'Server Health Check', server: 'Server-02', environment: 'Production', status: 'Success', duration: '1 min', user: 'System' },
    { date: '12-Jul', runbook: 'Database Backup', server: 'Server-04', environment: 'Production', status: 'Success', duration: '5 min', user: 'Admin' },
    { date: '12-Jul', runbook: 'Restart Apache', server: 'Server-01', environment: 'UAT', status: 'Failed', duration: '30 sec', user: 'DevOps' },
    { date: '11-Jul', runbook: 'Disk Cleanup', server: 'Server-03', environment: 'Dev', status: 'Success', duration: '2 min', user: 'Admin' },
    { date: '11-Jul', runbook: 'Server Health Check', server: 'Server-04', environment: 'Production', status: 'Success', duration: '45 sec', user: 'System' },
    { date: '10-Jul', runbook: 'Log Cleanup', server: 'Server-02', environment: 'UAT', status: 'Success', duration: '1 min 15 sec', user: 'Admin' }
  ];

  // Filtering function
  const filterExecutionData = () => {
    let filtered = [...allExecutionData];

    // Filter by runbook
    if (selectedRunbook !== 'all') {
      filtered = filtered.filter(item => item.runbook === selectedRunbook);
    }

    // Filter by server
    if (selectedServer !== 'all') {
      filtered = filtered.filter(item => item.server === selectedServer);
    }

    // Filter by environment
    if (selectedEnvironment !== 'all') {
      filtered = filtered.filter(item => item.environment === selectedEnvironment);
    }

    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(item => item.status === selectedStatus);
    }

    // Filter by date range
    if (dateRange !== 'custom') {
      const today = new Date();
      let startDate = new Date();
      
      if (dateRange === 'today') {
        startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      } else if (dateRange === 'last-7-days') {
        startDate.setDate(today.getDate() - 7);
      } else if (dateRange === 'last-30-days') {
        startDate.setDate(today.getDate() - 30);
      }

      filtered = filtered.filter(item => {
        const itemDate = new Date(item.date.replace('-', '/2026'));
        return itemDate >= startDate;
      });
    }

    return filtered;
  };

  const filteredData = filterExecutionData();

  // Calculate dynamic KPIs based on filtered data
  const calculateKPIs = () => {
    const total = filteredData.length || 1;
    const successful = filteredData.filter(item => item.status === 'Success').length;
    const failed = filteredData.filter(item => item.status === 'Failed').length;
    const successRate = total > 0 ? ((successful / total) * 100).toFixed(1) : 0;

    return { total, successful, failed, successRate };
  };

  const kpis = calculateKPIs();

  // Sample Data for Charts (with filtering applied)
  const executionTrendData = [
    { date: 'Jul 8', daily: 45, weekly: 120, monthly: 450 },
    { date: 'Jul 9', daily: 52, weekly: 135, monthly: 480 },
    { date: 'Jul 10', daily: 48, weekly: 140, monthly: 510 },
    { date: 'Jul 11', daily: 61, weekly: 155, monthly: 540 },
    { date: 'Jul 12', daily: 55, weekly: 165, monthly: 570 },
    { date: 'Jul 13', daily: 67, weekly: 180, monthly: 605 },
    { date: 'Jul 14', daily: 72, weekly: 195, monthly: 640 }
  ];

  const successFailureData = [
    { name: 'Success', value: kpis.successful, fill: '#22C55E' },
    { name: 'Failed', value: kpis.failed, fill: '#EF4444' }
  ];

  const mostExecutedData = [
    { name: 'Server Health Check', executions: 520 },
    { name: 'Backup Validation', executions: 420 },
    { name: 'Restart Apache', executions: 300 },
    { name: 'Log Cleanup', executions: 250 },
    { name: 'Disk Cleanup', executions: 210 }
  ];

  const environmentData = [
    { name: 'Production', value: 1240, fill: '#3B82F6' },
    { name: 'UAT', value: 680, fill: '#8B5CF6' },
    { name: 'Dev', value: 450, fill: '#06B6D4' }
  ];

  const executionTimeData = [
    { name: 'Backup Validation', avgTime: 5 },
    { name: 'Health Check', avgTime: 1 },
    { name: 'Restart Service', avgTime: 0.75 },
    { name: 'Log Cleanup', avgTime: 2.5 },
    { name: 'Disk Cleanup', avgTime: 3.2 }
  ];

  const monthlyGrowthData = [
    { month: 'Feb', executions: 420, automated: 320 },
    { month: 'Mar', executions: 580, automated: 450 },
    { month: 'Apr', executions: 720, automated: 580 },
    { month: 'May', executions: 850, automated: 720 },
    { month: 'Jun', executions: 980, automated: 850 },
    { month: 'Jul', executions: 1200, automated: 1050 }
  ];

  const serverWiseData = [
    { server: 'Server-01', totalJobs: 220, success: 215, failed: 5, lastRun: 'Today' },
    { server: 'Server-02', totalJobs: 150, success: 145, failed: 5, lastRun: 'Today' },
    { server: 'Server-03', totalJobs: 180, success: 175, failed: 5, lastRun: 'Yesterday' },
    { server: 'Server-04', totalJobs: 200, success: 198, failed: 2, lastRun: 'Today' }
  ];

  // Error mapping for failed executions
  const failedExecutionData = filteredData.filter(item => item.status === 'Failed');
  
  const recentExecutionData = filteredData.slice(0, 4);

  const errorMap = {
    'Restart Apache-Server-01': 'Permission Denied',
    'Database Backup-Server-04': 'Timeout',
    'Restart Service-Server-02': 'Connection Failed'
  };

  const failedExecutionDataWithErrors = failedExecutionData.map(item => ({
    ...item,
    error: errorMap[`${item.runbook}-${item.server}`] || 'Unknown Error',
    time: item.date === '14-Jul' ? '10:45 AM' : (item.date === '12-Jul' ? '02:30 PM' : '11:15 AM')
  }));

  const kpiCards = [
    { label: 'Total Executions', value: kpis.total.toString(), icon: '📊', color: '#3B82F6' },
    { label: 'Successful Runs', value: kpis.successful.toString(), icon: '✅', color: '#22C55E' },
    { label: 'Failed Runs', value: kpis.failed.toString(), icon: '❌', color: '#EF4444' },
    { label: 'Success Rate', value: `${kpis.successRate}%`, icon: '📈', color: '#F59E0B' },
    { label: 'Avg Execution Time', value: '2m 15s', icon: '⏱️', color: '#8B5CF6' },
    { label: 'Time Saved', value: '185 Hrs', icon: '💾', color: '#06B6D4' }
  ];

  const timeSavedData = [
    { metric: 'Manual Time', value: '420 Hours' },
    { metric: 'Automated Time', value: '85 Hours' },
    { metric: 'Time Saved', value: '335 Hours' },
    { metric: 'Automation Efficiency', value: '79.8%' }
  ];

  const runbooks = ['all', 'Server Health Check', 'Database Backup', 'Restart Apache', 'Log Cleanup'];
  const servers = ['all', 'Server-01', 'Server-02', 'Server-03', 'Server-04'];
  const environments = ['all', 'Dev', 'UAT', 'Production'];
  const statuses = ['all', 'Success', 'Failed', 'Running'];

  const handleGenerateReport = () => {
    alert('Report generation with current filters coming soon!');
  };

  const handleExport = (format) => {
    alert(`Exporting reports as ${format}...`);
  };

  const handleScheduleReport = () => {
    alert('Schedule report feature coming soon!');
  };

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
          <h1 className="layout-title">📊 Reports Dashboard</h1>
          <div className="layout-user">
            <span className="user-info">Welcome, {user?.username}</span>
            <button 
              className="logout-button" 
              onClick={() => { logout(); navigate('/login'); }}
            >
              Logout
            </button>
          </div>
        </header>

        <main className="layout-content">
          <div className="reports-dashboard">
            {/* Filter Section */}
            <motion.div 
              className="reports-filter-section"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="filter-header">
                <div className="filter-icon"><FiFilter size={20} /></div>
                <h2>Report Filters</h2>
              </div>

              <div className="filter-grid">
                {/* Date Range Filter */}
                <div className="filter-group">
                  <label><FiCalendar /> Date Range</label>
                  <select value={dateRange} onChange={(e) => setDateRange(e.target.value)} className="filter-select">
                    <option value="today">Today</option>
                    <option value="last-7-days">Last 7 Days</option>
                    <option value="last-30-days">Last 30 Days</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>

                {/* Runbook Filter */}
                <div className="filter-group">
                  <label><FiFileText /> Runbook Name</label>
                  <select value={selectedRunbook} onChange={(e) => setSelectedRunbook(e.target.value)} className="filter-select">
                    {runbooks.map(rb => (
                      <option key={rb} value={rb}>{rb === 'all' ? 'All Runbooks' : rb}</option>
                    ))}
                  </select>
                </div>

                {/* Server Filter */}
                <div className="filter-group">
                  <label><FiServer /> Server</label>
                  <select value={selectedServer} onChange={(e) => setSelectedServer(e.target.value)} className="filter-select">
                    {servers.map(srv => (
                      <option key={srv} value={srv}>{srv === 'all' ? 'All Servers' : srv}</option>
                    ))}
                  </select>
                </div>

                {/* Environment Filter */}
                <div className="filter-group">
                  <label>🌍 Environment</label>
                  <select value={selectedEnvironment} onChange={(e) => setSelectedEnvironment(e.target.value)} className="filter-select">
                    {environments.map(env => (
                      <option key={env} value={env}>{env === 'all' ? 'All Environments' : env}</option>
                    ))}
                  </select>
                </div>

                {/* Status Filter */}
                <div className="filter-group">
                  <label>✅ Status</label>
                  <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className="filter-select">
                    {statuses.map(st => (
                      <option key={st} value={st}>{st === 'all' ? 'All Status' : st}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="filter-actions">
                <button className="btn btn-primary" onClick={handleGenerateReport}>
                  <FiTrendingUp /> Generate Report
                </button>
                <button className="btn btn-secondary" onClick={() => handleExport('PDF')}>
                  <FiDownload /> Export PDF
                </button>
                <button className="btn btn-secondary" onClick={() => handleExport('Excel')}>
                  📊 Export Excel
                </button>
                <button className="btn btn-secondary" onClick={handleScheduleReport}>
                  <FiCalendar /> Schedule Report
                </button>
              </div>
            </motion.div>

            {/* KPI Cards Section */}
            <motion.div 
              className="kpi-cards-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="kpi-grid">
                {kpiCards.map((card, idx) => (
                  <motion.div 
                    key={idx}
                    className="kpi-card"
                    whileHover={{ transform: 'translateY(-5px)' }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="kpi-icon">{card.icon}</div>
                    <div className="kpi-content">
                      <div className="kpi-label">{card.label}</div>
                      <div className="kpi-value">{card.value}</div>
                    </div>
                    <div className="kpi-bar" style={{ backgroundColor: card.color }}></div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Charts Section */}
            <div className="charts-grid">
              {/* Execution Trend Chart */}
              <motion.div 
                className="chart-card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <h3 className="chart-title">📈 Execution Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={executionTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                    <XAxis dataKey="date" stroke="var(--text-secondary)" />
                    <YAxis stroke="var(--text-secondary)" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'var(--card-bg)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '8px',
                        color: 'var(--text-primary)'
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="daily" stroke="#3B82F6" strokeWidth={2} />
                    <Line type="monotone" dataKey="weekly" stroke="#8B5CF6" strokeWidth={2} />
                    <Line type="monotone" dataKey="monthly" stroke="#06B6D4" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Success vs Failure Pie Chart */}
              <motion.div 
                className="chart-card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <h3 className="chart-title">🎯 Success vs Failure</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={successFailureData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {successFailureData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'var(--card-bg)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '8px',
                        color: 'var(--text-primary)'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Most Executed Runbooks Bar Chart */}
              <motion.div 
                className="chart-card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <h3 className="chart-title">🔝 Most Executed Runbooks</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mostExecutedData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                    <XAxis dataKey="name" stroke="var(--text-secondary)" angle={-45} textAnchor="end" height={80} />
                    <YAxis stroke="var(--text-secondary)" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'var(--card-bg)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '8px',
                        color: 'var(--text-primary)'
                      }}
                    />
                    <Bar dataKey="executions" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Environment Distribution Donut Chart */}
              <motion.div 
                className="chart-card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <h3 className="chart-title">🌍 Environment Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={environmentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      innerRadius={50}
                      outerRadius={90}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {environmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'var(--card-bg)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '8px',
                        color: 'var(--text-primary)'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Execution Time Analysis */}
              <motion.div 
                className="chart-card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.6 }}
              >
                <h3 className="chart-title">⏱️ Execution Time Analysis</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={executionTimeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                    <XAxis dataKey="name" stroke="var(--text-secondary)" angle={-45} textAnchor="end" height={80} />
                    <YAxis stroke="var(--text-secondary)" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'var(--card-bg)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '8px',
                        color: 'var(--text-primary)'
                      }}
                    />
                    <Bar dataKey="avgTime" fill="#8B5CF6" />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Monthly Automation Growth */}
              <motion.div 
                className="chart-card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.7 }}
              >
                <h3 className="chart-title">📊 Monthly Automation Growth</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={monthlyGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                    <XAxis dataKey="month" stroke="var(--text-secondary)" />
                    <YAxis stroke="var(--text-secondary)" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'var(--card-bg)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '8px',
                        color: 'var(--text-primary)'
                      }}
                    />
                    <Legend />
                    <Area type="monotone" dataKey="executions" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                    <Area type="monotone" dataKey="automated" stackId="1" stroke="#22C55E" fill="#22C55E" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </motion.div>
            </div>

            {/* Time Saved Report */}
            <motion.div 
              className="time-saved-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <h2 className="section-title">💾 Time Saved Report</h2>
              <div className="time-saved-grid">
                {timeSavedData.map((item, idx) => (
                  <div key={idx} className="time-saved-card">
                    <label className="time-saved-label">{item.metric}</label>
                    <div className="time-saved-value">{item.value}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Tables Section */}
            <div className="tables-section">
              {/* Server-wise Report Table */}
              <motion.div 
                className="table-card"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.9 }}
              >
                <h2 className="section-title">🖥️ Server-wise Report</h2>
                <div className="table-responsive">
                  <table className="reports-table">
                    <thead>
                      <tr>
                        <th>Server</th>
                        <th>Total Jobs</th>
                        <th>Success</th>
                        <th>Failed</th>
                        <th>Last Run</th>
                      </tr>
                    </thead>
                    <tbody>
                      {serverWiseData.map((row, idx) => (
                        <tr key={idx}>
                          <td>{row.server}</td>
                          <td>{row.totalJobs}</td>
                          <td><span className="status-badge success">{row.success}</span></td>
                          <td><span className="status-badge failed">{row.failed}</span></td>
                          <td>{row.lastRun}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>

              {/* Failed Execution Report Table */}
              <motion.div 
                className="table-card"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 1.0 }}
              >
                <h2 className="section-title">❌ Failed Execution Report</h2>
                <div className="table-responsive">
                  <table className="reports-table">
                    <thead>
                      <tr>
                        <th>Runbook</th>
                        <th>Server</th>
                        <th>Error</th>
                        <th>Time</th>
                        <th>User</th>
                      </tr>
                    </thead>
                    <tbody>
                      {failedExecutionDataWithErrors.length > 0 ? (
                        failedExecutionDataWithErrors.map((row, idx) => (
                          <tr key={idx} className="failed-row">
                            <td>{row.runbook}</td>
                            <td>{row.server}</td>
                            <td><span className="error-badge">{row.error}</span></td>
                            <td>{row.time}</td>
                            <td>{row.user}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '20px' }}>
                            No failed executions found with current filters
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>

              {/* Recent Execution Report Table */}
              <motion.div 
                className="table-card"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 1.1 }}
              >
                <h2 className="section-title">📋 Recent Executions</h2>
                <div className="table-responsive">
                  <table className="reports-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Runbook</th>
                        <th>Server</th>
                        <th>Status</th>
                        <th>Duration</th>
                        <th>User</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentExecutionData.length > 0 ? (
                        recentExecutionData.map((row, idx) => (
                          <tr key={idx}>
                            <td>{row.date}</td>
                            <td>{row.runbook}</td>
                            <td>{row.server}</td>
                            <td>
                              <span className={`status-badge ${row.status.toLowerCase()}`}>
                                {row.status === 'Success' && <FiCheck size={14} />} {row.status}
                              </span>
                            </td>
                            <td>{row.duration}</td>
                            <td>{row.user}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '20px' }}>
                            No executions found with current filters
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Reports;
