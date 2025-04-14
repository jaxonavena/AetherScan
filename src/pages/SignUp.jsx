import React from 'react';
import { Link } from 'react-router-dom';
import SignUpForm from '../components/SignUpForm';
import '../assets/SignUp.css';


function SignUp() {
  return (
    <div className="sign-up-page">
      <div className="sign-up-container">
        <h2 className="sign-up-title">Sign up</h2>
        <p className="sign-up-subtitle">Just a few quick things to get started</p>
        <SignUpForm />
        <div className="sign-up-footer">
            Already have an account? <Link to="/login">Log In</Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;