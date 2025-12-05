import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #5A3FBC, #BA3FBC)",
    fontFamily: "Arial, sans-serif"
  },
  card: {
    background: "#fff",
    padding: "35px",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 10px 35px rgba(0,0,0,0.25)"
  },
  title: {
    textAlign: "center",
    marginBottom: "25px"
  },
  formGroup: {
    marginBottom: "18px"
  },
  label: {
    display: "block",
    marginBottom: "6px",
    fontWeight: "600"
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "15px"
  },
  error: {
    color: "red",
    fontSize: "13px",
    marginTop: "4px"
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(135deg, #5A3FBC, #BA3FBC)",
    border: "none",
    color: "white",
    borderRadius: "6px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "15px"
  },
  footer: {
    textAlign: "center",
    marginTop: "20px"
  },
  link: {
    color: "#5A3FBC",
    cursor: "pointer",
    fontWeight: "600"
  },
  success: {
    background: "#d4f8e8",
    padding: "12px",
    borderRadius: "6px",
    marginBottom: "15px",
    textAlign: "center",
    color: "#008060"
  },
  strength: {
    fontSize: "12px",
    marginTop: "4px"
  }
};

export default function Signup({ onSignup }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getPasswordStrength = () => {
    const p = formData.password;
    if (p.length < 6) return "Weak";
    if (p.match(/[A-Z]/) && p.match(/[0-9]/)) return "Strong";
    return "Fair";
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name required";
    if (!formData.lastName) newErrors.lastName = "Last name required";
    if (!formData.email) newErrors.email = "Email required";
    if (!formData.password) newErrors.password = "Password required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    const userData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email
    };

    setTimeout(() => {
      setSuccessMessage("Account created successfully!");
      if (onSignup) onSignup(userData);
      setIsLoading(false);
      setTimeout(() => navigate("/login"), 1500);
    }, 1500);
  };

  return (
    <div style={styles.container}>
      <form style={styles.card} onSubmit={handleSubmit}>
        <h2 style={styles.title}>Create Account</h2>

        {successMessage && <div style={styles.success}>{successMessage}</div>}

        <div style={styles.formGroup}>
          <label style={styles.label}>First Name</label>
          <input
            style={styles.input}
            name="firstName"
            onChange={handleChange}
          />
          {errors.firstName && <div style={styles.error}>{errors.firstName}</div>}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Last Name</label>
          <input
            style={styles.input}
            name="lastName"
            onChange={handleChange}
          />
          {errors.lastName && <div style={styles.error}>{errors.lastName}</div>}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Email</label>
          <input
            style={styles.input}
            name="email"
            type="email"
            onChange={handleChange}
          />
          {errors.email && <div style={styles.error}>{errors.email}</div>}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Password</label>
          <input
            style={styles.input}
            name="password"
            type="password"
            onChange={handleChange}
          />
          <div style={styles.strength}>Strength: {getPasswordStrength()}</div>
          {errors.password && <div style={styles.error}>{errors.password}</div>}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Confirm Password</label>
          <input
            style={styles.input}
            name="confirmPassword"
            type="password"
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <div style={styles.error}>{errors.confirmPassword}</div>
          )}
        </div>

        <button style={styles.button} disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Account"}
        </button>

        <div style={styles.footer}>
          Already have an account?{" "}
          <span style={styles.link} onClick={() => navigate("/login")}>
            Login
          </span>
        </div>
      </form>
    </div>
  );
}
