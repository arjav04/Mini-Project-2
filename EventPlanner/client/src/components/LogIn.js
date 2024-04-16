import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import { useTogglePass } from "./useTogglePass";
import 'bootstrap/dist/css/bootstrap.css';
import "./styles/login_signup.css";
import Footer from "./Footer";
import Navbar from "./Navbar";
import logo from "./resources/evntor2.png"

function LogIn() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordType, setPasswordType] = useState("password");
  const [message, setMessage] = useState('');

    
    const toggle = () => {
      console.log("toggle");
      if (passwordType === "password") {
        setPasswordType("text");
        return;
      }
      setPasswordType("password");
    };

    let handleSubmit = (event) => {
      const obj = { email, password };
      const url = "http://localhost:5000/user/login";
      axios
        .post(url, obj)
        .then((res) => {
          if (res.data.message === "login successful"){
            setTimeout(10000);
            let id = res.data.user._id;
            window.location.replace(`/user/${id}/home`);
          } else{          
            setMessage(res.data.message);
          }
        })
        .catch((err) => {
          alert(err);
        });
      event.preventDefault();
    };
    return (
      <div>
        <Navbar pfpicon={false} links={[]} dropdown={[]} buttons={[]} bgcolor={"rgb(34, 34, 34)"} textcolor={"white"} logolink={"/"}/>
        <div className="background-image-login"></div>
        {/* <div className="back-image-layer-login"></div> */}
      
      <div className="container-fluid">
      <div className=" login-card">
        <div  className="card-title">
          <img className="login-img" src={logo} width="200" height="100" /><h1 className="rowdies-text login-title">Login</h1>
          </div>
        <form className="form-login" onSubmit={handleSubmit}>
          <div className="email-field">
            <input
            
              type="email"
              id="email"
              required
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="password-field">
          <input
            type={passwordType}
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => {setPassword(e.target.value)}}
          />
          <span onClick={toggle}>
            {passwordType === "password" ? (
              <svg width="20" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12.0001 5.25C9.22586 5.25 6.79699 6.91121 5.12801 8.44832C4.28012 9.22922 3.59626 10.0078 3.12442 10.5906C2.88804 10.8825 2.70368 11.1268 2.57736 11.2997C2.51417 11.3862 2.46542 11.4549 2.43187 11.5029C2.41509 11.5269 2.4021 11.5457 2.393 11.559L2.38227 11.5747L2.37911 11.5794L2.10547 12.0132L2.37809 12.4191L2.37911 12.4206L2.38227 12.4253L2.393 12.441C2.4021 12.4543 2.41509 12.4731 2.43187 12.4971C2.46542 12.5451 2.51417 12.6138 2.57736 12.7003C2.70368 12.8732 2.88804 13.1175 3.12442 13.4094C3.59626 13.9922 4.28012 14.7708 5.12801 15.5517C6.79699 17.0888 9.22586 18.75 12.0001 18.75C14.7743 18.75 17.2031 17.0888 18.8721 15.5517C19.72 14.7708 20.4039 13.9922 20.8757 13.4094C21.1121 13.1175 21.2964 12.8732 21.4228 12.7003C21.4859 12.6138 21.5347 12.5451 21.5682 12.4971C21.585 12.4731 21.598 12.4543 21.6071 12.441L21.6178 12.4253L21.621 12.4206L21.6224 12.4186L21.9035 12L21.622 11.5809L21.621 11.5794L21.6178 11.5747L21.6071 11.559C21.598 11.5457 21.585 11.5269 21.5682 11.5029C21.5347 11.4549 21.4859 11.3862 21.4228 11.2997C21.2964 11.1268 21.1121 10.8825 20.8757 10.5906C20.4039 10.0078 19.72 9.22922 18.8721 8.44832C17.2031 6.91121 14.7743 5.25 12.0001 5.25ZM4.29022 12.4656C4.14684 12.2885 4.02478 12.1311 3.92575 12C4.02478 11.8689 4.14684 11.7115 4.29022 11.5344C4.72924 10.9922 5.36339 10.2708 6.14419 9.55168C7.73256 8.08879 9.80369 6.75 12.0001 6.75C14.1964 6.75 16.2676 8.08879 17.8559 9.55168C18.6367 10.2708 19.2709 10.9922 19.7099 11.5344C19.8533 11.7115 19.9753 11.8689 20.0744 12C19.9753 12.1311 19.8533 12.2885 19.7099 12.4656C19.2709 13.0078 18.6367 13.7292 17.8559 14.4483C16.2676 15.9112 14.1964 17.25 12.0001 17.25C9.80369 17.25 7.73256 15.9112 6.14419 14.4483C5.36339 13.7292 4.72924 13.0078 4.29022 12.4656ZM14.25 12C14.25 13.2426 13.2427 14.25 12 14.25C10.7574 14.25 9.75005 13.2426 9.75005 12C9.75005 10.7574 10.7574 9.75 12 9.75C13.2427 9.75 14.25 10.7574 14.25 12ZM15.75 12C15.75 14.0711 14.0711 15.75 12 15.75C9.92898 15.75 8.25005 14.0711 8.25005 12C8.25005 9.92893 9.92898 8.25 12 8.25C14.0711 8.25 15.75 9.92893 15.75 12Z" fill="#080341"/>
              </svg>
              
            ) : (
              <svg fill="#000000" width="20" height="17" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M 3.71875 2.28125 L 2.28125 3.71875 L 8.5 9.90625 L 19.59375 21 L 21.5 22.9375 L 28.28125 29.71875 L 29.71875 28.28125 L 23.5 22.0625 C 27.734375 19.964844 30.574219 16.851563 30.75 16.65625 L 31.34375 16 L 30.75 15.34375 C 30.480469 15.042969 24.085938 8 16 8 C 14.042969 8 12.195313 8.429688 10.5 9.0625 Z M 16 10 C 18.152344 10 20.1875 10.605469 22 11.4375 C 22.644531 12.515625 23 13.734375 23 15 C 23 16.816406 22.296875 18.476563 21.15625 19.71875 L 18.3125 16.875 C 18.730469 16.363281 19 15.714844 19 15 C 19 13.34375 17.65625 12 16 12 C 15.285156 12 14.636719 12.269531 14.125 12.6875 L 12.09375 10.65625 C 13.335938 10.273438 14.636719 10 16 10 Z M 6.6875 10.90625 C 3.480469 12.878906 1.398438 15.175781 1.25 15.34375 L 0.65625 16 L 1.25 16.65625 C 1.507813 16.945313 7.429688 23.425781 15.0625 23.9375 C 15.371094 23.96875 15.683594 24 16 24 C 16.316406 24 16.628906 23.96875 16.9375 23.9375 C 17.761719 23.882813 18.566406 23.773438 19.34375 23.59375 L 17.5625 21.8125 C 17.054688 21.929688 16.539063 22 16 22 C 12.140625 22 9 18.859375 9 15 C 9 14.46875 9.070313 13.949219 9.1875 13.4375 Z M 7.25 12.9375 C 7.089844 13.613281 7 14.300781 7 15 C 7 16.738281 7.488281 18.339844 8.34375 19.71875 C 6.054688 18.40625 4.304688 16.867188 3.40625 16 C 4.152344 15.277344 5.496094 14.078125 7.25 12.9375 Z M 24.75 12.9375 C 26.503906 14.078125 27.84375 15.277344 28.59375 16 C 27.695313 16.867188 25.917969 18.4375 23.625 19.75 C 24.484375 18.371094 25 16.738281 25 15 C 25 14.300781 24.910156 13.609375 24.75 12.9375 Z"/></svg>
            )}
          </span></div>
          
          <button className="submit-butn" type="submit">LOG IN</button>
        </form>
        {message && <div className="signup-message">{message}</div>}

        <p>Create an account? <Link className="link-underline link-underline-opacity-0" to="/user/signup">Signup</Link></p>
      </div>
      </div>
      <div className="footer"><Footer textColor={'white'} isLogin={false}></Footer></div>
    </div>
    );
  }
  
  export default LogIn;