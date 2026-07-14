import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const [expandedItems, setExpandedItems] = useState({
    runbooks: true,
    admin: false
  });

  const toggleExpand = (item) => {
    setExpandedItems(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '📊',
      path: '/dashboard',
      submenu: null
    },
    {
      id: 'runbooks',
      label: 'Runbooks',
      icon: '📚',
      submenu: [
        { label: 'Executed Runbooks', icon: '▶️', path: '/runbook' },
        { label: 'Runbook Library', icon: '🔖', path: '/runbook-library' }
      ]
    },
    {
      id: 'services',
      label: 'Services',
      icon: '⚙️',
      path: '/services',
      submenu: null
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: '📈',
      path: '/reports',
      submenu: null
    },
    {
      id: 'admin',
      label: 'Admin',
      icon: '🔐',
      submenu: [
        { label: 'Settings', icon: '⚙️', path: '/settings' },
        { label: 'Users', icon: '👥', path: '/users' },
        { label: 'Audit Log', icon: '📝', path: '/audit-log' }
      ]
    }
  ];

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${!isOpen ? 'closed' : ''}`}>
        <div className="sidebar-header">
          <h2>🚀 Runbook</h2>
          <button 
            className="sidebar-close-btn"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <div key={item.id} className="nav-item-wrapper">
              {item.submenu ? (
                <>
                  <button
                    className="nav-item nav-parent"
                    onClick={() => toggleExpand(item.id)}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.label}</span>
                    <span className={`nav-arrow ${expandedItems[item.id] ? 'expanded' : ''}`}>
                      ›
                    </span>
                  </button>

                  {expandedItems[item.id] && (
                    <div className="nav-submenu">
                      {item.submenu.map((subitem, idx) => (
                        <button
                          key={idx}
                          className="nav-item nav-child"
                          onClick={() => handleNavigate(subitem.path)}
                        >
                          <span className="nav-icon">{subitem.icon}</span>
                          <span className="nav-label">{subitem.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <button
                  className="nav-item"
                  onClick={() => handleNavigate(item.path)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </button>
              )}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <p>v1.0.0</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
