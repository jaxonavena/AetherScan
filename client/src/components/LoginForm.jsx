import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import '../assets/LoginForm.css'
import { useAuth } from '../hooks/AuthProvider';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = useAuth(); // Set's up the authenticator function
  const handleSubmit = async (e) => {
    e.preventDefault();
    await auth.loginAction({email, password});
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div className="input-wrapper">
        <i className="fa-solid fa-envelope input-icon" />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="input-wrapper">
        <i className="fa-solid fa-lock input-icon" />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Log In</button>
    </form>
  );
}

const styles = {
    input: {
      width: '100%',
      padding: '0.8rem',
      marginBottom: '1rem',
      fontSize: '1rem',
      border: '1px solid #ccc',
      borderRadius: '4px'
    },
    button: {
      width: '100%',
      backgroundColor: '#635BBA',
      color: '#fff',
      padding: '0.8rem',
      fontSize: '1rem',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer'
    }
  };

export default LoginForm;
