
import 'bootstrap/dist/css/bootstrap.css';
import Swiper   from 'swiper';
import 'swiper/swiper-bundle.min.css';
import React, { useState }  from 'react';
import "./styles/swiper.css"
import { Link } from 'react-router-dom';


export default function EventsCarousel({ eventarray, id }){
      var ticketStatus;

    
      return (
        <section className="home" id="home">
    
                <swiper-container id="home-slider"  className="home-slider" pagination="true" effect="coverflow" grab-cursor="true" centered-slides="true"
                slides-per-view='auto' coverflow-effect-rotate="0" coverflow-effect-stretch="0" coverflow-effect-depth="10"
                coverflow-effect-modifier="3" coverflow-effect-slide-shadows="true" pagination-clickable="true" style={{marginLeft:"3rem", marginTop:"3rem"}}>
                {eventarray.map((event, index)=>{
                  event.expectedAttendees>event.ticketBooked? (ticketStatus="tickets are available"):(ticketStatus="fully booked");
                  return (
                    <swiper-slide className="swiper-slide" key={index}>
                    <img src={event.eventPoster} />
                    <h4 className='rowdies-text'>{event.eventName}</h4>
                    <p className='ticket-price rowdies-text'>{event.ticketPrice} INR/H</p>
                    <p className='ticket-status rowdies-text'>{ticketStatus}</p>
                    <Link to={"/user/"+id+"/event/"+event._id}><span className="material-symbols-outlined icon1">
                      info 
                    </span></Link> 
                    {/* <Link to={"./"} className='button'><button>Go here</button></Link> */}
                    </swiper-slide>
                  
                  )})}
                  </ swiper-container> 
        </section>
      );
    }
