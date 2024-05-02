import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route}  from "react-router-dom";
import { fetchDataFromApi } from './utils/api';
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfiguration, getGenres } from './store/homeSlice';
import { load_user, checkAuthenticated } from './actions/auth';
import { connect } from 'react-redux';

import PrivateRoutes from './protectedroutes/PrivateRoutes';
import PublicRoutes from './protectedroutes/PublicRoutes';

import Login from './pages/login/Login';
import ActivateAccount from './pages/activateaccount/ActivateAccount';
import Signup from './pages/signup/Signup';
import ResetPassword from './pages/resetpassword/ResetPassword';
import ResetPasswordConfirm from './pages/resetpasswordconfirm/ResetPasswordConfirm';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import Details from './pages/details/Details';
import SearchResult from './pages/searchResult/SearchResult';
import Explore from './pages/explore/Explore';
import PageNotFound from './pages/404/PageNotFound';
import Person from './pages/person/Person';
import PersonDetailsBanner from './pages/person/personDetailsBanner/PersonDetailsBanner';
import RecommendedMovies from './pages/recommendedmovies/RecommendedMovies';
import History from './pages/history/History';
import ForYou from './pages/foryou/ForYou';
import Subscription from './pages/subscription/Subscription';

function App(props) { 
    const dispatch = useDispatch();
    const { url } = useSelector((state) => state.home.homeSlice);

    useEffect(() => {
        fetchApiConfig();
        genresCall();
        props.load_user();
        props.checkAuthenticated();

    }, []);

    const fetchApiConfig = () => {
        fetchDataFromApi('/configuration')
            .then((res) => {
                console.log(res);
                const url = {
                    backdrop: res.images.secure_base_url + "original",
                    poster: res.images.secure_base_url + "original",
                    profile: res.images.secure_base_url + "original",
                };
                dispatch(getApiConfiguration(url));
            });
    };

    const genresCall = async () => {
        let promises = [];
        let endPoints = ["tv", "movie"];
        let allGenres = {};

        endPoints.forEach((url) => {
            promises.push(fetchDataFromApi(`/genre/${url}/list`))
        });

        const data = await Promise.all(promises);
        data.map(({genres}) => {
            return genres.map((item) => (allGenres[item.id] = item))
        });

        dispatch(getGenres(allGenres));
    };

    return (<BrowserRouter>
        <Header/> 
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path='/search/:query' element={<SearchResult/>}/>
            <Route path='explore/:mediaType' element={<Explore/>}/>
            <Route path='*' element={<PageNotFound/>}/>
            <Route element={<PublicRoutes />}>
                <Route exact path='/login' element={<Login/>} />
                <Route exact path='/signup' element={<Signup/>} />
                <Route exact path='/reset_password' element={<ResetPassword/>} />
                <Route exact path='/password/reset/confirm/:uid/:token' element={<ResetPasswordConfirm/>} />
                <Route exact path='/activate/:uid/:token' element={<ActivateAccount/>} />
                {/* <Route exact path='/facebook' element={<Facebook} />
                <Route exact path='/google' element={<Google} /> */}
                
            </Route>
            <Route element={<PrivateRoutes/>}>
                <Route path='/recommend-movies/:id' element={<RecommendedMovies/>}/>
                <Route path='/:mediaType/:id' element={<Details/>}/>
                <Route path='/person/:id' element={<Person/>}/>
                <Route path='/history/' element={<History/>}/>
                <Route path='/for-you/' element={<ForYou/>}/>
                <Route path='/subscribe/' element={<Subscription/>}/>
                {/* <Route path='/recommend-movies/:id' element={<RecommendedMovies/>}/> */}
            </Route>
        </Routes>
        <Footer/>
    </BrowserRouter>);  
}

export default connect(null, { checkAuthenticated, load_user })(App);
 