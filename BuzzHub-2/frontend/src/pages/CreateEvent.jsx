import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api.js';
import { useAuth } from '../context/AuthContext';

const CreateEvent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { refreshProfile } = useAuth();
  const [error, setError] = useState('');
  const [poster, setPoster] = useState(null);
const [posterPreview, setPosterPreview] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'General',
    date: '',
    location: {
      city: ''
    }
  });

  const categories = [
    'General', 'Music', 'Community', 'Food', 'Film', 'Tech', 'Art', 
    'Fitness', 'Sports', 'Education', 'Business', 'Health', 'Travel'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('location.')) {
      const locationField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        location: {
          ...prev.location,
          [locationField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Removed external coordinate fetching per requirements
   const handlePosterChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setPoster(file);
    setPosterPreview(URL.createObjectURL(file));
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (!formData.title.trim()) {
      setError('Event title is required');
      setLoading(false);
      return;
    }

    if (!formData.description.trim()) {
      setError('Event description is required');
      setLoading(false);
      return;
    }

    if (!formData.date) {
      setError('Event date is required');
      setLoading(false);
      return;
    }

    if (!formData.location.city.trim()) {
      setError('Event location (city) is required');
      setLoading(false);
      return;
    }

    // Coordinates are optional now

    // Check if date is in the future
    const eventDate = new Date(formData.date);
    const now = new Date();
    if (eventDate <= now) {
      setError('Event date must be in the future');
      setLoading(false);
      return;
    }

    try {
      const eventData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category,
        date: eventDate.toISOString(),
        location: {
          city: formData.location.city.trim(),
          ...(formData.location.lat !== '' && !isNaN(parseFloat(formData.location.lat)) ? { lat: parseFloat(formData.location.lat) } : {}),
          ...(formData.location.lng !== '' && !isNaN(parseFloat(formData.location.lng)) ? { lng: parseFloat(formData.location.lng) } : {})
        }
      };

      const createdEvent = await apiService.createEvent(eventData);
      console.log('Event created successfully:', createdEvent);
      // refresh profile counts after create
      refreshProfile?.();
      
      // Navigate to events page to see the new event
      navigate('/events');
    } catch (err) {
      setError(err.message || 'Failed to create event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section">
      <div className="container">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{ margin: '0 0 8px 0', fontSize: '2.5rem' }}>Create New Event</h1>
            <p style={{ color: 'var(--muted)', margin: 0, fontSize: '1.1rem' }}>
              Share your event with the community
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="card" style={{ 
              background: 'var(--danger)', 
              color: 'white', 
              marginBottom: '1.5rem',
              padding: '1rem'
            }}>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="card glass">
            <div className="body">
              {/* Event Title */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="title" style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: '600',
                  color: 'var(--text)'
                }}>
                  Event Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="input"
                  placeholder="Enter event title"
                  required
                  style={{ width: '100%' }}
                />
              </div>

              {/* Event Description */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="description" style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: '600',
                  color: 'var(--text)'
                }}>
                  Event Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="input"
                  placeholder="Describe your event in detail..."
                  required
                  rows={4}
                  style={{ width: '100%', resize: 'vertical' }}
                />
              </div>

              {/* Category and Date Row */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: '1.5rem',
                marginBottom: '1.5rem'
              }}>
                {/* Category */}
                <div>
                  <label htmlFor="category" style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem', 
                    fontWeight: '600',
                    color: 'var(--text)'
                  }}>
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="input"
                    style={{ width: '100%' }}
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label htmlFor="date" style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem', 
                    fontWeight: '600',
                    color: 'var(--text)'
                  }}>
                    Event Date & Time *
                  </label>
                  <input
                    type="datetime-local"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="input"
                    required
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              {/* Location Section */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ 
                  margin: '0 0 1rem 0', 
                  fontSize: '1.2rem',
                  color: 'var(--text)'
                }}>
                  Event Location *
                </h3>
                
                {/* City */}
                <div style={{ marginBottom: '1rem' }}>
                  <label htmlFor="city" style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem', 
                    fontWeight: '600',
                    color: 'var(--text)'
                  }}>
                    City
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      type="text"
                      id="city"
                      name="location.city"
                      value={formData.location.city}
                      onChange={handleInputChange}
                      className="input"
                      placeholder="Enter city name"
                      required
                      style={{ flex: 1 }}
                    />
                  </div>
                </div>

                {/* Coordinates removed per requirement */}
              </div>
              
              {/* Event Poster Upload */}
<div style={{ marginBottom: '1.5rem' }}>
  <h3 style={{ 
    margin: '0 0 1rem 0', 
    fontSize: '1.2rem', 
    color: 'var(--text)' 
  }}>
    Event Poster
  </h3>

  <input
    type="file"
    accept="image/*"
    onChange={handlePosterChange}
    className="input"
    style={{ width: '100%' }}
  />

  {posterPreview && (
    <div style={{ marginTop: '1rem', textAlign: 'center' }}>
      <img
        src={posterPreview}
        alt="Event Poster Preview"
        style={{
          width: '100%',
          maxHeight: '300px',
          objectFit: 'cover',
          borderRadius: '12px'
        }}
      />
    </div>
  )}
</div>


              {/* Submit Buttons */}
              <div style={{ 
                display: 'flex', 
                gap: '1rem', 
                justifyContent: 'flex-end',
                marginTop: '2rem'
              }}>
                <button
                  type="button"
                  onClick={() => navigate('/events')}
                  className="btn btn-ghost"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                  style={{ minWidth: '120px' }}
                >
                  {loading ? 'Creating...' : 'Create Event'}
                </button>
              </div>
            </div>
          </form>

          {/* Help Text */}
          <div className="card" style={{ 
            marginTop: '1.5rem', 
            background: 'var(--muted)', 
            color: 'var(--text)',
            padding: '1rem'
          }}>
            <h4 style={{ margin: '0 0 0.5rem 0' }}>💡 Tips for creating a great event:</h4>
            <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
              <li>Write a clear, engaging title that describes your event</li>
              <li>Provide detailed description including what attendees can expect</li>
              <li>Choose the most appropriate category for better discoverability</li>
              <li>Set the date and time clearly - events must be in the future</li>
              <li>Ensure location coordinates are accurate for proper mapping</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateEvent;
