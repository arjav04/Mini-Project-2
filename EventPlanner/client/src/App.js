import './App.css';
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import LandPage from "./components/LandPage"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import CreateEvent from './components/CreateEvent';
import ProfilePage from './components/ProfilePage';
import UpdateEvent from './components/UpdateEvent';
import HomePage from './components/HomePage';
import UpdatePass from './components/UpdatePass';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import React, {useState, useEffect} from 'react';
import { format, parseISO } from 'date-fns';
import CreateNewEvent from './components/CreateNewEvent';
import ViewEvent from './components/ViewEvent';
import TicketBooking from './components/TicketBooking';
import AddressMap from './components/AddressMap';
import SearchPage from './components/SearchPage';
import FilterPage from './components/FilterPage';
import LoadingScreen from './components/LoadingScreen';
import ViewEventStatus from "./components/ViewEventStatus";

function App() {
  
  const [eventsArray, setEventsArray] = useState([]);
//  const myint=setInterval(useEffect(), 500000); 

useEffect(() =>{
  axios
        .get("http://localhost:5000/")
        .then((res) => {
          setEventsArray(res.data);
          // console.log(res.data);
  
        })
        .catch((err) => {
          alert(err);
       });
  
  
  
      var date = new Date();
      date=format(date, "yyyy-MM-dd'T'HH:mm");
      // console.log(date);
      eventsArray.map((event) => { 
        if (event.eventStatus==0 || event.eventStatus==1){
        var Sdate = parseISO(event.startDate)
        Sdate=format(Sdate, "yyyy-MM-dd'T'HH:mm");
        var Edate = parseISO(event.endDate);
        Edate = format(Edate, "yyyy-MM-dd'T'HH:mm")
        // console.log("event",Sdate,"sdate",date,"edate",Edate );
        date>=Edate ? event.eventStatus = -1 : date>=Sdate ? event.eventStatus = 1 : event.eventStatus = 0;}
      }) 
      axios
      .patch("http://localhost:5000/", eventsArray)
      .then((res) => {
        console.log(res.data.message);
      })
      .catch((err) => {
        alert(err);
     }); 
    }, [])
  // axios({
  //   method: "GET",
  //   url: "http://localhost:5000/",
  //   headers: {
  //     "Content-Type": "application/json"
  //   }
  // }).then(res => {
  //   console.log(res.data.message);
  // });


  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandPage />} />
        <Route path="/user/login" element={<LogIn />} />
        <Route path="/user/signup" element={<SignUp />} />
        <Route path="/user/:id/create-event" element={<CreateNewEvent />} />
        <Route path='/user/:id' element={<ProfilePage />} />
        <Route path="/user/:id/event/:eid/update-event" element={<UpdateEvent />}/>
        <Route path="/user/:id/home" element={<HomePage />} />
        <Route path="/user/:id/update-pass" element={<UpdatePass />} />
        <Route path="user/:id/event/:eid" element={<ViewEvent />} />
        <Route path="user/:id/event/:eid/book-ticket" element={<TicketBooking />} />
        <Route path="/map" element={<LoadingScreen />} />
        <Route path="/user/:id/home/:search" element={<SearchPage />} />
        <Route path="/user/:id/home/filter/local" element={<FilterPage />} />
        <Route path="user/:id/event/:eid/status" element={<ViewEventStatus />} />

      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
