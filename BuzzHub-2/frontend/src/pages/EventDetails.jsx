import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import apiService from '../services/api.js';

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [joined, setJoined] = useState(false);
  const [attendees, setAttendees] = useState([]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const eventData = await apiService.getEvent(id);
        setEvent(eventData);
        setAttendees(eventData.attendees);
        setError('');
      } catch (err) {
        if (err.message.includes('Invalid event ID format')) {
          setError('Invalid event ID. Please check the URL and try again.');
        } else if (err.message.includes('Event not found')) {
          setError('Event not found. This event may have been deleted.');
        } else {
          setError('Failed to load event details. Please try again.');
        }
        console.error('Error fetching event:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEvent();
    }
  }, [id]);

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
            <p style={{ color: 'var(--muted)' }}>Loading event details...</p>
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
            <h3 style={{ margin: '0 0 1rem 0', color: 'var(--danger)' }}>Error Loading Event</h3>
            <p style={{ color: 'var(--muted)', margin: '0 0 1.5rem 0' }}>{error}</p>
            <Link to="/events" className="btn btn-primary">Back to Events</Link>
          </div>
        </div>
      </section>
    );
  }

  if (!event) {
    return (
      <section className="section">
        <div className="container">
          <div className="card glass" style={{ padding: 40, textAlign: 'center' }}>
            <h2>Event not found</h2>
            <p style={{ color: 'var(--muted)', marginBottom: 20 }}>The event you're looking for doesn't exist or has been removed.</p>
            <Link to="/events" className="btn btn-primary">Back to Events</Link>
          </div>
        </div>
      </section>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <section className="section">
      <div className="container">
        {/* Back button */}
        <div style={{ marginBottom: 20 }}>
          <Link to="/events" className="btn btn-ghost">← Back to Events</Link>
        </div>

        {/* Event Hero */}
        <div className="card glass" style={{ padding: 0, overflow: 'hidden', marginBottom: 24 }}>
          <div style={{ position: 'relative' }}>
            <img 
              src={event.cover || getDefaultCover(event.category)} 
              alt={event.title} 
              style={{ 
                width: '100%', 
                height: '400px', 
                objectFit: 'cover',
                filter: 'brightness(0.7)'
              }} 
            />
            <div style={{ 
              position: 'absolute', 
              bottom: 0, 
              left: 0, 
              right: 0, 
              background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
              padding: '40px 30px 30px 30px',
              color: 'white'
            }}>
              <div className="badge badge-cyan" style={{ marginBottom: 12 }}>{event.category}</div>
              <h1 style={{ fontSize: '48px', margin: '0 0 8px 0', fontWeight: 700 }}>{event.title}</h1>
              <p style={{ fontSize: '18px', margin: 0, opacity: 0.9 }}>{event.description}</p>
            </div>
          </div>
        </div>

        {/* Event Details Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
          {/* Main Content */}
          <div>
            {/* Event Info */}
            <div className="card glass" style={{ padding: 24, marginBottom: 20 }}>
              <h3 style={{ margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
                📅 Event Details
              </h3>
              <div style={{ display: 'grid', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ color: 'var(--muted)', minWidth: '80px' }}>Date:</span>
                  <span>{formatDate(event.date)}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ color: 'var(--muted)', minWidth: '80px' }}>Location:</span>
                  <span>📍 {event.location.city}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ color: 'var(--muted)', minWidth: '80px' }}>Organizer:</span>
                  <span>{event.organizer.name}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ color: 'var(--muted)', minWidth: '80px' }}>Attendees:</span>
                  <span>{event.attendees.length} people going</span>
                </div>
              </div>
            </div>

            {/* Attendees List */}
            <div className="card glass" style={{ padding: 24 }}>
              <h3 style={{ margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
                👥 Who's Going ({event.attendees.length})
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {attendees.map((attendee) => (
                  <div key={attendee._id} className="badge" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ 
                      width: 20, 
                      height: 20, 
                      borderRadius: '50%', 
                      background: 'var(--accent-cyan)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '10px',
                      color: 'var(--bg)'
                    }}>
                      {attendee.name.charAt(0)}
                    </div>
                    {attendee.name}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Action Buttons */}
            <div className="card glass" style={{ padding: 24, marginBottom: 20 }}>
              <h3 style={{ margin: '0 0 16px 0' }}>Actions</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
             
            <button
              className={`btn ${joined ? 'btn-success' : 'btn-primary'}`}
              style={{ width: '100%' }}
              onClick={() => {
                if (!joined) {
                  setJoined(true);
                  setAttendees((prev) => [...prev, { _id: 'you', name: 'You' }]);
                }
              }}
              disabled={joined}
            >
              {joined ? 'Joined' : 'Join Event'}
            </button>


                {/* <button className="btn btn-ghost" style={{ width: '100%' }}> */}
                  {/* Share Event */}
                {/* </button> */}
                {/* <button className="btn btn-ghost" style={{ width: '100%' }}> */}
                  {/* Add to Calendar
                </button> */}
              </div>
            </div>

            {/* Event Stats */}
            <div className="card glass" style={{ padding: 24 }}>
              <h3 style={{ margin: '0 0 16px 0' }}>Event Stats</h3>
              <div style={{ display: 'grid', gap: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--muted)' }}>Created:</span>
                  <span>{new Date(event.createdAt).toLocaleDateString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--muted)' }}>Last Updated:</span>
                  <span>{new Date(event.updatedAt).toLocaleDateString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--muted)' }}>Category:</span>
                  <span className="badge">{event.category}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add CSS for loading spinner */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}