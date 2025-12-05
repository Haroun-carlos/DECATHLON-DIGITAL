import React, { useState } from 'react';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #5A3FBC 0%, #BA3FBC 100%)',
    fontFamily: 'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    padding: '20px',
  },
  card: {
    background: 'white',
    borderRadius: '16px',
    boxShadow: '0 15px 40px rgba(0,0,0,0.25)',
    maxWidth: '480px',
    width: '100%',
    padding: '40px 30px',
  },
  heading: {
    textAlign: 'center',
    fontSize: '28px',
    fontWeight: '700',
    marginBottom: '30px',
    color: '#1A1A2E',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#4A4A6A',
    marginBottom: '8px',
    textTransform: 'uppercase',
  },
  input: {
    padding: '12px 15px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #D0D0E1',
    outline: 'none',
    transition: 'all 0.3s ease',
  },
  inputFocus: {
    borderColor: '#BA3FBC',
    boxShadow: '0 0 0 3px rgba(186, 63, 188, 0.2)',
  },
  button: {
    width: '100%',
    padding: '14px',
    marginTop: '10px',
    fontSize: '17px',
    fontWeight: '700',
    color: 'white',
    background: 'linear-gradient(90deg, #5A3FBC 0%, #BA3FBC 100%)',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(186, 63, 188, 0.4)',
  },
  buttonHover: {
    boxShadow: '0 6px 20px rgba(186, 63, 188, 0.6)',
    transform: 'translateY(-2px)',
  },
};

const SportProfileForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    name: '',
    age: '',
    sport: 'Running',
    level: 'Beginner',
  });
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.age) {
      alert('Please enter your name and age.');
      return;
    }
    onSubmit(form);
  };

  const getInputStyle = (fieldName) => ({
    ...styles.input,
    ...(focusedField === fieldName ? styles.inputFocus : {}),
  });

  const getButtonStyle = () => ({
    ...styles.button,
    ...(isButtonHovered ? styles.buttonHover : {}),
  });

  return (
    <div style={styles.container}>
      <form style={styles.card} onSubmit={handleSubmit}>
        <h2 style={styles.heading}>Sport Profile</h2>

        <div style={styles.formGroup}>
          <label style={styles.label}>Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            onFocus={() => setFocusedField('name')}
            onBlur={() => setFocusedField(null)}
            style={getInputStyle('name')}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Age</label>
          <input
            name="age"
            value={form.age}
            onChange={handleChange}
            onFocus={() => setFocusedField('age')}
            onBlur={() => setFocusedField(null)}
            style={getInputStyle('age')}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Sport</label>
          <select
            name="sport"
            value={form.sport}
            onChange={handleChange}
            onFocus={() => setFocusedField('sport')}
            onBlur={() => setFocusedField(null)}
            style={getInputStyle('sport')}
          >
            <option>Running</option>
            <option>Cycling</option>
            <option>Weightlifting</option>
            <option>Yoga</option>
            <option>Squat</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Experience</label>
          <select
            name="level"
            value={form.level}
            onChange={handleChange}
            onFocus={() => setFocusedField('level')}
            onBlur={() => setFocusedField(null)}
            style={getInputStyle('level')}
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>

        <button
          type="submit"
          style={getButtonStyle()}
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => setIsButtonHovered(false)}
        >
          Get Recommendations
        </button>
      </form>
    </div>
  );
};

export default SportProfileForm;
