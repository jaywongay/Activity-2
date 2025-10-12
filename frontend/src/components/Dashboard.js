import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { notesAPI } from '../services/api';
import './Dashboard.css';

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedColor, setSelectedColor] = useState('default');
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  const colors = [
    { name: 'default', gradient: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)' },
    { name: 'blue', gradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(37, 99, 235, 0.15) 100%)' },
    { name: 'green', gradient: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(22, 163, 74, 0.15) 100%)' },
    { name: 'purple', gradient: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(147, 51, 234, 0.15) 100%)' },
    { name: 'pink', gradient: 'linear-gradient(135deg, rgba(236, 72, 153, 0.15) 0%, rgba(219, 39, 119, 0.15) 100%)' },
    { name: 'orange', gradient: 'linear-gradient(135deg, rgba(249, 115, 22, 0.15) 0%, rgba(234, 88, 12, 0.15) 100%)' },
  ];

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const mainContent = document.querySelector('.main-content');
      if (mainContent) {
        const rect = mainContent.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        mainContent.style.setProperty('--mouse-x', `${x}px`);
        mainContent.style.setProperty('--mouse-y', `${y}px`);
      }
    };

    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      mainContent.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (mainContent) {
        mainContent.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await notesAPI.getAll();
      setNotes(response.data.map(note => ({
        ...note,
        color: note.color || 'default'
      })));
    } catch (err) {
      if (err.response?.status === 401) {
        handleLogout();
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  const openModal = (note = null) => {
    if (note) {
      setEditingNote(note);
      setTitle(note.title);
      setContent(note.content);
      setSelectedColor(note.color || 'default');
    } else {
      setEditingNote(null);
      setTitle('');
      setContent('');
      setSelectedColor('default');
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingNote(null);
    setTitle('');
    setContent('');
    setSelectedColor('default');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingNote) {
        await notesAPI.update(editingNote.id, title, content, selectedColor);
      } else {
        await notesAPI.create(title, content, selectedColor);
      }
      fetchNotes();
      closeModal();
    } catch (err) {
      console.error('Error:', err.response?.data || err.message);
      const errorMessage = err.response?.data?.message || 'Error saving note. Please try again.';
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await notesAPI.delete(id);
        fetchNotes();
      } catch (err) {
        alert('Error deleting note. Please try again.');
      }
    }
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedNotes = [...filteredNotes].sort((a, b) => {
    return new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt);
  });

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    const time = date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true
    });
    
    if (days === 0) return `Today at ${time}`;
    if (days === 1) return `Yesterday at ${time}`;
    if (days < 7) return `${days} days ago at ${time}`;
    
    const dateStr = date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
    
    return `${dateStr} at ${time}`;
  };

  const getColorGradient = (colorName) => {
    const color = colors.find(c => c.name === colorName);
    return color ? color.gradient : colors[0].gradient;
  };

  return (
    <div className="app-wrapper">
      <div className="background-effects">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      <div className="app-container">
        <aside className="sidebar">
          <div className="sidebar-header">
            <div className="logo">
              <div className="logo-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="5" y="2" width="14" height="20" rx="2" stroke="white" strokeWidth="1.5"/>
                  <path d="M9 2V6M15 2V6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="8" y1="10" x2="16" y2="10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="8" y1="14" x2="16" y2="14" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="8" y1="18" x2="13" y2="18" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="logo-text">My Notes</span>
            </div>
          </div>

          <div className="sidebar-content">
            <button className="create-btn" onClick={() => openModal()}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 3v12M3 9h12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
              <span>Create Note</span>
            </button>

            <nav className="sidebar-nav">
              <div className="nav-section">
                <div className="nav-label">Workspace</div>
                <button className="nav-item active">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <rect x="3" y="3" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                    <rect x="10" y="3" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                    <rect x="3" y="10" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                    <rect x="10" y="10" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  <span>All Notes</span>
                  <span className="nav-badge">{notes.length}</span>
                </button>
              </div>
            </nav>
          </div>

          <div className="sidebar-footer">
            <div className="user-card">
              <div className="user-avatar">
                <div className="avatar-inner">{username?.charAt(0).toUpperCase()}</div>
                <div className="status-indicator"></div>
              </div>
              <div className="user-details">
                <div className="user-name">{username}</div>
              </div>
              <button className="user-menu" onClick={handleLogout} title="Logout">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M7 15H4a1 1 0 01-1-1V4a1 1 0 011-1h3M12 12l3-3-3-3M15 9H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </aside>

        <main className="main-content">
          {notes.length > 0 && (
            <header className="content-header">
              <div className="search-container">
                <svg className="search-icon" width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="8" cy="8" r="5" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M12 12l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search notes by title or content..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button className="search-clear" onClick={() => setSearchQuery('')}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M11 3L3 11M3 3l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                )}
              </div>
            </header>
          )}

          {sortedNotes.length === 0 ? (
            <div className="empty-state">
              <h2 className="empty-title">
                {searchQuery ? 'No matching notes found' : 'Your canvas awaits'}
              </h2>
              <p className="empty-description">
                {searchQuery 
                  ? 'Try different keywords or create a new note'
                  : 'Start capturing your thoughts, ideas, and inspirations'}
              </p>
              {!searchQuery && (
                <button className="empty-action" onClick={() => openModal()}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M9 3v12M3 9h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Create Your First Note
                </button>
              )}
            </div>
          ) : (
            <div className="notes-container grid">
              {sortedNotes.map((note, index) => (
                <article 
                  key={note.id} 
                  className="note-card"
                  style={{ 
                    animationDelay: `${index * 0.05}s`,
                    background: getColorGradient(note.color)
                  }}
                  onClick={() => openModal(note)}
                >
                  <div className="note-content">
                    <h3 className="note-title">{note.title}</h3>
                    <p className="note-text">{note.content}</p>
                  </div>
                  <div className="note-meta">
                    <span className="note-date">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1"/>
                        <path d="M6 3v3l2 2" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                      </svg>
                      {formatDateTime(note.updatedAt || note.createdAt)}
                    </span>
                    <button 
                      className="note-delete-btn"
                      onClick={(e) => handleDelete(note.id, e)}
                      title="Delete note"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M5 2h4M2 4h10M3 4l1 8h6l1-8M5 6v4M9 6v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                      </svg>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </main>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">{editingNote ? 'Edit Note' : 'Create New Note'}</h2>
              <button className="modal-close-btn" onClick={closeModal}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-body">
              <div className="form-group">
                <input
                  type="text"
                  className="title-input"
                  placeholder="Note title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  disabled={loading}
                  autoFocus
                />
              </div>

              <div className="form-group">
                <textarea
                  className="content-textarea"
                  placeholder="Start writing your note..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={closeModal}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg className="spinner" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
                        <path d="M8 2a6 6 0 016 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M13 5L6 12 3 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {editingNote ? 'Update Note' : 'Create Note'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;