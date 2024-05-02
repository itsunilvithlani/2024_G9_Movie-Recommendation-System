import React, { useState, useEffect, Fragment } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";

import "./style.scss";
 
import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";
import { isSubscribed } from "../../utils/api";


const Header = ({ logout, isAuthenticated }) => {
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const [subscribed, setSubscribed] = useState(null);

    useEffect(() => {
      const checkSubscription = async () => {
          const { is_subscribed } = await isSubscribed();
          if(is_subscribed === true){
            console.log(is_subscribed);
            setSubscribed(true);
          }

      }
      checkSubscription();
      // console.log(is_subscribed);
    }, [location.pathname])

    const guestLinks = () => (
      <Fragment>
        <li className="menuItem" onClick={() => navigationHandler("login")}>Login</li>
        <li className="menuItem" onClick={() => navigationHandler("signup")}>Sign Up</li>
      </Fragment>
    );

    const authLinks = () => (
      <Fragment>
        {subscribed && (
          <li className="menuItem" onClick={() => navigationHandler("foryou")}>For You</li>
        )}
        <li className="menuItem" onClick={() => navigationHandler("history")}>History</li>
        <li className="menuItem" onClick={() => navigationHandler("logout")}>Logout</li>

      </Fragment>
    );

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location]);

    const controlNavbar = () => {
      if(window.scrollY > 200){
        if(window.scrollY > lastScrollY && !mobileMenu){
          setShow("hide");
        } else {
          setShow("show");
        }
      } else {
        setShow("top");
      }
      setLastScrollY(window.scrollY);
    };

    useEffect(() => {
      window.addEventListener("scroll", controlNavbar);
      return () => {
        window.removeEventListener("scroll", controlNavbar)
      };
    }, [lastScrollY]);

    const searchQueryHandler = (event) => {
      if(event.key === "Enter" && query.length > 0){
          navigate(`/search/${query}`)
          setTimeout(() => {
            setShowSearch(false);
          }, 1000);
      }
    };

    const openSearch = () => {
      setMobileMenu(false);
      setShowSearch(true);
    };

    const openMobileMenu = () => {
      setMobileMenu(true);
      setShowSearch(false);
    };

    const navigationHandler = (type) => {
      if(type === "subscribe"){
        navigate("/subscribe");
      } 
      else if(type === "movie"){
        navigate("/explore/movie");
      } 
      else if(type === "tv"){
        navigate("/explore/tv");
      }
      else if(type === "login"){
          navigate("/login");
      }
      else if(type === "signup"){
        navigate("/signup");
      }
      else if(type === "history"){
        navigate("/history");
      }
      else if(type === "foryou"){
        navigate("/for-you");
      }
      else{
        setSubscribed(false);
        logout();
        navigate("/");
      }
      setMobileMenu(false);
    }
    return (
        <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
          <ContentWrapper>
            <div className="logo" onClick={() => navigate("/")}>
              < img src={logo} alt=""/>
              {subscribed && (
                <button class="pro_btn">
                </button>
              )}
            </div>
            <ul className="menuItems">
              {!subscribed && (
                <li className="menuItem" onClick={() => navigationHandler("subscribe")}>
                  <button className="button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 24">
                      <path d="m18 0 8 12 10-8-4 20H4L0 4l10 8 8-12z"></path>
                    </svg>
                  Unlock Pro
                  </button>

                </li>

              )}
              <li className="menuItem" onClick={() => navigationHandler("movie")}>Movies</li>
              <li className="menuItem" onClick={() => navigationHandler("tv")}>TV Shows</li>
              {isAuthenticated ? authLinks() : guestLinks()}
              <li className="menuItem">
                <HiOutlineSearch onClick={openSearch}/>
              </li>
            </ul>

            <div className="mobileMenuItems">
              <HiOutlineSearch onClick={openSearch}/>
              {mobileMenu ? <VscChromeClose onClick={() => setMobileMenu(false)}/> : <SlMenu onClick={openMobileMenu}/> }
            </div>
          </ContentWrapper>
          {showSearch && <div className="searchBar">
            <ContentWrapper>
            <div className="searchInput">
              <input type='text' 
              placeholder='Search for a movie or tv show...' 
              onKeyUp={searchQueryHandler}
              onChange={(e) => setQuery(e.target.value)}/>
              <VscChromeClose onClick={() => setShowSearch(false)}/>
            </div>
            </ContentWrapper>
          </div>}
        </header>
    );
};

const mapStateToProps = state => ({
  isAuthenticated: state.home.authReducer.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Header);