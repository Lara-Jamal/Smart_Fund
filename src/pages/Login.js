import React, { useState, useContext } from 'react';
import { UserContext } from '../UserContext';
import './Login.css';

export default function Login() {
  const { setUser } = useContext(UserContext);
  const [isSignUp, setIsSignUp] = useState(false);

  const [signInData, setSignInData] = useState({ email: '', password: '' });
  const [signUpData, setSignUpData] = useState({ name: '', email: '', password: '', code: '' });
  const [verificationStep, setVerificationStep] = useState(false);

  const handleSignIn = (e) => {
    e.preventDefault();
    setUser({ email: signInData.email });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (!verificationStep) {
      setVerificationStep(true);
    } else {
      setUser({ email: signUpData.email, name: signUpData.name });
    }
  };

  return (
    <div>
      <div className={`login-container ${isSignUp ? 'right-panel-active' : ''}`} id="container">
        <div className="form-container sign-up-container">
          <form onSubmit={handleSignUp} id="signUpForm">
            <h1>Create Account</h1>
            <span className="mb-15">or use your email for registration</span>
            <input type="text" placeholder="Name" value={signUpData.name} onChange={e => setSignUpData({ ...signUpData, name: e.target.value })} />
            <input type="email" placeholder="Email" value={signUpData.email} onChange={e => setSignUpData({ ...signUpData, email: e.target.value })} />
            <input type="password" placeholder="Password" value={signUpData.password} onChange={e => setSignUpData({ ...signUpData, password: e.target.value })} />
            {verificationStep && (
              <input type="text" placeholder="Verification Code" value={signUpData.code} onChange={e => setSignUpData({ ...signUpData, code: e.target.value })} />
            )}
            <button type="submit" id="signUpSubmit">{verificationStep ? 'Verify Code' : 'Sign Up'}</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form onSubmit={handleSignIn}>
            <h1>Sign in</h1>
            <span className="mb-15">or use your account</span>
            <input type="email" placeholder="Email" value={signInData.email} onChange={e => setSignInData({ ...signInData, email: e.target.value })} />
            <input type="password" placeholder="Password" value={signInData.password} onChange={e => setSignInData({ ...signInData, password: e.target.value })} />
            <a href="#">Forgot your password?</a>
            <button type="submit">Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className="ghost" id="signIn" onClick={() => setIsSignUp(false)}>Sign In</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="ghost" id="signUp" onClick={() => setIsSignUp(true)}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
