import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import '../assets/LoginForm.css'
import supabase from '../utils/supabase';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [session, setSession] = useState();
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });
        console.log('Logging in with:', { email, password });
        console.log("data: ", data);

        if (!error) {
          setSession(data.session);
          setUser(data.user);
          
          setTimeout(() => {
            navigate('/homepage');
          }, 2000);
        } else {
          console.error("Login error: ", error);
        }
    } catch(err) {
        console.error('Login error:', error)
        setError(err.response ? err.response.data.message : 'Login failed');
    };

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