
import { Link } from "react-router-dom"
import "./styles/swiper.css"

export default function EventsNewCarousel({ eventarray }){
    return <div>
        <swiper-container className="home-slider" effect="coverflow" navigation="true" grab-cursor="true" centered-slides="true"
    slides-per-view="6" coverflow-effect-rotate="5" coverflow-effect-stretch="0" coverflow-effect-depth="30"
    coverflow-effect-modifier="2" coverflow-effect-slide-shadows="true" loop="true">
    {
                eventarray.map((event, index)=>{
                  // console.log(event);
                  return (
                    <swiper-slide className="swiper-slide" key={index}>
                    <img src={event.eventPoster} />
                    <h4>{event.eventName}</h4>
                    {/* <Link to={"./"} className='button'><button>Go here</button></Link> */}
                    </swiper-slide>
                  )})
                  
    }
  </swiper-container>
    </div>  
}