import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import EventsCarousel from "./EventsCarousel";
import {Button} from 'uiw'
import ClipLoader from "react-spinners/ClipLoader";

const override= {CSSProperties :{
  display: "block",
  margin: "0 auto",
  borderColor: "red",
}};
export default function SearchPage(){
    const { id } = useParams();
    const {search} = useParams();
    const [user, setUser] = useState("abc");
    var [searchArray, setSearchArray ] = useState([]);
    var [searchInput, setSearchInput] = useState("");
    var [isDisabled,setDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');



    useEffect( () => {

        const getArrays = async () => {
      try{
                setIsLoading(true);
                  var res1 = await axios.get("http://localhost:5000/user/"+id+"/home");
                setUser(res1.data);
                var res = await axios.get("http://localhost:5000/events/search/"+search)
                   console.log(res.data);
                   setSearchArray(res.data);

                 } catch (err){
                   console.error(err);
                 } finally {
                  setIsLoading(false);

                 }
                }
                getArrays();
        
        
        
            },[])


    const checkInput = async (e) => {
        setSearchInput(e.target.value);
        e.target.value===""? setDisabled(true) : setDisabled(false);
      }
  
      const searchQuery = async () => {
        window.location.replace("/user/"+id+"/home/"+searchInput);
      }

      if (isLoading) {
        return <div><p>Loading...</p><ClipLoader
        color={"red"}
        loading={isLoading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      /></div> ;
      }
    
      if (error) {
        return <div>Error: {error}</div>;
      }


    return (
        <div className="main-home-page" id="hpage" style={{backgroundColor:"#222"}}>
            <Navbar userpfp={user.pfp} links={[{text:"Home", path:"./"}]} pfpicon={true} dropdown={[{text:"Profile", path:"/user/"+id},{text:"Log Out", path:"../"}]} buttons={[{text:"Create an Event",type:"danger", path:"/user/"+id+"/create-event#createheading"}]} bgcolor={"#444"} textcolor={"white"} linkto={"../user/"+user._id} username={user.name} logolink={"/user/"+user._id+"/home"}/>
            <div className="search-filter-bar">
              <form className="searchbar-form" >
                <input className="search-input" type="text" placeholder="Search for events" onChange={(e) => checkInput(e)}/>  
                <Button className="search-button" disabled={isDisabled} onClick={searchQuery} >enter</Button>
              </form>  
              
            </div>


            <div className="homepage-sidebar-b">
                {/* <div id="div1">
                    <img  src={image1}></img>
                    <h1  className="rowdies-text"><Typewriter words = {['Events near you!']} cursor = {false} loop={true} delaySpeed={10000} /></h1>
                </div> */}
                <div id="diva">
                    <img  src="https://picsum.photos/160/200?random=3.jpg"></img>
                    <h1  className="rowdies-text">
                        Showing results for "{search}"
                    </h1>
                </div>
</div>
                { 
                  searchArray.length==0 ? (<swiper-container centered-slides="true" slides-per-view='auto' style={{marginLeft:"3rem", marginTop:"3rem"}} >
                  <swiper-slide style={{color:"white"}}>
                    No Current Events
                  </swiper-slide> 
                </swiper-container> ) : (
                    <EventsCarousel eventarray={searchArray} id={id}/>
                  )
                }
               
            

        </div>
    )
}