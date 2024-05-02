import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password } from '../../actions/auth';
import loginImg from '../../assets/img-login.svg';

const ResetPassword = ({ reset_password }) => {
    const navigate = useNavigate();
    const [ requestSent, sentRequestSent ] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
    });

    const { email } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        reset_password(email);
        sentRequestSent(true);
    };
    
    useEffect(() => {
        //Is the Request Sent?
        // Redirect them to the home page
        if(requestSent) {
            navigate('/');
        }
    }, [requestSent, navigate]);

    return (
        <div className='login'>
            <div className="login__content">
                <div className="login__img">
                    <img src={loginImg} alt=""/>
                </div>
                <div className="login__forms">

                    <form onSubmit={(e) => onSubmit(e)} className="login__create block" id="login-up">
                            <h1 className="login__title">Password Recovery</h1>
        
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

                            <button type='submit' className="login__button">Reset Password</button>
                        </form>
                    </div>
                </div>
            </div>
        
    )
}

export default connect(null, { reset_password })(ResetPassword);