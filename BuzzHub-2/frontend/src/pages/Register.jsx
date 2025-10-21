import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [validationErrors, setValidationErrors] = useState({});
  
  const { register, loading, error, clearError, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated, navigate]);

  // Clear errors when component mounts or form changes
  useEffect(() => {
    clearError();
  }, [clearError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    } else if (formData.username.trim().length < 3) {
      errors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      errors.username = 'Username can only contain letters, numbers, and underscores';
    }
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const { confirmPassword, ...userData } = formData;
    const result = await register(userData);
    
    if (result.success) {
      navigate('/profile');
    }
  };

  return (
    <section className="section">
      <div className="container">
        <div className="card glass form" style={{ padding: 32, maxWidth: 520 }}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div className="badge badge-pink">Join the buzz</div>
            <h2 style={{ margin: '12px 0 8px 0', fontSize: '32px' }}>Create Account</h2>
            <p style={{ color: 'var(--muted)', margin: 0 }}>Start your journey with BuzzHub today</p>
          </div>
          
          <img 
            alt="register visual" 
            style={{ 
              width: '100%', 
              borderRadius: 12, 
              marginBottom: 24,
              height: '200px',
              objectFit: 'cover'
            }} 
            src="https://images.unsplash.com/photo-1464375117522-1311d6a5b81a?q=80&w=1600&auto=format&fit=crop"
          />

          {error && (
            <div style={{
              background: 'rgba(255, 88, 182, 0.1)',
              border: '1px solid rgba(255, 88, 182, 0.3)',
              borderRadius: 8,
              padding: 12,
              marginBottom: 20,
              color: 'var(--accent-pink)',
              fontSize: '14px'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label style={{ fontWeight: '600', marginBottom: '6px' }}>Full Name</label>
              <input 
                className="input" 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                style={{
                  borderColor: validationErrors.name ? 'var(--accent-pink)' : 'var(--border)'
                }}
              />
              {validationErrors.name && (
                <span style={{ color: 'var(--accent-pink)', fontSize: '12px', marginTop: '4px' }}>
                  {validationErrors.name}
                </span>
              )}
            </div>

            <div className="field">
              <label style={{ fontWeight: '600', marginBottom: '6px' }}>Username</label>
              <input 
                className="input" 
                type="text" 
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="johndoe"
                style={{
                  borderColor: validationErrors.username ? 'var(--accent-pink)' : 'var(--border)'
                }}
              />
              {validationErrors.username && (
                <span style={{ color: 'var(--accent-pink)', fontSize: '12px', marginTop: '4px' }}>
                  {validationErrors.username}
                </span>
              )}
            </div>

            <div className="field">
              <label style={{ fontWeight: '600', marginBottom: '6px' }}>Email</label>
              <input 
                className="input" 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                style={{
                  borderColor: validationErrors.email ? 'var(--accent-pink)' : 'var(--border)'
                }}
              />
              {validationErrors.email && (
                <span style={{ color: 'var(--accent-pink)', fontSize: '12px', marginTop: '4px' }}>
                  {validationErrors.email}
                </span>
              )}
            </div>

            <div className="field">
              <label style={{ fontWeight: '600', marginBottom: '6px' }}>Password</label>
              <input 
                className="input" 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a strong password"
                style={{
                  borderColor: validationErrors.password ? 'var(--accent-pink)' : 'var(--border)'
                }}
              />
              {validationErrors.password && (
                <span style={{ color: 'var(--accent-pink)', fontSize: '12px', marginTop: '4px' }}>
                  {validationErrors.password}
                </span>
              )}
            </div>

            <div className="field">
              <label style={{ fontWeight: '600', marginBottom: '6px' }}>Confirm Password</label>
              <input 
                className="input" 
                type="password" 
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                style={{
                  borderColor: validationErrors.confirmPassword ? 'var(--accent-pink)' : 'var(--border)'
                }}
              />
              {validationErrors.confirmPassword && (
                <span style={{ color: 'var(--accent-pink)', fontSize: '12px', marginTop: '4px' }}>
                  {validationErrors.confirmPassword}
                </span>
              )}
            </div>

            <button 
              className="btn btn-primary" 
              type="submit"
              style={{ width: '100%', marginBottom: 16 }}
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div style={{ textAlign: 'center', color: 'var(--muted)' }}>
            <span>Already have an account? </span>
            <Link to="/login" style={{ color: 'var(--accent-cyan)', fontWeight: '600' }}>
              Sign in here
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;