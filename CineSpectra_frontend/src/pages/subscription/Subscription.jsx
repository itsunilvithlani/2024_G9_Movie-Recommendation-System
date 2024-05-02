import React, { useEffect, useState } from 'react'
import './styles.scss'
import ContentWrapper from '../../components/contentWrapper/ContentWrapper'
import useRazorpay from 'react-razorpay';
import axios from 'axios';
import logo from "../../assets/movix-logo.png";
import { useSelector } from 'react-redux';
import { isSubscribed } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const DJANGO_API_URL = import.meta.env.VITE_API_URL;

const Subscription = () => {
    const [Razorpay] = useRazorpay();
    const [amount, setAmount] = useState(50000);
    const { id } = useSelector((state) => state.home.authReducer.auth.user);
    const navigate = useNavigate();

    useEffect(() => {
        const checkSubscription = async () => {
            const { is_subscribed } = await isSubscribed();
            if(is_subscribed === true){
                navigate('/');
            }

        }
        checkSubscription();
        // console.log(is_subscribed);
    }, [])

    if(localStorage.getItem('access')){
        var config = {
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `JWT ${localStorage.getItem('access')}`,
                'Accept' : 'application/json'
            }
        };
    }

    const razorpayPayment = () => {
        axios.post(DJANGO_API_URL + 'razorpay/order/create/', {
                "amount": amount,
                "currency": "INR"
            }, config)
            .then(function (response) {
                // console.log(response.data.data);
                const order_id = response.data.data.id;
                const options = {
                    key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
                    name: "Movix",
                    description: "Test Transaction",
                    image: logo,
                    order_id: order_id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
                    handler: function (response) {
                        // alert(response.razorpay_payment_id);
                        // alert(response.razorpay_order_id);
                        // alert(response.razorpay_signature);
                        complete_payment(
                            response.razorpay_payment_id,
                            response.razorpay_order_id,
                            response.razorpay_signature, 
                            amount
                        );
                    },
                    prefill: {
                      name: "Piyush Garg",
                      email: "youremail@example.com",
                      contact: "9999999999",
                    },
                    notes: {
                      address: "Razorpay Corporate Office",
                    },
                    theme: {
                      color: "#3399cc",
                    },
                  };
                
                  const rzp1 = new Razorpay(options);
                
                  rzp1.on("payment.failed", function (response) {
                    alert(response.error.code);
                    alert(response.error.description);
                    alert(response.error.source);
                    alert(response.error.step);
                    alert(response.error.reason);
                    alert(response.error.metadata.order_id);
                    alert(response.error.metadata.payment_id);
                  });
                
                  rzp1.open();
                
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    
    const complete_payment = (payment_id, order_id, signature) => {
        axios.post(DJANGO_API_URL + 'razorpay/order/complete/', {
            "payment_id": payment_id,
            "order_id": order_id,
            "signature": signature,
            "amount": amount,
            "user": id
        },config)
        .then((response) => {
            console.log(response.data);
            navigate('/');
        })
        .catch((error) => {
            console.log(error.response);
        })
    }

    return (
        <div className='subscription'>

            <div className="card">
            <span className="title">Pro
                <p className="pricing">₹ 500 <span className="pricing-time">/ month</span></p>
                <span className="sub-title">Everything on Basic plus:
                <ul className="list">
                    <li className="list-item"><span className="check">✓</span> Personalized Recommendations</li>
                    <li className="list-item"><span className="check">✓</span> Unlimited Searches</li>
                    {/* <li class="list-item"><span class="check">✓</span> Feature</li>
                    <li class="list-item"><span class="check">✓</span> Feature</li>
                    <li class="list-item"><span class="check">✓</span> Feature</li> */}
                </ul>
                <button className="button">
                    <span className="text-button" onClick={razorpayPayment}>Get pro now</span>
                </button>
                </span>
            </span>
            </div>
        </div>

    )
}

export default Subscription