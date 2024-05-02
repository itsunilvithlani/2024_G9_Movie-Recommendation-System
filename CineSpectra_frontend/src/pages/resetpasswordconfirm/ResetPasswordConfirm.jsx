import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password_confirm } from '../../actions/auth';
import loginImg from '../../assets/img-login.svg';

const ResetPasswordConfirm = ({ reset_password_confirm }) => {
    const routeParams = useParams();
    const navigate = useNavigate();
    const [ requestSent, sentRequestSent ] = useState(false);
    const [formData, setFormData] = useState({
        new_password: "",
        re_new_password: "",
    });

    const { new_password, re_new_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        const uid = routeParams.uid;
        const token = routeParams.token;
        reset_password_confirm(uid, token, new_password, re_new_password);
        sentRequestSent(true);
    };
    
    useEffect(() => {
        //Is the Request Sent?
        // Redirect them to the home page
        if(requestSent) {
            navigate('/login');
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
                            <h1 className="login__title">Create New Password</h1>

                            <div className="login__box">
                                <i className='bx bx-lock-alt login__icon'></i>
                                <input type="password" 
                                        placeholder="New Password" 
                                        className="login__input"
                                        name='new_password'
                                        value={new_password}
                                        onChange={(e) => onChange(e)}
                                        minLength='6'
                                        required
                                        />
                            </div>
                            <div className="login__box">
                                <i className='bx bx-lock-alt login__icon'></i>
                                <input type="password" 
                                        placeholder="Confirm New Password" 
                                        className="login__input"
                                        name='re_new_password'
                                        value={re_new_password}
                                        onChange={(e) => onChange(e)}
                                        minLength='6'
                                        required
                                        />
                            </div>

                            <button type='submit' className="login__button">Reset Password</button>
                        </form>
                    </div>
                </div>
            </div>
    )
}

export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);