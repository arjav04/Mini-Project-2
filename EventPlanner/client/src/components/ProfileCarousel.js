
import 'bootstrap/dist/css/bootstrap.css';
import 'swiper/swiper-bundle.min.css';
import React, { useEffect }  from 'react';
import "./styles/swiper.css"
import { Link } from 'react-router-dom';
import axios from 'axios';

const profileStyle={
    display: "block",
    justifyContent: "start",
    position: "relative",
    left: "0",
    width: "68rem"
    
}



export default function ProfileCarousel({ butn, eventarray, id, dlt }){


  const deleteEvent = async (event) => {
    console.log(event);
    const res = await axios.post("http://localhost:5000/event/"+event._id+"/delete");
    try {
      alert("event deleted successfully");
      window.location.reload();
    } catch(err){
      alert(err);
    }
  }
      return (
        <section className="home" id="home">
    
                <swiper-container    grab-cursor="true" centered-slides="false"
                slides-per-view='auto' style={profileStyle}>
                {eventarray.map((event, index)=>{
                  // console.log(event);
                  return (
                    <swiper-slide className="swiper-slide" key={index}>
                    <img src={event.eventPoster} />
                    <h4 className='rowdies-text'>{event.eventName}</h4>
                    {/* <Link className='button' to={"/user/"+id+"/event/"+event._id}>
                      <buton>Update</buton>  
                    </Link>  */}
                    {butn &&
                    (<div className='button'><Link to={"/user/"+id+"/event/"+event._id+"/update-event"} ><button>Update/Terminate</button></Link><br />
                    <Link to={"/user/"+id+"/event/"+event._id+"/status"} ><button>View Status</button></Link></div>)
                    }
                    
                    {dlt && (
                      <button className='button' onClick={()=>deleteEvent(event)}>Delete</button>
                    )}
                    </swiper-slide>
                  
                  )})}
                  </ swiper-container> 
        </section>
      );
    }
