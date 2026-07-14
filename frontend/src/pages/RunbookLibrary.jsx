import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Sidebar from '../components/Sidebar';
import '../styles/RunbookLibrary.css';

const RunbookLibrary = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedApprovalStatus, setSelectedApprovalStatus] = useState('All');
  const [sortBy, setSortBy] = useState('name');

  const [runbooks] = useState([
    {
      id: 1,
      name: 'Database Backup',
      category: 'Database',
      owner: 'Admin',
      status: 'Approved',
      version: '2.1.0',
      lastUpdated: '2024-07-14',
      description: 'Daily backup of production database',
      tags: ['backup', 'database', 'production']
    },
    {
      id: 2,
      name: 'Server Health Check',
      category: 'Infrastructure',
      owner: 'DevOps Team',
      status: 'Approved',
      version: '1.5.2',
      lastUpdated: '2024-07-10',
      description: 'Monitor server health and resources',
      tags: ['monitoring', 'health', 'servers']
    },
    {
      id: 3,
      name: 'Deploy Release',
      category: 'Deployment',
      owner: 'Dev Team',
      status: 'Pending',
      version: '1.0.0',
      lastUpdated: '2024-07-12',
      description: 'Deploy new release to production',
      tags: ['deployment', 'release', 'production']
    },
    {
      id: 4,
      name: 'Cache Cleanup',
      category: 'Maintenance',
      owner: 'Infrastructure',
      status: 'Approved',
      version: '3.0.1',
      lastUpdated: '2024-07-11',
      description: 'Clear expired cache entries',
      tags: ['cache', 'cleanup', 'maintenance']
    },
    {
      id: 5,
      name: 'User Data Export',
      category: 'Data',
      owner: 'Admin',
      status: 'Approved',
      version: '2.0.0',
      lastUpdated: '2024-07-09',
      description: 'Export user data to CSV format',
      tags: ['export', 'data', 'users']
    },
    {
      id: 6,
      name: 'Log Archival',
      category: 'Maintenance',
      owner: 'DevOps Team',
      status: 'Rejected',
      version: '1.2.0',
      lastUpdated: '2024-07-08',
      description: 'Archive old log files',
      tags: ['logs', 'archival', 'maintenance']
    },
    {
      id: 7,
      name: 'SSL Certificate Renewal',
      category: 'Security',
      owner: 'Security Team',
      status: 'Approved',
      version: '2.2.0',
      lastUpdated: '2024-07-13',
      description: 'Automatic SSL certificate renewal',
      tags: ['ssl', 'certificate', 'security']
    },
    {
      id: 8,
      name: 'Database Optimization',
      category: 'Database',
      owner: 'DBA Team',
      status: 'Pending',
      version: '1.1.0',
      lastUpdated: '2024-07-14',
      description: 'Optimize database indexes and queries',
      tags: ['database', 'optimization', 'performance']
    }
  ]);

  const categories = ['All', 'Database', 'Infrastructure', 'Deployment', 'Maintenance', 'Data', 'Security'];
  const approvalStatuses = ['All', 'Approved', 'Pending', 'Rejected'];

  const filteredAndSortedRunbooks = useMemo(() => {
    let filtered = runbooks.filter(runbook => {
      const matchesSearch = runbook.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           runbook.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || runbook.category === selectedCategory;
      const matchesApproval = selectedApprovalStatus === 'All' || runbook.status === selectedApprovalStatus;

      return matchesSearch && matchesCategory && matchesApproval;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'date':
          return new Date(b.lastUpdated) - new Date(a.lastUpdated);
        case 'version':
          return b.version.localeCompare(a.version);
        case 'owner':
          return a.owner.localeCompare(b.owner);
        default:
          return 0;
      }
    });

    return filtered;
  }, [runbooks, searchTerm, selectedCategory, selectedApprovalStatus, sortBy]);

  const getApprovalStatusClass = (status) => {
    switch (status) {
      case 'Approved':
        return 'status-approved';
      case 'Pending':
        return 'status-pending';
      case 'Rejected':
        return 'status-rejected';
      default:
        return '';
    }
  };

  const handleExecute = (e, runbookId) => {
    e.stopPropagation();
    console.log('Execute runbook:', runbookId);
    // TODO: Implement execute logic
  };

  const handleEdit = (e, runbookId) => {
    e.stopPropagation();
    navigate(`/runbook/${runbookId}/edit`);
  };

  const handleDelete = (e, runbookId) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this runbook?')) {
      console.log('Delete runbook:', runbookId);
      // TODO: Implement delete logic
    }
  };

  const handleClone = (e, runbookId) => {
    e.stopPropagation();
    console.log('Clone runbook:', runbookId);
    // TODO: Implement clone logic
  };

  const handleViewDetails = (runbookId) => {
    navigate(`/runbook/${runbookId}`);
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
          <h1 className="layout-title">Runbook Library</h1>
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
          <div className="runbook-library-container-inner">
      <div className="library-header">
        <h1>Runbook Library</h1>
        <button className="btn btn-primary" onClick={() => navigate('/runbook/create')}>
          + Create New Runbook
        </button>
      </div>

      <div className="library-controls">
        {/* Search Section */}
        <div className="search-section">
          <input
            type="text"
            placeholder="Search Runbooks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Filters Section */}
        <div className="filters-section">
          <div className="filter-group">
            <label>Category</label>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Approval Status</label>
            <select 
              value={selectedApprovalStatus}
              onChange={(e) => setSelectedApprovalStatus(e.target.value)}
              className="filter-select"
            >
              {approvalStatuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Sort By</label>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="name">Name (A-Z)</option>
              <option value="date">Last Updated (Newest)</option>
              <option value="version">Version (Highest)</option>
              <option value="owner">Owner (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Info */}
      <div className="results-info">
        <p>Showing <strong>{filteredAndSortedRunbooks.length}</strong> runbooks</p>
      </div>

      {/* Runbooks Table */}
      <div className="runbooks-table-wrapper">
        {filteredAndSortedRunbooks.length > 0 ? (
          <table className="runbooks-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Owner</th>
                <th>Version</th>
                <th>Status</th>
                <th>Last Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedRunbooks.map((runbook) => (
                <tr key={runbook.id} className="runbook-row">
                  <td 
                    className="runbook-name"
                    onClick={() => handleViewDetails(runbook.id)}
                  >
                    <strong>{runbook.name}</strong>
                    <p className="runbook-description">{runbook.description}</p>
                  </td>
                  <td>
                    <span className="category-badge">{runbook.category}</span>
                  </td>
                  <td>{runbook.owner}</td>
                  <td>
                    <code>{runbook.version}</code>
                  </td>
                  <td>
                    <span className={`approval-badge ${getApprovalStatusClass(runbook.status)}`}>
                      {runbook.status}
                    </span>
                  </td>
                  <td>{runbook.lastUpdated}</td>
                  <td className="actions-cell">
                    <button 
                      className="btn btn-small btn-execute"
                      onClick={(e) => handleExecute(e, runbook.id)}
                      title="Execute runbook"
                    >
                      Execute
                    </button>
                    <button 
                      className="btn btn-small btn-clone"
                      onClick={(e) => handleClone(e, runbook.id)}
                      title="Clone runbook"
                    >
                      Clone
                    </button>
                    <button 
                      className="btn btn-small btn-edit"
                      onClick={(e) => handleEdit(e, runbook.id)}
                      title="Edit runbook"
                    >
                      Edit
                    </button>
                    <button 
                      className="btn btn-small btn-delete"
                      onClick={(e) => handleDelete(e, runbook.id)}
                      title="Delete runbook"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">
            <p>No runbooks found matching your criteria</p>
            <button 
              className="btn btn-primary"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setSelectedApprovalStatus('All');
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
          </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RunbookLibrary;
