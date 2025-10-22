import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, isAuthenticated, logout, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, loading, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) {
    return (
      <section className="section">
        <div className="container">
          <div className="card glass" style={{ padding: 40, textAlign: 'center' }}>
            <div style={{ fontSize: '18px', color: 'var(--muted)' }}>Loading...</div>
          </div>
        </div>
      </section>
    );
  }

  if (!user) {
  return (
      <section className="section">
        <div className="container">
          <div className="card glass" style={{ padding: 40, textAlign: 'center' }}>
            <h2>Please log in to view your profile</h2>
            <button className="btn btn-primary" onClick={() => navigate('/login')}>
              Go to Login
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        {/* Profile Header */}
        <div className="card glass" style={{ padding: 32, marginBottom: 24 }}>
          <div style={{ display:'flex', alignItems:'center', gap: 20, flexWrap: 'wrap' }}>
            <div style={{ position: 'relative' }}>
              <img 
                alt="avatar" 
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=8b5cf6&color=fff&size=120`} 
                style={{ 
                  width: 120, 
                  height: 120, 
                  borderRadius: 20, 
                  objectFit: 'cover',
                  border: '3px solid var(--accent-purple)',
                  boxShadow: '0 8px 24px rgba(139,92,246,.25)'
                }} 
              />
              <div style={{
                position: 'absolute',
                bottom: 8,
                right: 8,
                width: 24,
                height: 24,
                borderRadius: '50%',
                background: 'var(--accent-lime)',
                border: '3px solid var(--bg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                color: 'var(--bg)',
                fontWeight: 'bold'
              }}>
                ✓
              </div>
            </div>
            
            <div style={{ flex: 1, minWidth: '200px' }}>
              <h1 style={{ margin: '0 0 8px 0', fontSize: '32px', fontWeight: '700' }}>
                {user.name}
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ color: 'var(--muted)' }}>@</span>
                <span style={{ color: 'var(--accent-cyan)', fontWeight: '600' }}>{user.username}</span>
              </div>
              <div style={{ color: 'var(--muted)', marginBottom: 16 }}>
                {user.email}
              </div>
              <div className="badge badge-cyan" style={{ marginBottom: 16 }}>
                BuzzHub Member
              </div>
            </div>
            
            <div style={{ display:'flex', gap: 12, flexWrap: 'wrap' }}>
              <button className="btn btn-ghost" onClick={() => navigate('/events')}>
                Browse Events
              </button>
              <button className="btn btn-primary" onClick={() => navigate('/events')}>
                Create Event
              </button>
              <button className="btn" onClick={handleLogout} style={{ 
                background: 'rgba(255, 88, 182, 0.1)', 
                borderColor: 'var(--accent-pink)',
                color: 'var(--accent-pink)'
              }}>
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Profile Stats - updated, removed Events Attended, dynamic counts */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
          <div className="card glass" style={{ padding: 20, textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--accent-purple)', marginBottom: 4 }}>
              {user?.eventsCreatedCount ?? 0}
            </div>
            <div style={{ color: 'var(--muted)', fontSize: '14px' }}>Events Created</div>
          </div>
          <div className="card glass" style={{ padding: 20, textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--accent-lime)', marginBottom: 4 }}>
              {user?.reviewsWrittenCount ?? 0}
            </div>
            <div style={{ color: 'var(--muted)', fontSize: '14px' }}>Reviews Written</div>
          </div>
          <div className="card glass" style={{ padding: 20, textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--accent-amber)', marginBottom: 4 }}>0</div>
            <div style={{ color: 'var(--muted)', fontSize: '14px' }}>Connections</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {[
            { 
              title: 'My Bookmarks', 
              description: 'Events you\'ve saved for later',
              cover: 'https://images.unsplash.com/photo-1521337581557-3a57b4a8c62a?q=80&w=1200&auto=format&fit=crop',
              action: 'View Bookmarks',
              color: 'var(--accent-cyan)'
            },
            { 
              title: 'Going Next', 
              description: 'Upcoming events you\'re attending',
              cover: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop',
              action: 'View Events',
              color: 'var(--accent-purple)'
            },
            { 
              title: 'Past Events', 
              description: 'Events you\'ve attended recently',
              cover: 'https://images.unsplash.com/photo-1505238680356-667803448bb6?q=80&w=1200&auto=format&fit=crop',
              action: 'View History',
              color: 'var(--accent-lime)'
            }
          ].map((item, i) => (
            <article key={i} className="card event-card glass" style={{ cursor: 'pointer' }}>
              <div style={{ position: 'relative' }}>
                <img className="cover" src={item.cover} alt={item.title} />
                <div style={{ 
                  position: 'absolute', 
                  top: 12, 
                  left: 12,
                  background: item.color,
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  {item.action}
                </div>
              </div>
              <div className="body">
                <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>{item.title}</h3>
                <p style={{ 
                  color: 'var(--muted)', 
                  fontSize: '14px', 
                  margin: '0 0 12px 0',
                  lineHeight: '1.4'
                }}>
                  {item.description}
                </p>
                <button 
                  className="btn btn-ghost" 
                  style={{ width: '100%' }}
                  onClick={() => navigate('/events')}
                >
                  {item.action}
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Account Information */}
        <div className="card glass" style={{ padding: 24, marginTop: 24 }}>
          <h3 style={{ margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
            🔐 Account Information
          </h3>
          <div style={{ display: 'grid', gap: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--muted)' }}>User ID:</span>
              <span style={{ fontFamily: 'monospace', fontSize: '12px' }}>{user._id}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--muted)' }}>Member Since:</span>
              <span>Just now</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--muted)' }}>Account Status:</span>
              <span className="badge badge-cyan">Active</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;