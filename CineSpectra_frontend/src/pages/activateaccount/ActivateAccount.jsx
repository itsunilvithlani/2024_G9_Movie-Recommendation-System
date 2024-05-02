import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { verify } from '../../actions/auth';
import loginImg from '../../assets/img-login.svg';


const ActivateAccount = ({ verify }) => {
    const navigate = useNavigate();
    const routeParams = useParams();
    const [verified, setVerified] = useState(false);

    const verify_account = e => {
        const uid = routeParams.uid;
        const token = routeParams.token;
        verify(uid, token);
        setVerified(true);
    };
    
    useEffect(() => {
        if(verified) {
            navigate('/login');
        }
    }, [verified, navigate]);

    return (
      <div className='login'>
      <div className="login__content">
          <div className="login__img">
              <img src={loginImg} alt=""/>
          </div>
          <div className="login__forms">

              <form onSubmit={(e) => onSubmit(e)} className="login__create block" id="login-up">
                      <h1 className="login__title">Verify your Account</h1>

                      <button type='submit' className="login__button" onClick={verify_account}>Verify</button>
                  </form>
              </div>
          </div>
      </div>
        
    )
}


export default connect(null, { verify })(ActivateAccount);

{/* <div className='container'>
            <div className="d-flex flex-column justify-content-center align-items-center"
                  style={{ marginTop: '200px' }}
            >
              <h1>Verify your Account</h1>
              <button onClick={verify_account}
                      style={{ marginTop: '50px' }}
                      type='button'
                      className='btn btn-primary'>Verify</button>
            </div>
        </div> */}