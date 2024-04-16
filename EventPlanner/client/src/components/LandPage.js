import React, { useEffect, useState } from "react";
import "./styles/homepage.css"
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Typewriter from 'typewriter-effect';
import { Button } from 'uiw';
import EventsNewCarousel from "./EventsNewCarousel";
import Footer from "./Footer";
import LoadingScreen from './LoadingScreen';
import image from "./resources/local.jpg"


export default function LandPage(){
    const [pubEventsArray, setPubEventsArray ] = useState([]);
const [isLoading, setIsLoading] = useState(true);
    useEffect( () => {
      const getData = async () => {
        try{
          const res = await axios.get("http://localhost:5000/public-events");
          setPubEventsArray(res.data);

          }catch(err) {
            alert(err);
         } finally{
          setIsLoading(false);

         }

        };
        getData();
        }, []);

        if (isLoading) {
          return <LoadingScreen  isLoading={isLoading}/>
        }
        

    return  (
    <div className="landpagebody">    
    
        <Navbar  dropdown={[]} bgcolor={"rgb(34, 34, 34)"} textcolor={"white"} links={[]} buttons={[{text:"login",type:"success", path:"./user/login"}]} logolink={"/"}/>
        {/* <div className="background-image-land"></div> */}

        <h1 className="rowdies-text">Welcome to EVNTORY</h1>
        <h3 className="rowdies-text">The inventory for all your events</h3>
        <h2 className="rowdies-text">Create your <Typewriter
  options={{
    strings: ['Weddings', 'Meetings', 'Parties'],
    autoStart: true,
    delay:80,
    loop: true,
  }}
/> with us</h2>
{ 
  pubEventsArray.length==0 ? (<swiper-container centered-slides="true" slides-per-view='auto' >
  <swiper-slide style={{color:"white"}}>
    No Current Events
  </swiper-slide> 
</swiper-container> ) : (
    <EventsNewCarousel eventarray={pubEventsArray}/>
  )
}
        <Link to={"./user/signup"}><Button className="rowdies-text" icon="login" type="danger">Create an event now</Button></Link>

        <section className="service" id="service">

<h1 className="heading rowdies-text"> Our Services</h1>

<div className="box-container">

<div className="box">    
<i className="fa fa-map-marker-alt"></i>    
<h3>Event Planning</h3>
            <p style={{color:"#999"}}>Seamless event planning, turning your vision into reality. From coordination to creative flair, make your event unforgettable with us.</p>


</div>

<div className="box">    
    <i className="fa fa-envelope"></i>    
    <h3>Event Management</h3>
            <p style={{color:"#999"}}>Elevate your events with precision and flair. Our expert event management ensures seamless execution, leaving you free to savor every moment.</p>

    
</div>

<div className="box">    
    <i className="fa fa-music"></i>    
    <h3>Ticket Selling</h3>
            <p style={{color:"#999"}}>Secure your spot effortlessly! Explore exciting events and grab your tickets hassle-free. Elevate your experiences with convenient and quick ticket selling.</p>

    
</div>

<div className="box">    
    <i className="fa fa-utensils"></i>  
    <h3>Venue Selection</h3>
            <p style={{color:"#999"}}>Discover the perfect venue effortlessly. Our curated selection ensures your event is set in the ideal space, creating unforgettable moments in the perfect setting.</p>  
   
    
</div>

<div className="box">    
    <i className="fa fa-photo-video"></i>    
    <h3>Photography</h3>
            <p style={{color:"#999"}}>Capture and relive the special moments with professional photography and videography.</p>
    
</div>

<div className="box">    
    <i className="fa fa-birthday cake"></i>    
    <h3>Food and Drinks</h3>
            <p style={{color:"#999"}}>Indulge in a variety of catering options for a delightful culinary experience.</p>

    
</div>

</div>

</section>
<section className="about" id="about">
<h1 className="heading rowdies-text">About Us </h1>
<div className="row">
<div className="image">
<img src={image} />
</div>
<div className="content" >
<h3 style={{color:"white"}}>Your Special Celebration Awaits</h3>
            <p style={{color:"#999"}}>
              At EVNTORY, we strive to make every celebration extraordinary. Our team is dedicated to crafting
              unforgettable experiences tailored to your unique preferences.
            </p>
            <p style={{color:"#999"}}>
              Whether it's a wedding, corporate meeting, or a lively party, we ensure every detail is perfect for a
              celebration that lingers in the hearts of you and your guests.
            </p>
</div>
</div>

</section>
<div className="footer"><Footer textColor={'white'} isLogin={false}></Footer></div>

    </div>
    )
}