import 'bootstrap/dist/css/bootstrap.css';
import Swiper   from 'swiper';
import 'swiper/swiper-bundle.min.css';
import React, { useState }  from 'react';
import "./styles/swiper.css"
import { Link } from 'react-router-dom';


export default function EventsNewCarousel({ eventarray, id  }){
    var ticketStatus;

    return <div>
        <swiper-container className="home-slider" effect="coverflow" navigation="true" grab-cursor="true" centered-slides="false"
    slides-per-view="6" coverflow-effect-rotate="0" coverflow-effect-stretch="0" coverflow-effect-depth="0"
    coverflow-effect-modifier="2" coverflow-effect-slide-shadows="true" loop="true">
    {
                eventarray.map((event, index)=>{
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
                  )})
                  
    }
  </swiper-container>
    </div>  
}