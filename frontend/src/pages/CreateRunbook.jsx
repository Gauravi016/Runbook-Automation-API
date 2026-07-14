import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Sidebar from '../components/Sidebar';
import '../styles/CreateRunbook.css';

const CreateRunbook = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Maintenance',
    owner: user?.username || 'Admin',
    tags: '',
    schedule: 'manual',
    scheduleTime: '',
    scriptContent: '',
    scriptLanguage: 'bash',
    notifications: {
      onSuccess: false,
      onFailure: false,
      email: ''
    }
  });

  const [errors, setErrors] = useState({});

  const categories = ['Maintenance', 'Database', 'Infrastructure', 'Deployment', 'Data', 'Security', 'Monitoring'];
  const languages = ['bash', 'python', 'powershell', 'nodejs', 'sql'];
  const schedules = ['manual', 'daily', 'weekly', 'monthly', 'hourly'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [name]: type === 'checkbox' ? checked : value
      }
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Runbook name is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.scriptContent.trim()) {
      newErrors.scriptContent = 'Script content is required';
    }
    if (formData.notifications.onSuccess || formData.notifications.onFailure) {
      if (!formData.notifications.email.trim()) {
        newErrors.email = 'Email is required for notifications';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.notifications.email)) {
        newErrors.email = 'Invalid email format';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Parse tags
    const tagsArray = formData.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    const newRunbook = {
      id: Math.floor(Math.random() * 10000),
      name: formData.name,
      description: formData.description,
      category: formData.category,
      owner: formData.owner,
      status: 'Pending',
      version: '1.0.0',
      lastUpdated: new Date().toISOString().split('T')[0],
      tags: tagsArray,
      schedule: formData.schedule,
      scriptContent: formData.scriptContent,
      scriptLanguage: formData.scriptLanguage,
      notifications: formData.notifications
    };

    console.log('Creating runbook:', newRunbook);
    
    // Show success message
    alert(`Runbook "${formData.name}" created successfully!`);
    
    // Navigate back to library
    navigate('/runbook-library');
  };

  const handleCancel = () => {
    navigate('/runbook-library');
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
          <h1 className="layout-title">Create New Runbook</h1>
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

        <main className="layout-content create-runbook-page">
          <div className="create-runbook-container">
            <form onSubmit={handleSubmit} className="create-runbook-form">
              {/* Basic Information Section */}
              <section className="form-section">
                <h2>Basic Information</h2>
                
                <div className="form-group">
                  <label htmlFor="name">Runbook Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter runbook name"
                    className={errors.name ? 'error' : ''}
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="description">Description *</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter a detailed description of what this runbook does"
                    rows="4"
                    className={errors.description ? 'error' : ''}
                  />
                  {errors.description && <span className="error-message">{errors.description}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="tags">Tags (comma-separated)</label>
                    <input
                      type="text"
                      id="tags"
                      name="tags"
                      value={formData.tags}
                      onChange={handleInputChange}
                      placeholder="e.g., production, backup, critical"
                    />
                  </div>
                </div>
              </section>

              {/* Script Section */}
              <section className="form-section">
                <h2>Script Configuration</h2>
                
                <div className="form-group">
                  <label htmlFor="scriptLanguage">Script Language</label>
                  <select
                    id="scriptLanguage"
                    name="scriptLanguage"
                    value={formData.scriptLanguage}
                    onChange={handleInputChange}
                  >
                    {languages.map(lang => (
                      <option key={lang} value={lang}>{lang.toUpperCase()}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="scriptContent">Script Content *</label>
                  <textarea
                    id="scriptContent"
                    name="scriptContent"
                    value={formData.scriptContent}
                    onChange={handleInputChange}
                    placeholder="Enter your script code here..."
                    rows="10"
                    className={`script-editor ${errors.scriptContent ? 'error' : ''}`}
                  />
                  {errors.scriptContent && <span className="error-message">{errors.scriptContent}</span>}
                </div>
              </section>

              {/* Schedule Section */}
              <section className="form-section">
                <h2>Schedule & Automation</h2>
                
                <div className="form-group">
                  <label htmlFor="schedule">Execution Schedule</label>
                  <select
                    id="schedule"
                    name="schedule"
                    value={formData.schedule}
                    onChange={handleInputChange}
                  >
                    {schedules.map(sched => (
                      <option key={sched} value={sched}>
                        {sched.charAt(0).toUpperCase() + sched.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {formData.schedule !== 'manual' && (
                  <div className="form-group">
                    <label htmlFor="scheduleTime">Execution Time</label>
                    <input
                      type="time"
                      id="scheduleTime"
                      name="scheduleTime"
                      value={formData.scheduleTime}
                      onChange={handleInputChange}
                    />
                  </div>
                )}
              </section>

              {/* Notifications Section */}
              <section className="form-section">
                <h2>Notifications</h2>
                
                <div className="notification-options">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="onSuccess"
                      checked={formData.notifications.onSuccess}
                      onChange={handleNotificationChange}
                    />
                    <span>Notify on Success</span>
                  </label>

                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="onFailure"
                      checked={formData.notifications.onFailure}
                      onChange={handleNotificationChange}
                    />
                    <span>Notify on Failure</span>
                  </label>
                </div>

                {(formData.notifications.onSuccess || formData.notifications.onFailure) && (
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.notifications.email}
                      onChange={handleNotificationChange}
                      placeholder="your.email@example.com"
                      className={errors.email ? 'error' : ''}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>
                )}
              </section>

              {/* Form Actions */}
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  Create Runbook
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreateRunbook;
