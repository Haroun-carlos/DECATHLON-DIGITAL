import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// --- Styles ---
// NOTE: For better maintainability in a real project, consider using CSS modules or Tailwind CSS 
// instead of extensive inline styles, but we maintain the user's style preference here.
const baseStyles = {
  loginContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #5A3FBC 0%, #BA3FBC 100%)',
    fontFamily: 'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  loginCard: {
    background: 'white',
    padding: '45px 40px',
    borderRadius: '16px',
    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.25)',
    width: '100%',
    maxWidth: '420px',
    transition: 'transform 0.3s ease',
  },
  heading: {
    textAlign: 'center',
    color: '#1A1A2E',
    marginBottom: '35px',
    fontSize: '32px',
    fontWeight: '700',
    letterSpacing: '0.5px',
  },
  formGroup: { marginBottom: '25px' },
  label: {
    display: 'block',
    marginBottom: '8px',
    color: '#4A4A6A',
    fontWeight: '600',
    fontSize: '14px',
    textTransform: 'uppercase',
  },
  input: {
    width: '100%',
    padding: '14px 16px',
    border: '1px solid #D0D0E1',
    borderRadius: '8px',
    fontSize: '16px',
    color: '#1A1A2E',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
    outline: 'none',
  },
  inputError: { borderColor: '#E74C3C', boxShadow: '0 0 0 1px #E74C3C' },
  inputFocus: { borderColor: '#BA3FBC', boxShadow: '0 0 0 3px rgba(186,63,188,0.2)' },
  errorMessage: { display: 'block', color: '#E74C3C', fontSize: '12px', marginTop: '6px', fontWeight: '500' },
  errorAlert: {
    backgroundColor: '#FADEE1',
    color: '#C0392B',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '20px',
    fontSize: '14px',
    borderLeft: '5px solid #E74C3C',
    fontWeight: '500',
  },
  submitButton: {
    width: '100%',
    padding: '14px',
    background: 'linear-gradient(90deg, #5A3FBC 0%, #BA3FBC 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '17px',
    fontWeight: '700',
    cursor: 'pointer',
    letterSpacing: '1px',
    transition: 'all 0.3s ease',
    marginTop: '15px',
    boxShadow: '0 4px 15px rgba(186,63,188,0.4)',
  },
  submitButtonHover: { boxShadow: '0 6px 20px rgba(186,63,188,0.6)', transform: 'translateY(-2px)' },
  submitButtonDisabled: { opacity: 0.6, cursor: 'not-allowed', boxShadow: 'none', transform: 'none' },
  formFooter: { textAlign: 'center', marginTop: '30px', fontSize: '14px', color: '#6A6A8A' },
  link: { color: '#BA3FBC', textDecoration: 'none', fontWeight: '600', transition: 'color 0.2s ease', cursor: 'pointer' },
  linkHover: { color: '#5A3FBC', textDecoration: 'underline' },
};

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isLinkHovered, setIsLinkHovered] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Client-side validation
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    setErrors({}); // Clear previous errors, including submit errors

    try {
      // 2. API Call to MERN Backend (Team 3)
      // Assuming your backend runs on port 5000 (common for Node/Express)
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        // Authentication failed (e.g., 401 Unauthorized or 400 Bad Request)
        const errorData = await response.json();
        // Display generic or specific error from backend
        setErrors({ submit: errorData.message || 'Login failed. Please check your credentials.' });
      } else {
        // 3. SUCCESS: Handle token/session and redirect
        // const data = await response.json();
        // localStorage.setItem('token', data.token); // Store auth token
        
        // 4. CRITICAL FIX: Redirect to the new protected route
        navigate('/home', { replace: true });
      }
    } catch (error) {
      // Handle network errors
      console.error('Login network error:', error);
      setErrors({ submit: 'A network error occurred. Please try again later.' });
    } finally {
      setIsLoading(false);
    }
  };

  const getButtonStyles = () => {
    let style = { ...baseStyles.submitButton };
    if (isLoading) style = { ...style, ...baseStyles.submitButtonDisabled };
    else if (isButtonHovered) style = { ...style, ...baseStyles.submitButtonHover };
    return style;
  };

  return (
    <div style={baseStyles.loginContainer}>
      <div style={baseStyles.loginCard}>
        <h1 style={baseStyles.heading}>Welcome Back</h1>
        <form onSubmit={handleSubmit}>

          {/* Email Input */}
          <div style={baseStyles.formGroup}>
            <label htmlFor="email" style={baseStyles.label}>Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              placeholder="example@domain.com"
              style={{
                ...baseStyles.input,
                ...(errors.email && baseStyles.inputError),
                ...(focusedField === 'email' && baseStyles.inputFocus),
              }}
            />
            {errors.email && <span style={baseStyles.errorMessage}>{errors.email}</span>}
          </div>

          {/* Password Input */}
          <div style={baseStyles.formGroup}>
            <label htmlFor="password" style={baseStyles.label}>Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
              placeholder="••••••••"
              style={{
                ...baseStyles.input,
                ...(errors.password && baseStyles.inputError),
                ...(focusedField === 'password' && baseStyles.inputFocus),
              }}
            />
            {errors.password && <span style={baseStyles.errorMessage}>{errors.password}</span>}
          </div>

          {/* Submission Error Alert */}
          {errors.submit && <div style={baseStyles.errorAlert}>{errors.submit}</div>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            style={getButtonStyles()}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
          >
            {isLoading ? 'Authenticating...' : 'Login'}
          </button>
        </form>

        {/* Footer Link to Sign Up */}
        <div style={baseStyles.formFooter}>
          Need an account?{' '}
          <span
            style={{ ...baseStyles.link, ...(isLinkHovered && baseStyles.linkHover) }}
            onMouseEnter={() => setIsLinkHovered(true)}
            onMouseLeave={() => setIsLinkHovered(false)}
            onClick={() => navigate('/signup')}
          >
            Create one now
          </span>
        </div>
      </div>
    </div>
 );
}
