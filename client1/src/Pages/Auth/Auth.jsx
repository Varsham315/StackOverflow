import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import icon from '../../assets/icon.png';
import AboutAuth from './AboutAuth';
import { signup, login } from '../../actions/auth';

const Auth = () => {
    const [isSignup, setIsSignup] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const handleResize = () => {
        setScreenWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSwitch = () => {
        setIsSignup(!isSignup);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert("Enter email and password");
            return;
        }
        if (isSignup) {
            if (!name) {
                alert("Enter a name to continue");
                return;
            }
            dispatch(signup({ name, email, password }, navigate));
        } else {
            dispatch(login({ email, password }, navigate));
        }
    };

    return (
        <div className='auth-section'>
            {isSignup && screenWidth >= 768 && <AboutAuth />}
            <div className='auth-container-2'>
                {!isSignup && <img src={icon} alt='stack overflow' className='login-logo' />}
                <form onSubmit={handleSubmit}>
                    {isSignup &&
                        <label htmlFor="name">
                            <h4>Display Name</h4>
                            <input type="text" name="name" id="name" onChange={(e) => setName(e.target.value)} />
                        </label>
                    }
                    <label htmlFor="email">
                        <h4>Email</h4>
                        <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    <label htmlFor="password">
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <h4>Password</h4>
                            {!isSignup && <h4 style={{ color: "#007ac6" }}>forgot password</h4>}
                        </div>
                        <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} />
                        {isSignup && <p style={{ color: "#666767", fontSize: "13px" }}>Passwords must contain at least eight <br />characters, including at least 1 letter and 1<br /> number</p>}
                    </label>
                    <button type='submit' className={isSignup ? 'auth-btn' : 'auth-btn-1'}>{isSignup ? 'Sign up' : 'Log in'}</button>
                    {isSignup && (
                        <p style={{ color: "#666767", fontSize: "13px" }}>
                            By clicking "Sign up", you agree to our <span style={{ color: "#007ac6" }}>terms of <br /> service</span>, <span style={{ color: "#007ac6" }}>privacy policy</span> and <span style={{ color: "#007ac6" }}>cookie policy</span>
                        </p>
                    )}
                </form>
                <p>
                    {isSignup ? "Already have an account?" : "Don't have an account?"}
                    <button type='button' className='handle-switch-btn' onClick={handleSwitch}>{isSignup ? "Log in" : "Sign up"}</button>
                </p>
            </div>
        </div>
    );
};

export default Auth;
