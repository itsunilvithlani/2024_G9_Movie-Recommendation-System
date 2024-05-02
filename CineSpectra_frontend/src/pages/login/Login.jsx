import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import loginImg from '../../assets/img-login.svg';
import './style.scss';

const Login = ({ login, isAuthenticated, loginError }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        login(email,password);
        console.log('onSubmit called');
    };
    
    useEffect(() => {
        //Is the user authenticated?
        // Redirect them to the home page
        if(isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="login">
            <div className="login__content">
                <div className="login__img">
                    <img src={loginImg} alt=""/>
                </div>
                
                


                <div className="login__forms">
                    <form onSubmit={(e) => onSubmit(e)} className="login__registre" id="login-in">
                        <h1 className="login__title">Sign In</h1>

                        {loginError && 
                            <div class="error">
                                <div class="error__icon">
                                    <svg
                                    fill="none"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    >
                                    <path
                                        d="m13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z"
                                        fill="#393a37"
                                    ></path>
                                    </svg>
                                </div>
                                <div class="error__title">{loginError}</div>
                                <div class="error__close">
                                    <svg
                                    height="20"
                                    viewBox="0 0 20 20"
                                    width="20"
                                    xmlns="http://www.w3.org/2000/svg"
                                    >
                                    <path
                                        d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z"
                                        fill="#393a37"
                                    ></path>
                                    </svg>
                                </div>
                            </div>
                        }
                        {/* {loginError && <p className="error-message">{loginError}</p>} Display error message */}
    
                        <div className="login__box">
                            <i className='bx bx-user login__icon'></i>
                            <input type="email" 
                                    placeholder="Email" 
                                    className="login__input"
                                    name='email'
                                    value={email}
                                    onChange={(e) => onChange(e)}
                                    required/>
                        </div>
    
                        <div className="login__box">
                            <i className='bx bx-lock-alt login__icon'></i>
                            <input type="password" 
                                    placeholder="Password" 
                                    className="login__input"
                                    name='password'
                                    value={password}
                                    onChange={(e) => onChange(e)}
                                    minLength='6'
                                    required/>
                        </div>

                        <Link to='/reset_password' className="login__forgot">Forgot password?</Link>

                        <button className="login__button" type='submit'>Sign In</button>

                        <div>
                            <span className="login__account">Don't have an Account ?</span>
                            <Link to='/signup' className="login__signin" id="sign-up">Sign Up</Link>
                        </div>
                    </form>

                    {/* <form action="" className="login__create none" id="login-up">
                        <h1 className="login__title">Create Account</h1>
    
                        <div className="login__box">
                            <i className='bx bx-user login__icon'></i>
                            <input type="text" 
                                    placeholder="Name" 
                                    className="login__input"
                                    name='name'
                                    value={name}
                                    onChange={(e) => onChange(e)}
                                    required/>
                        </div>
    
                        <div className="login__box">
                            <i className='bx bx-at login__icon'></i>
                            <input type="email" 
                                    placeholder="Email" 
                                    className="login__input"
                                    name='email'
                                    value={email}
                                    onChange={(e) => onChange(e)}
                                    required/>
                        </div>

                        <div className="login__box">
                            <i className='bx bx-lock-alt login__icon'></i>
                            <input type="password" 
                                    placeholder="Password" 
                                    className="login__input"
                                    name='password'
                                    value={password}
                                    onChange={(e) => onChange(e)}
                                    minLength='6'
                                    required
                                    />
                        </div>
                        <div className="login__box">
                            <i className='bx bx-lock-alt login__icon'></i>
                            <input type="password" 
                                    placeholder="Confirm Password" 
                                    className="login__input"
                                    name='re_password'
                                    value={re_password}
                                    onChange={(e) => onChange(e)}
                                    minLength='6'
                                    required
                                    />
                        </div>

                        <button type='submit' className="login__button">Sign Up</button>

                        <div>
                            <span className="login__account">Already have an Account ?</span>
                            <span className="login__signup" id="sign-in">Sign In</span>
                        </div>

                        <div className="login__social">
                            <a href="#" className="login__social-icon"><i className='bx bxl-facebook' ></i></a>
                            <a href="#" className="login__social-icon"><i className='bx bxl-twitter' ></i></a>
                            <a href="#" className="login__social-icon"><i className='bx bxl-google' ></i></a>
                        </div>
                    </form> */}
                </div>
            </div>
        </div>
        
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.home.authReducer.auth.isAuthenticated,
    loginError: state.home.authReducer.auth.loginError
});

export default connect(mapStateToProps, { login })(Login);

{/* <div className='container mt-5'>
            <h1>Sign In</h1>
            <p>Sign into your Account</p>
            <form onSubmit={(e) => onSubmit(e)}>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='email'
                        placeholder='Email'
                        name='email'
                        value={email}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>

                <div className='form-group'>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={password}
                        onChange={(e) => onChange(e)}
                        minLength='6'
                        required
                    />
                </div>
                <button className='btn btn-primary' type='submit'>Login</button>
            </form>

            <p className='mt-3'>
                Don't have an account? <Link to='/signup'>Sign Up</Link>
            </p>

            <p className='mt-3'>
                Forgot your Password <Link to='/reset_password'>Reset Password</Link>
            </p>
        </div> */}