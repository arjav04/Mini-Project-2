import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import EventsCarousel from "./EventsCarousel";
import AllEventsCarousel from "./AllEventsCarousel"
import {Button} from 'uiw'
import { Typewriter } from 'react-simple-typewriter'
import emailjs from 'emailjs-com';
import LoadingScreen from './LoadingScreen';

import image1 from "./resources/local_ev.jpg"
import image2 from "./resources/free_ev.jpg"
import image3 from "./resources/concert_ev.jpg"
import image4 from "./resources/workshop_ev.jpg"
import image5 from "./resources/convention_ev.jpg"
import image6 from "./resources/gathering.jpg"
import image7 from "./resources/inst_ev.jpg"


export default function HomePage(){
  const { id } = useParams();
  const [user, setUser] = useState("abc");
  var [eventArray, setEventsArray] = useState([]);
  var [freeArray, setFreeArray ] = useState([]);
  var [workshopArray, setWorkshopArray ] = useState([]);
  var [concertArray, setConcertArray ] = useState([]);
  var [conventionArray, setConventionArray ] = useState([]);
  var [gatheringArray, setGatheringArray ] = useState([]);
  var [instArray, setInstArray] = useState([]);
  var [sportArray, setSportArray] = useState([]);
  var [searchInput, setSearchInput] = useState("");
  var [isDisabled,setDisabled] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
     
  
    useEffect( () => {

      const getArrays = async () => {
        setIsLoading(true);

      try{

      var res1 = await axios.get("http://localhost:5000/user/"+id+"/home");
      setUser(res1.data);


      var res2 = await axios.get("http://localhost:5000/events/concert")
      setConcertArray(res2.data);
        
      var res3 = await axios.get("http://localhost:5000/events/workshop")
      setWorkshopArray(res3.data);
    
      var res4 = await axios.get("http://localhost:5000/events/free")
      setFreeArray(res4.data);
    
      var res5 = await axios.get("http://localhost:5000/events/gathering")
      setGatheringArray(res5.data);
    
      var res6 = await axios.get("http://localhost:5000/events/convention")
      setConventionArray(res6.data);
    
      var res7 = await axios.get("http://localhost:5000/events/institute")
      setInstArray(res7.data);
    
      var res7 = await axios.get("http://localhost:5000/events/sport")
      setSportArray(res7.data);

      var res8 = await axios.get("http://localhost:5000/public-events")
        setEventsArray(res8.data);


      } catch (err){
            console.error(err);
      } finally{
        setIsLoading(false);

      }
         
    
          
        
        }
        getArrays();



    },[])



if (isLoading) {
  return <LoadingScreen  isLoading={isLoading}/>
}
        
    const checkInput = async (e) => {
      setSearchInput(e.target.value);
      e.target.value===""? setDisabled(true) : setDisabled(false);
    }

    const searchQuery = async () => {
      window.location.replace("/user/"+id+"/home/"+searchInput);
    }

    function sendEmail(e) {
      e.preventDefault();   
  
      emailjs.sendForm('service_elz3jyq', 'template_2177if5', e.target, 'DIZeXuMOOVyUyhndK')
        .then((result) => {
            window.location.reload()  
        }, (error) => {
            console.log(error.text);
        });
    }



    return (
        <div className="main-home-page" id="hpage" style={{backgroundColor:"#222"}}>
          <Navbar links={[{text:"Home", path:"./home"},{text:"parties", path:"#div1"},{text:"workshops", path:"#div2"},{text:"community", path:"#div4"},{text:"Contact", path:"#div7"}]} pfpicon={true} dropdown={[{text:"Profile", path:"/user/"+id},{text:"Log Out", path:"../"}]} buttons={[{text:"Create an Event",type:"danger", path:"/user/"+id+"/create-event#createheading"}]} bgcolor={"#444"} textcolor={"white"} linkto={"../user/"+user._id} username={user.name} logolink={"/user/"+user._id+"/home"} userpfp={user.pfp}/>
             <div className="search-filter-bar">
              <form className="searchbar-form" onSubmit={searchQuery} >
                <input className="search-input" type="text" placeholder="Search for events" onChange={(e) => checkInput(e)}/>  
                <Button className="search-button" disabled={isDisabled} onClick={searchQuery} >enter</Button>
              </form>  
              <div className="dropdown">
                  <button className="btn btn-secondary dropdown-toggle filter-dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Filter
                  </button>
                  <ul className="dropdown-menu">
                    <Link className="dropdown-item" to={"./filter/local"}><li color="#999">Events near you</li></Link>
                  </ul>
                </div>
            </div>   
                
            <div className="homepage-sidebar">
                {/* <div id="div1">
                    <img  src={image1}></img>
                    <h1  className="rowdies-text"><Typewriter words = {['Events near you!']} cursor = {false} loop={true} delaySpeed={10000} /></h1>
                </div> */}
                <div id="div1">
                    <img  src={image2}></img>
                    <h1  className="rowdies-text">
                        <Typewriter words = {['Free Events', 'Join now for free!']} cursor = {false} loop={true} delaySpeed={10000} />
                    </h1>
                </div>
                <div id="div2">
                    <img  src={image3}></img>
                    <h1  className="rowdies-text"><Typewriter words = {['Concerts', "Let's Party"]} cursor = {false} loop={true} delaySpeed={10000} /></h1>
                </div>
                <div id="div3">
                    <img  src={image4}></img>
                    <h1  className="rowdies-text"><Typewriter words = {['Workshops',"Hands on learning!"]} cursor = {false} loop={true} delaySpeed={10000} /></h1>
                </div>
                <div id="div4">
                    <img  src={image5}></img>
                    <h1  className="rowdies-text">
                        <Typewriter words = {['Conventions and Ehibitions' ]} cursor = {false} loop={true} delaySpeed={10000} />
                    </h1>
                </div>
                <div id="div5">
                    <img  src={image6}></img>
                    <h1  className="rowdies-text"><Typewriter words = {['Community events']} cursor = {false} loop={true} delaySpeed={10000} /></h1>
                </div>
                <div id="div6">
                    <img  src={image7}></img>
                    <h1  className="rowdies-text"><Typewriter words = {['Institutional events']} cursor = {false} loop={true} delaySpeed={10000} /></h1>
                </div>
                <div id="div7">
                    <img  src={image7}></img>
                    <h1  className="rowdies-text"><Typewriter words = {['Sporting events']} cursor = {false} loop={true} delaySpeed={10000} /></h1>
                </div>
            </div>
          
            { 
             eventArray.length==0 ? (<swiper-container centered-slides="true" slides-per-view='auto' style={{marginLeft:"3rem", marginTop:"1rem"}}>
             <swiper-slide style={{color:"white"}} >
               No Current Events
             </swiper-slide> 
           </swiper-container>): (
                <AllEventsCarousel eventarray={eventArray} id={id}/>
              ) 
              }
                { 
                  freeArray.length==0 ? (<swiper-container centered-slides="true" slides-per-view='auto' style={{marginLeft:"3rem", marginTop:"3rem"}} >
                  <swiper-slide style={{color:"white"}}>
                    No Current Events
                  </swiper-slide> 
                </swiper-container> ) : (
                    <EventsCarousel eventarray={freeArray} id={id}/>
                  )
                }
                { 
                  concertArray.length==0 ? (<swiper-container centered-slides="true" slides-per-view='auto' style={{marginLeft:"3rem", marginTop:"3rem"}}>
                  <swiper-slide style={{color:"white"}}>
                    No Current Events
                  </swiper-slide> 
                </swiper-container> ) : (
                    <EventsCarousel eventarray={concertArray} id={id}/>
                  )
                }
                { 
                  workshopArray.length==0 ? (<swiper-container centered-slides="true" slides-per-view='auto' style={{marginLeft:"3rem", marginTop:"3rem"}}>
                  <swiper-slide style={{color:"white"}}>
                    No Current Events
                  </swiper-slide> 
                </swiper-container> ) : (
                    <EventsCarousel eventarray={workshopArray} id={id}/>
                  )
                }
                { 
                  conventionArray.length==0 ? (<swiper-container centered-slides="true" slides-per-view='auto' style={{marginLeft:"3rem", marginTop:"3rem"}}>
                  <swiper-slide style={{color:"white"}}>
                    No Current Events
                  </swiper-slide> 
                </swiper-container> ) : (
                    <EventsCarousel eventarray={conventionArray} id={id}/>
                  )
                }
                { 
                  gatheringArray.length==0 ? (<swiper-container centered-slides="true" slides-per-view='auto' style={{marginLeft:"3rem", marginTop:"3rem"}}>
                  <swiper-slide style={{color:"white"}}>
                    No Current Events
                  </swiper-slide> 
                </swiper-container> ) : (
                    <EventsCarousel eventarray={gatheringArray} id={id}/>
                  )
                }
                { 
                  instArray.length==0 ? (<swiper-container centered-slides="true" slides-per-view='auto' style={{marginLeft:"3rem", marginTop:"3rem"}}>
                  <swiper-slide style={{color:"white"}}>
                    No Current Events
                  </swiper-slide> 
                </swiper-container> ) : (
                    <EventsCarousel eventarray={instArray} id={id}/>
                  )
                }
                { 
                  sportArray.length==0 ? (<swiper-container centered-slides="true" slides-per-view='auto' style={{marginLeft:"3rem", marginTop:"3rem"}}>
                  <swiper-slide style={{color:"white"}}>
                    No Current Events
                  </swiper-slide> 
                </swiper-container> ) : (
                    <EventsCarousel eventarray={sportArray} id={id}/>
                  )
                }
                
               <section className="contact" id="contact">
                <h1 className="rowdies-text heading">contact us </h1>
                <form className="contat-form" onSubmit={(e)=>sendEmail(e)}>
                    <div className="inputBox">
                        <input type="email" placeholder="email" name="from_email"/>
                        <input type="text" placeholder="subject" name="from_subj" />
                    </div>
                    <textarea name="message" placeholder="your message" id="" cols="30" rows="7"></textarea>
                    <div className="inputBox">
                      <div></div>
                    <input type="submit"  value="send message" className="button" />
                    </div>
                </form>
            </section>
            <div className="footer"><Footer textColor={'white'} isLogin={true} id={id}></Footer></div>
            
        </div>
    )
}