import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import icon from '../../assets/icon.png';
import AboutAuth from './AboutAuth';
import { signup, login, verifylogin, verifysignUp } from '../../actions/auth';
import * as api from '../../api';

const Auth = () => {
    const [isOtp, setIsOtp] = useState(false);
    const [isVerify, setIsVerify] = useState(false);
    const [isSignup, setIsSignup] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [number, setNumber] = useState('');
    const [otp, setOTP] = useState('');
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

    const handleSwitchOtp = () => {
        setIsOtp(!isOtp);
        console.log('signup: ', isSignup);
        console.log('otp: ', isOtp);
    };

    const otpSignup = async (authData) => {
        try {
            const { status } = await api.otpsignUp(authData);
            return status;
        } catch (error) {
            console.log(error.response.data.msg);
            alert(error.response.data.msg);
        }
    };

    const otpLogin = async (authData) => {
        try {
            const { status } = await api.otplogIn(authData);
            return status;
        } catch (error) {
            console.log(error.response.data.msg);
            alert(error.response.data.msg);
        }
    };

    const toSetverifySignup = async () => {
        let status = await otpSignup({ name, number });
        if (status === 200) {
            setIsVerify(true);
        }
    };

    const toSetverifyLogin = async () => {
        let status = await otpLogin({ number });
        if (status === 200) {
            setIsVerify(true);
        } else {
            setIsVerify(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isOtp) {
            if (!number) {
                alert('Enter a number to continue');
                return;
            }

            if (isSignup) {
                if (!name) {
                    alert('Enter a name to continue');
                    return;
                }
                if (isVerify) {
                    dispatch(verifysignUp({ name, number, otp }, navigate));
                    setIsVerify(false);
                } else {
                    await toSetverifySignup();
                }
            } else {
                if (isVerify) {
                    dispatch(verifylogin({ name, number, otp }, navigate));
                    setIsVerify(false);
                } else {
                    await toSetverifyLogin();
                }
            }
        } else {
            if (!email || !password) {
                alert('Enter email and password');
                return;
            }
            if (isSignup) {
                if (!name) {
                    alert('Enter a name to continue');
                    return;
                }
                dispatch(signup({ name, email, password }, navigate));
            } else {
                dispatch(login({ email, password }, navigate));
            }
        }
    };

    return (
        <div className='auth-section'>
            {isSignup && screenWidth >= 768 && <AboutAuth />}
            <div className='auth-container-2'>
                {!isSignup && <img src={icon} alt='stack overflow' className='login-logo' />}
                <form onSubmit={handleSubmit}>
                    {isSignup &&
                        <label htmlFor='name'>
                            <h4>Display Name</h4>
                            <input type='text' name='name' id='name' onChange={(e) => { setName(e.target.value); }} />
                        </label>
                    }
                    {!isOtp &&
                        <label htmlFor='email'>
                            <h4>Email</h4>
                            <input type='email' name='email' id='email' onChange={(e) => { setEmail(e.target.value); }} />
                            {isSignup ?
                                <p className='handle-switch-btn' onClick={handleSwitchOtp}>{isOtp ? 'Register with email (click here)' : 'Register with phone number (click here)'}</p>
                                :
                                <p className='handle-switch-btn' onClick={handleSwitchOtp}>{isOtp ? 'Login with email (click here)' : 'Login with phone number (click here)'}</p>
                            }
                        </label>
                    }
                    {isOtp ?
                        <label htmlFor='number'>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h4>Phone Number</h4>
                            </div>
                            <input type='text' name='number' id='number' onChange={(e) => { setNumber(e.target.value); }} />
                            {!isVerify && <p style={{ color: '#666767', fontSize: '13px' }}>Please enter a valid phone number</p>}
                            {isSignup ?
                                <p className='handle-switch-btn' onClick={handleSwitchOtp}>{isOtp ? 'Register with email (click here)' : 'Register with phone number (click here)'}</p>
                                :
                                <p className='handle-switch-btn' onClick={handleSwitchOtp}>{isOtp ? 'Login with email (click here)' : 'Login with phone number (click here)'}</p>
                            }
                        </label>
                        :
                        <label htmlFor='password'>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h4>Password</h4>
                                {!isSignup && <h4 style={{ color: '#007ac6' }}>forgot password</h4>}
                            </div>
                            <input type='password' name='password' id='password' onChange={(e) => { setPassword(e.target.value); }} />
                            {isSignup && <p style={{ color: '#666767', fontSize: '13px' }}>Passwords must contain at least eight <br />characters, including at least 1 letter and 1<br /> number</p>}
                        </label>
                    }
                    {isOtp && isVerify &&
                        <label htmlFor='otp' style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h4 style={{ marginTop: '10px', marginBottom: '5px' }}>OTP</h4>
                            </div>
                            <input type='otp' name='otp' id='otp' onChange={(e) => { setOTP(e.target.value); }} style={{ padding: '10px', width: 'calc(100% - 30px)', border: 'solid 1px #0000003e', fontSize: '13px' }} />
                        </label>
                    }
                    {!isVerify && isSignup && (
                        <label htmlFor='check'>
                            <input type='checkbox' id='check' />
                            <p style={{ fontSize: '13px' }}>Opt-in to receive occasional,<br /> product update, user research invitations,<br /> company announcements, and digests.</p>
                        </label>
                    )}
                    <button type='submit' className={isSignup ? 'auth-btn' : 'auth-btn-1'}>{isSignup ? 'Sign up' : 'Log in'}</button>
                    {isSignup && (
                        <p style={{ color: '#666767', fontSize: '13px' }}>
                            By clicking "Sign up", you agree to our <span style={{ color: '#007ac6' }}>terms of <br /> service</span>, <span style={{ color: '#007ac6' }}>privacy policy</span> and <span style={{ color: '#007ac6' }}>cookie policy</span>
                        </p>
                    )}
                </form>
                <p>
                    {isSignup ? 'Already have an account?' : "Don't have an account?"}
                    <button type='button' className='handle-switch-btn' onClick={handleSwitch}>{isSignup ? 'Log in' : 'Sign up'}</button>
                </p>
            </div>
        </div>
    );
};

export default Auth;
