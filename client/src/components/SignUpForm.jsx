import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/SignUpForm.css';
import supabase from '../utils/supabase';

function SignUpForm() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
        const { data, error } = await supabase.auth.signUp({
          email: email,
          password: password,
        });
        console.log('Signing up with:', { email, username, password });
        console.log("data: ", data);
        
        if (!error) {
          setSuccess('Account created successfully!');
          console.log('Signup successful: ', success);
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        } else {
          console.log("Signup error: ", error);
        }
    } catch(err){
      setError(err.response? err.response.data.message : 'Signup failed');
      console.error('Signup error: ', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
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
        <i className="fa-solid fa-user input-icon" />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
      <button type="submit">Sign Up</button>
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

export default SignUpForm;