import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Sidebar from '../components/Sidebar';
import '../styles/RunbookDetails.css';

const RunbookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [runbook, setRunbook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRunbookDetails();
  }, [id]);

  const fetchRunbookDetails = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call: GET /api/runbooks/{id}
      const mockData = {
        id: parseInt(id),
        name: 'Database Backup',
        status: 'Success',
        description: 'Daily backup of production database',
        owner: 'Admin',
        lastExecuted: '2024-07-14 10:30 AM',
        nextScheduled: '2024-07-15 02:00 AM',
        executionCount: 145,
        createdDate: '2024-01-15',
        version: '2.1.0',
        tags: ['backup', 'database', 'production'],
        overview: {
          purpose: 'Automated daily backup of production database to ensure data recovery capability',
          frequency: 'Daily at 2:00 AM UTC',
          estimatedDuration: '45 minutes',
          lastSuccessful: '2024-07-14 10:30 AM',
          successRate: '99.2%',
          averageExecutionTime: '42 minutes'
        },
        workflow: [
          { step: 1, name: 'Pre-Backup Validation', status: 'completed', duration: '2 min' },
          { step: 2, name: 'Database Snapshot', status: 'completed', duration: '15 min' },
          { step: 3, name: 'Compression', status: 'completed', duration: '20 min' },
          { step: 4, name: 'Upload to S3', status: 'completed', duration: '8 min' },
          { step: 5, name: 'Verification', status: 'completed', duration: '3 min' }
        ],
        scripts: [
          {
            id: 1,
            name: 'pre_backup.sh',
            language: 'bash',
            content: '#!/bin/bash\necho "Starting pre-backup validation..."\n# Validation logic here'
          },
          {
            id: 2,
            name: 'backup_executor.py',
            language: 'python',
            content: 'import subprocess\nimport os\n# Backup execution logic'
          }
        ],
        executionHistory: [
          { date: '2024-07-14', time: '10:30 AM', status: 'Success', duration: '45 min', details: 'Backup completed successfully' },
          { date: '2024-07-13', time: '02:00 AM', status: 'Success', duration: '43 min', details: 'Backup completed successfully' },
          { date: '2024-07-12', time: '02:00 AM', status: 'Success', duration: '44 min', details: 'Backup completed successfully' },
          { date: '2024-07-11', time: '02:00 AM', status: 'Failed', duration: '5 min', details: 'Connection timeout' },
          { date: '2024-07-10', time: '02:00 AM', status: 'Success', duration: '46 min', details: 'Backup completed successfully' }
        ],
        schedules: [
          { id: 1, name: 'Daily Backup', frequency: 'Daily', time: '02:00 AM UTC', active: true },
          { id: 2, name: 'Weekly Full Backup', frequency: 'Weekly', day: 'Sunday', time: '11:00 PM UTC', active: true }
        ],
        approvals: [
          { id: 1, approver: 'John Doe', status: 'Approved', date: '2024-07-10', comment: 'Looks good' },
          { id: 2, approver: 'Jane Smith', status: 'Approved', date: '2024-07-10', comment: 'Approved for production' }
        ],
        parameters: [
          { name: 'DATABASE_HOST', value: 'prod-db.example.com', type: 'string', required: true },
          { name: 'BACKUP_RETENTION_DAYS', value: '30', type: 'integer', required: false },
          { name: 'ENABLE_COMPRESSION', value: 'true', type: 'boolean', required: false },
          { name: 'S3_BUCKET', value: 'backups-prod', type: 'string', required: true }
        ]
      };
      setRunbook(mockData);
      setError(null);
    } catch (err) {
      setError('Failed to fetch runbook details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="runbook-details-container"><p>Loading runbook details...</p></div>;
  }

  if (error || !runbook) {
    return (
      <div className="layout-wrapper">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        <div className="layout-main">
          <header className="layout-header">
            <button className="layout-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
            <h1 className="layout-title">Runbook Details</h1>
            <div className="layout-user">
              <span className="user-info">Welcome, {user?.username}</span>
              <button className="logout-button" onClick={() => { logout(); navigate('/login'); }}>Logout</button>
            </div>
          </header>
          <main className="layout-content">
            <div className="error-message">{error || 'Runbook not found'}</div>
            <button className="btn btn-primary" onClick={() => navigate('/runbook')}>
              Back to Runbooks
            </button>
          </main>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
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
          <h1 className="layout-title">Runbook Details</h1>
          <div className="layout-user">
            <button 
              className="theme-toggle-btn" 
              onClick={toggleTheme}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <span className="user-info">Welcome, {user?.username}</span>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>

        <main className="layout-content">
          <div className="runbook-details-container-inner">
      <div className="details-header">
        <button className="btn btn-back" onClick={() => navigate('/runbook')}>
          ← Back
        </button>
        <div className="header-content">
          <h1>{runbook.name}</h1>
          <span className={`status-badge status-${runbook.status.toLowerCase()}`}>
            {runbook.status}
          </span>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary">Execute</button>
          <button className="btn btn-secondary">Clone</button>
          <button className="btn btn-secondary">Edit</button>
        </div>
      </div>

      <div className="metadata-bar">
        <div className="metadata-item">
          <label>Owner</label>
          <span>{runbook.owner}</span>
        </div>
        <div className="metadata-item">
          <label>Version</label>
          <span>{runbook.version}</span>
        </div>
        <div className="metadata-item">
          <label>Created</label>
          <span>{runbook.createdDate}</span>
        </div>
        <div className="metadata-item">
          <label>Success Rate</label>
          <span>{runbook.overview.successRate}</span>
        </div>
      </div>

      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab ${activeTab === 'workflow' ? 'active' : ''}`}
          onClick={() => setActiveTab('workflow')}
        >
          Steps/Workflow
        </button>
        <button 
          className={`tab ${activeTab === 'scripts' ? 'active' : ''}`}
          onClick={() => setActiveTab('scripts')}
        >
          Script Editor
        </button>
        <button 
          className={`tab ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          Execution History
        </button>
        <button 
          className={`tab ${activeTab === 'schedules' ? 'active' : ''}`}
          onClick={() => setActiveTab('schedules')}
        >
          Schedules
        </button>
        <button 
          className={`tab ${activeTab === 'approvals' ? 'active' : ''}`}
          onClick={() => setActiveTab('approvals')}
        >
          Approval History
        </button>
        <button 
          className={`tab ${activeTab === 'parameters' ? 'active' : ''}`}
          onClick={() => setActiveTab('parameters')}
        >
          Parameters
        </button>
        <button 
          className={`tab ${activeTab === 'tags' ? 'active' : ''}`}
          onClick={() => setActiveTab('tags')}
        >
          Tags
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'overview' && (
          <div className="overview-tab">
            <h2>Runbook Overview</h2>
            <p className="description">{runbook.description}</p>
            <div className="overview-grid">
              <div className="overview-card">
                <h3>Purpose</h3>
                <p>{runbook.overview.purpose}</p>
              </div>
              <div className="overview-card">
                <h3>Frequency</h3>
                <p>{runbook.overview.frequency}</p>
              </div>
              <div className="overview-card">
                <h3>Estimated Duration</h3>
                <p>{runbook.overview.estimatedDuration}</p>
              </div>
              <div className="overview-card">
                <h3>Average Execution Time</h3>
                <p>{runbook.overview.averageExecutionTime}</p>
              </div>
              <div className="overview-card">
                <h3>Last Successful Run</h3>
                <p>{runbook.overview.lastSuccessful}</p>
              </div>
              <div className="overview-card">
                <h3>Success Rate</h3>
                <p>{runbook.overview.successRate}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'workflow' && (
          <div className="workflow-tab">
            <h2>Steps/Workflow</h2>
            <div className="workflow-steps">
              {runbook.workflow.map((step, index) => (
                <div key={index} className="workflow-step">
                  <div className="step-number">{step.step}</div>
                  <div className="step-content">
                    <h4>{step.name}</h4>
                    <span className={`step-status status-${step.status}`}>{step.status}</span>
                    <span className="step-duration">{step.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'scripts' && (
          <div className="scripts-tab">
            <h2>Script Editor</h2>
            {runbook.scripts.map((script) => (
              <div key={script.id} className="script-section">
                <div className="script-header">
                  <h4>{script.name}</h4>
                  <span className="language-badge">{script.language}</span>
                </div>
                <pre className="script-content">{script.content}</pre>
                <div className="script-actions">
                  <button className="btn btn-small">Edit</button>
                  <button className="btn btn-small">Copy</button>
                  <button className="btn btn-small">Download</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="history-tab">
            <h2>Execution History</h2>
            <table className="history-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Duration</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {runbook.executionHistory.map((execution, index) => (
                  <tr key={index}>
                    <td>{execution.date}</td>
                    <td>{execution.time}</td>
                    <td><span className={`status-badge status-${execution.status.toLowerCase()}`}>{execution.status}</span></td>
                    <td>{execution.duration}</td>
                    <td>{execution.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'schedules' && (
          <div className="schedules-tab">
            <h2>Schedules</h2>
            <table className="schedules-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Frequency</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {runbook.schedules.map((schedule) => (
                  <tr key={schedule.id}>
                    <td>{schedule.name}</td>
                    <td>{schedule.frequency}</td>
                    <td>{schedule.time}</td>
                    <td><span className={`active-badge ${schedule.active ? 'active' : 'inactive'}`}>{schedule.active ? 'Active' : 'Inactive'}</span></td>
                    <td>
                      <button className="btn btn-small">Edit</button>
                      <button className="btn btn-small">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'approvals' && (
          <div className="approvals-tab">
            <h2>Approval History</h2>
            {runbook.approvals.map((approval) => (
              <div key={approval.id} className="approval-card">
                <div className="approval-header">
                  <h4>{approval.approver}</h4>
                  <span className={`approval-status ${approval.status.toLowerCase()}`}>{approval.status}</span>
                </div>
                <p className="approval-date">Date: {approval.date}</p>
                <p className="approval-comment">{approval.comment}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'parameters' && (
          <div className="parameters-tab">
            <h2>Parameters</h2>
            <table className="parameters-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Value</th>
                  <th>Required</th>
                </tr>
              </thead>
              <tbody>
                {runbook.parameters.map((param, index) => (
                  <tr key={index}>
                    <td>{param.name}</td>
                    <td><span className="type-badge">{param.type}</span></td>
                    <td><code>{param.value}</code></td>
                    <td>{param.required ? '✓' : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'tags' && (
          <div className="tags-tab">
            <h2>Tags</h2>
            <div className="tags-container">
              {runbook.tags.map((tag, index) => (
                <span key={index} className="tag-badge">{tag}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
        </main>
      </div>
    </div>
  );
};

export default RunbookDetails;
