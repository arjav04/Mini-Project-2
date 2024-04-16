import React, { useState, useEffect } from 'react';
// import './styles/TicketBooking.css';
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from './Navbar';

const TicketBooking = () => {
    const {id} = useParams();
  const { eid } = useParams();
  const [user, setUser] = useState();
  const [eventData, setEventData] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [noOfTickets, setTickets] = useState(0);
  const [ticketBooked, setTicketB] = useState(0);
    const [email,setEmail] = useState();
    const [ticketLeft, setTicketLeft] = useState(0);
    const [isDisabled, setDisable] = useState(true);
  useEffect(() => {
      
    const fetchEventData = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get("http://localhost:5000/user/"+id)
          setUser(res.data);
          setEmail(res.data.email);
      

        const response = await axios.get(`http://localhost:5000/events/${eid}`);
        setEventData(response.data);
        setTicketB(response.data.ticketBooked);
        const left = response.data.expectedAttendees-response.data.ticketBooked;
        setTicketLeft(left);
      } catch (error) {
        setError(`Failed to fetch event data: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const totalCost = eventData.ticketPrice * noOfTickets;
    const eventName = eventData.eventName, startDate = eventData.startDate, endDate = eventData.endDate
    const obj = {ticketBooked,email,noOfTickets,eventName, startDate, endDate}
try{
    const res1 = await axios.patch("http://localhost:5000/"+id+"/event/"+eid, obj);
    if (res1) {
      window.location.replace("./");
      alert("tickets booked successfully");
    }
} catch(err){

}
  };

  if (isLoading) {
    return <div>Loading event details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const checkTick = (e) => {
    e>ticketLeft ? (setDisable(true)) : (setDisable(false));
    if (e<=ticketLeft) { setTickets(e);    setTicketB(parseInt(ticketBooked)+parseInt(e));
    };
  
  }
  // Calculate total cost
  const totalCost = eventData?.ticketPrice * noOfTickets;

  return (
        <div className='booking-page'>
                <Navbar links={[{text:"back",path:"./"}]} pfpicon={true} userpfp={user.pfp} dropdown={[{text:"Profile", path:"/user/"+id},{text:"Log Out", path:"../"}]} buttons={[{text:"Create an Event",type:"danger", path:"/user/"+id+"/create-event"}]} bgcolor={"#444"} textcolor={"white"} linkto={"../user/"+user._id} username={user.name} logolink={"/user/"+user._id+"/home"}/>
                <h2 className='rowdies-text' style={{color:"white"}}>Booking Tickets for {eventData?.eventName}</h2>
                <p className='rowdies-text'>{ticketLeft} Tickets remaining</p>
                <div className='booking-container'>
                    <form className='booking-form' onSubmit={handleSubmit}>
                        <label htmlFor='email'>Email:</label>
                        <input type="text" value={email} id='email' onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="tickets">Number of Tickets:</label>
                        <select 
                            id="tickets" 
                            value={noOfTickets} 
                            onChange={(e) => checkTick(e.target.value)} 
                        ><option>choose</option>
                            {[...Array(10).keys()].map(n => (
                              
                            <option key={n+1} value={n+1}>{n+1}</option>
                            ))}
                        </select>
                        <p><strong>Total Cost:</strong> {totalCost} INR</p>
                        <button disabled={isDisabled} type="submit">Confirm</button>
                    </form>
                </div>
                <div></div>
                <div></div>
        </div>






    // <div className="ticket-booking-container" style={{backgroundColor:"#444"}}>
    //   <h2>Booking Tickets for {eventData?.eventName}</h2>
    //   <p><strong>Price:</strong> {eventData?.ticketPrice} INR per ticket</p>
      
    //   <form onSubmit={handleSubmit}>
    //     <div>
    //         <label htmlFor='email'>email:</label>
    //         <input type="text" value={user.email} id='email' onChange={(e) => setEmail(e.target.value)} />
    //         </div>
    //         <div>
    //       <label htmlFor="tickets">Number of Tickets:</label>
         
             
    //       <p><strong>Total Cost:</strong> {totalCost} INR</p>
    //     </div>
    //     <button type="submit">Confirm Booking</button>
    //   </form>
    // </div>
  );
};

export default TicketBooking;