import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../../actions/auth';
import loginImg from '../../assets/img-login.svg';

const Signup = ({ signup, isAuthenticated }) => {
  const [accountCreated, setAccountCreated] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        re_password: "",
    });

    const { name, email, password, re_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if(password === re_password){
          signup(name, email, password, re_password);
          setAccountCreated(true);
        }
    };
    
    useEffect(() => {
        //Is the user authenticated?
        // Redirect them to the home page
        if(isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
      if(accountCreated) {
          navigate('/login');
      }
  }, [accountCreated, navigate]);

    return (
        <div className='login'>
            <div className="login__content">
                <div className="login__img">
                    <img src={loginImg} alt=""/>
                </div>
                <div className="login__forms">

                    <form onSubmit={(e) => onSubmit(e)} className="login__create block" id="login-up">
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
                                <Link to='/login' className="login__signup" id="sign-in">Sign In</Link>
                            </div>

                            {/* <div className="login__social">
                                <a href="#" className="login__social-icon"><i className='bx bxl-facebook' ></i></a>
                                <a href="#" className="login__social-icon"><i className='bx bxl-twitter' ></i></a>
                                <a href="#" className="login__social-icon"><i className='bx bxl-google' ></i></a>
                            </div> */}
                        </form>
                    </div>
                </div>
            </div>
        
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.home.authReducer.auth.isAuthenticated
});

export default connect(mapStateToProps, { signup })(Signup);