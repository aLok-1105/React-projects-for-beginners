import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import apiService from '../services/api.js';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const eventsData = await apiService.getEvents();
        setEvents(eventsData);
        setError('');
      } catch (err) {
        setError('Failed to load events. Please try again.');
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const categories = ['All', ...new Set(events.map(event => event.category))];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Default cover images for different categories
  const getDefaultCover = (category) => {
    const covers = {
      'Music': 'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1600&auto=format&fit=crop',
      'Community': 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1600&auto=format&fit=crop',
      'Food': 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?q=80&w=1600&auto=format&fit=crop',
      'Film': 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1600&auto=format&fit=crop',
      'Tech': 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop',
      'Art': 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1600&auto=format&fit=crop',
      'Fitness': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1600&auto=format&fit=crop',
      'General': 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1600&auto=format&fit=crop'
    };
    return covers[category] || covers['General'];
  };

  if (loading) {
    return (
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              border: '4px solid var(--muted)', 
              borderTop: '4px solid var(--primary)', 
              borderRadius: '50%', 
              animation: 'spin 1s linear infinite',
              margin: '0 auto 1rem'
            }}></div>
            <p style={{ color: 'var(--muted)' }}>Loading events...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section">
        <div className="container">
          <div className="card glass" style={{ padding: '2rem', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: 'var(--danger)' }}>Error Loading Events</h3>
            <p style={{ color: 'var(--muted)', margin: '0 0 1.5rem 0' }}>{error}</p>
            <button 
              className="btn btn-primary" 
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        {/* Header with Search and Filters */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h2 style={{ margin: '0 0 8px 0' }}>All Events</h2>
            <p style={{ color: 'var(--muted)', margin: 0 }}>Discover amazing events happening around you</p>
          </div>
          <div style={{ display:'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <input 
              className="input" 
              placeholder="Search events, locations..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ minWidth: '250px' }}
            />
            <select 
              className="input" 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ minWidth: '120px' }}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <Link to="/create-event" className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>
              + Create Event
            </Link>
          </div>
        </div>

        {/* Results Count */}
        <div style={{ marginBottom: 20 }}>
          <span style={{ color: 'var(--muted)' }}>
            Showing {filteredEvents.length} of {events.length} events
          </span>
        </div>

        {/* Events Grid */}
        <div className="grid">
          {filteredEvents.map((event) => (
            <article key={event._id} className="card event-card glass">
              <div style={{ position: 'relative' }}>
                <img 
                  className="cover" 
                  src={event.cover || getDefaultCover(event.category)} 
                  alt={event.title} 
                />
                <div style={{ 
                  position: 'absolute', 
                  top: 12, 
                  right: 12, 
                  background: 'rgba(0,0,0,0.7)', 
                  color: 'white', 
                  padding: '4px 8px', 
                  borderRadius: '6px', 
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  {formatDate(event.date)}
                </div>
                <div style={{ 
                  position: 'absolute', 
                  top: 12, 
                  left: 12 
                }}>
                  <span className="badge badge-cyan">{event.category}</span>
                </div>
              </div>
              <div className="body">
                <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', lineHeight: '1.3' }}>{event.title}</h3>
                <p style={{ 
                  color: 'var(--muted)', 
                  fontSize: '14px', 
                  margin: '0 0 12px 0',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {event.description}
                </p>
                
                {/* Event Details */}
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '6px', 
                  marginBottom: '16px',
                  fontSize: '13px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--muted)' }}>
                    <span>📍</span>
                    <span>{event.location.city}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--muted)' }}>
                    <span>🕒</span>
                    <span>{formatTime(event.date)}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--muted)' }}>
                    <span>👥</span>
                    <span>{event.attendees ? event.attendees.length : 0} going</span>
                  </div>
                  {event.organizer && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--muted)' }}>
                      <span>👤</span>
                      <span>by {event.organizer.username || event.organizer.name || 'Unknown'}</span>
                    </div>
                  )}
                </div>

                <Link 
                  to={`/event/${event._id}`} 
                  className="btn btn-primary" 
                  style={{ width: '100%', textAlign: 'center' }}
                >
                  View Details
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* No Results */}
        {filteredEvents.length === 0 && !loading && (
          <div className="card glass" style={{ padding: 40, textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 12px 0' }}>No events found</h3>
            <p style={{ color: 'var(--muted)', margin: '0 0 20px 0' }}>
              {events.length === 0 
                ? "No events have been created yet. Be the first to create one!"
                : "Try adjusting your search terms or category filter"
              }
            </p>
            {events.length === 0 ? (
              <Link to="/create-event" className="btn btn-primary">
                Create First Event
              </Link>
            ) : (
            <button 
              className="btn btn-ghost" 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
            >
              Clear Filters
            </button>
            )}
          </div>
        )}
      </div>
      
      {/* Add CSS for loading spinner */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  )
}

export default Events