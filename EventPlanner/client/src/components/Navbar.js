import React, { useState } from "react";
import { Link } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import "./styles/navbar.css"
import logo from "./resources/evntory-logo.png"
import { Button } from 'uiw';

export default function Navbar({bgcolor, textcolor, links, buttons, username,userpfp, linkto, logolink, dropdown, pfpicon}){

    return (
        <div>
            <nav className="navbar navbar-expand-lg p-0" style={{backgroundColor: `${bgcolor}`}}>
  <div className="container-fluid p-0" >
    <a className="navbar-brand" style={{color: `${textcolor}`,marginLeft: "10px"}} href={logolink}>      
        <img src={logo} alt="logo" width="100" height="45" />
    </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse"  id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {
            links.map((link, index)=>{
                return (
                    <li className="nav-item" key={index}>
                        <a className="nav-link" style={{color: `${textcolor}`}} href={link.path}>{link.text}</a>
                    </li>
                )
            })
        }
        
      </ul>
      <form className="d-flex" role="search">
      {
            buttons.map((butn, index)=>{
                return (
                    <Link to={butn.path} style={{marginRight:"5px"}} key={index}><Button className="rowdies-text" type={butn.type}>{butn.text}</Button></Link>
                )
            })
        }
       
      </form>
     
      {/* <Link to={linkto} className="pfp dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="true"> */}
      <div className="dropdown">
      {
        pfpicon && (
           (<Button style={{backgroundColor:"#444"}} className="pfp dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="true">
              <div className="pfpname rowdies-text"  style={{color: `${textcolor}`}}>{username}</div>
              { userpfp==="" ? (<svg  style={{color: `${textcolor}`}}  xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                </svg>):(<img className="navbar-pfp" src={userpfp} />)
                
        }
          </Button>)
        )

      }
          { dropdown && (
          <ul className="dropdown-menu" style={{backgroundColor:`${bgcolor}`}} >
            { dropdown && (
              dropdown.map((dpdn, index)=>{
                return (
                  <Link className="dropdown-item" to={dpdn.path} key={index}><li style={{color:`${textcolor}`}}>{dpdn.text}</li></Link>
                )
            })) }
            </ul>
          )}</div>
 
        
      

  {/* </Link> */}

          
    </div>
  </div>
</nav>
        </div>
    )
}