import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./styles/createevent.css"
import Navbar from "./Navbar";
import Footer from "./Footer";
import { format, parseISO } from 'date-fns';
import CreateNewEvent from "./CreateNewEvent";

export default function CreateEvent(){
    const { id } = useParams();
    const [ name, setName ] = useState();
    const [eventName, setEventName] = useState("");
    const [isPrivate, setIsPrivate] = useState(false);
    const [eventDescription, setEventDescription] = useState("");
    const [eventType, setEventType] = useState("");
    const [eventTheme, setEventTheme] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [venueName, setVenueName] = useState("");
    const [venueAddress, setVenueAddress] = useState("");
    const [organizerContact, setOrganizerContact] = useState("");
    const [ticketPrice, setTicketPrice] = useState(0);
    const [expectedAttendees, setExpectedAttendees] = useState("");
    var [useOtherServices, setUseOtherServices] = useState(
      { "hosting": false, "parking": false, "catering": false, "photography":false }
);
    const ticketBooked = 0;
    // const [useOtherServices, setUseOtherServices] = useState([]);
    const eventStatus = 0;//-1=terminated, 1=ongoing
    const [ eventPoster, setPoster ] = useState("https://picsum.photos/200/300?random=3.jpg");
    const userId = id;
    var [message,setMessage] = useState("");
    
    useEffect(() => {
      axios
      .get("http://localhost:5000/user/" + id + "/createevent")
      .then((res) => {
        setName(res.data.name);
      })
      .catch((err) => {
        alert(err);
     });}, [])

     function convertToBase64(file){
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          resolve(fileReader.result)
        };
        fileReader.onerror = (err) => {
          reject(err);
        }
      })
     }
     const handleOtherServiceChange = (service) => {
      setUseOtherServices((prevState) => ({
        ...prevState,
        [service]: !prevState[service],
      }));
    };
  
  

     const handleFileUpload = async (e) => {
      const file = e.target.files[0];
      const base64 = await convertToBase64(file);
      setPoster(base64);
     }
  // const handleOtherServiceChange = (selectedService) => {
  //   if (useOtherServices.includes(selectedService)) {
  //     setUseOtherServices(
  //       useOtherServices.filter((service) => service !== selectedService)
  //     );
  //   } else {
  //     setUseOtherServices([...useOtherServices, selectedService]);
  //   }
  // };
  // const checkStartDate1= () => {
  //   var date = new Date();
  //   date=format(date, "yyyy-MM-dd'T'HH:mm");
  //   startDate>date ? setMessage("good"):setMessage("start date/time is invalid");
  // }
  // const checkStartDate2= () => {
  //   endDate>startDate ? setMessage("good"):setMessage("end date/time is invalid");
  // }



  const handleSubmit = (e) => {
    e.preventDefault();
    
    setTimeout(5000);
    const eventData = {
      eventName,
      isPrivate,
      eventDescription,
      eventType,
      eventTheme,
      startDate,
      endDate,
      venueName,
      venueAddress,
      organizerContact,
      ticketPrice,
      expectedAttendees,
      ticketBooked,
      useOtherServices,
      eventStatus,
      eventPoster,
      userId
    };

    const url = "http://localhost:5000/user/createevent";//need to replace
    var date = new Date();
    date=format(date, "yyyy-MM-dd'T'HH:mm");
    startDate>date ? endDate>startDate? organizerContact.length == 10? (axios.post(url, eventData).then((res) => {
      if (res.status === 200) {
        let eid = res.data._id;
        window.location.replace(`/user/${id}/event/${eid}/update-event`);
      } else {
        Promise.reject();
      }
    })
    .catch((err) => {
      alert(err);
    })):setMessage("Please provide proper constact information"):setMessage("end date/time is invalid"):setMessage("start date/time is invalid");

    
    }
     return (
      <div>
        <Navbar links={[]} pfpicon={true} dropdown={[{text:"Profile", path:"/user/"+id},{text:"Log Out", path:"../"}]} buttons={[]} bgcolor={"rgb(34, 34, 34)"} textcolor={"white"} linkto={"../user/"+id} username={name} logolink={"/user/"+id+"/home"}/>
        <div className="background-image-create"></div>
        <div className="eventcreatepage">
        <h2>Create Your Event</h2>
        <form className="form-event was-validated" onSubmit={handleSubmit}>
            <table className="event-table">
            
            <tr className="event-table-row">
              <td className="event-table-data1"><label className="label-event" >Event Name:</label></td>
              <td className="event-table-data2"><input
              className="form-control input-event"
                type="text"
                required
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              /></td>
            </tr>
            
            <tr className="event-table-row">
              <td className="event-table-data1"><label className=" label-event">
              Event Description:</label></td>
              <td className="event-table-data2"><textarea
              className="form-control textarea-event"
              required
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
              /></td>
            </tr>
            <tr className="event-table-row">
              <td className="event-table-data1"><label className="label-event">
              Event Type: </label></td>
              <td className="event-table-data2"><select
              required
              className="select-event"
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
              >
                <option value="Type">Select Event Type</option>
                <option value="Funeral">Funeral</option>
                <option value="Wedding">Wedding</option>
                <option value="Concert">Concert</option>
                <option value="Conference">Conference</option>
                <option value="Networking">Networking</option>
                <option value="Workshop">Workshop</option>
                <option value="Product launch">Product launch</option>
                <option value="Internal corporate">Internal corporate</option>
              </select></td>
            </tr>
            <tr className="event-table-row">
              <td className="event-table-data1"><label className="label-event">
              Event Theme:</label></td>
              <td className="event-table-data2"><input
              required
              className="form-control textarea-event"
                value={eventTheme}
                onChange={(e) => setEventTheme(e.target.value)}
              /></td>
            </tr>
            
            <tr className="event-table-row">
              <td className="event-table-data1"><label className="label-event">
              Start Date and Time:</label></td>
              <td className="event-table-data2">
                
                <input
              className="form-control input-event"
                type="datetime-local"
                required
                value={startDate}
                onChange={(e) => {setStartDate(e.target.value);}}
              />
              
              </td>
            </tr>
            <tr className="event-table-row">
              <td className="event-table-data1"><label className="label-event">
              End Date and Time:</label></td>
              <td className="event-table-data2"><input
              className="form-control input-event"
                type="datetime-local"
                required
                value={endDate}
                onChange={(e) => {setEndDate(e.target.value);}}
              /></td>
            </tr>         
            <tr className="event-table-row">
              <td className="event-table-data1"><label className="label-event">
              Venue Name:</label></td>
              <td className="event-table-data2"><input
              className="form-control input-event"
                type="text"
                required
                value={venueName}
                onChange={(e) => setVenueName(e.target.value)}
              /></td>
            </tr>
            <tr className="event-table-row">
              <td className="event-table-data1"><label className="label-event">
              Venue Address:</label></td>
              <td className="event-table-data2"><textarea
              className="form-control textarea-event"
                value={venueAddress}
                required
                onChange={(e) => setVenueAddress(e.target.value)}
              /></td>
            </tr>      
            <tr className="event-table-row">
              <td className="event-table-data1"><label className="label-event">Expected Number of Attendees:</label></td>
              <td className="event-table-data2"><input
              className="form-control input-event"
                type="number"
                required
                value={expectedAttendees}
                onChange={(e) => setExpectedAttendees(e.target.value)}
              /></td>
            </tr>     
            <tr className="event-table-row">
              <td className="event-table-data1"><label className="label-event">
              Organizer's Contact Number:</label></td>
              <td className="event-table-data2"><input
              className="input-event"
                type="number"
                value={organizerContact}
                onChange={(e) => setOrganizerContact(e.target.value)}
              /></td>
            </tr>    
            <tr className="event-table-row">
              <td className="event-table-data1"><label className="label-event" >Event Visibility</label></td>
              <td className="event-table-data2"><label className="label-options">
              <input
              className="input-event"
                type="radio"
                value="public"
                checked={!isPrivate}
                onChange={() => setIsPrivate(false)}
              />Public
              </label>
            <label className="label-options">
              <input
              className="input-event"
                type="radio"
                value="private"
                checked={isPrivate}
                onChange={() => setIsPrivate(true)}
              />  Private
              </label></td>
            </tr>     
           {!isPrivate && (<tr className="event-table-row">
              <td className="event-table-data1"><label className="label-event">
              Ticket Price:</label></td>
              <td className="event-table-data2"><input
              className="input-event"
                type="number"
                placeholder="0"
                onChange={(e) => setTicketPrice(e.target.value)}
              /></td>
            </tr>) }         
                    
            <tr className="event-table-row">
              <td className="event-table-data1"><label className="label-event">Need of other services?</label></td>
              <td className="event-table-data2"><div>
        <label className="label-options">
          <input
          className="input-event"
            type="checkbox"
            name="useOtherServices"
            value="hosting"
            checked={useOtherServices.hosting}
            onChange={(e) => handleOtherServiceChange("hosting")}
          />
          Hosting
        </label>
        <label className="label-options">
          <input
          className="input-event"
            type="checkbox"
            name="useOtherServices"
            value="parking"
            checked={useOtherServices.parking}
            onChange={(e) => handleOtherServiceChange("parking")}
          />
          Parking
        </label>
        <label className="label-options">
          <input
          className="input-event"
            type="checkbox"
            name="useOtherServices"
            value="catering"
            checked={useOtherServices.catering}
            onChange={(e) => handleOtherServiceChange("catering")}
          />
          Catering
        </label>
        <label className="label-options">
          <input
          className="input-event"
            type="checkbox"
            name="useOtherServices"
            value="photography"
            checked={useOtherServices.photography}
            onChange={(e) => handleOtherServiceChange("photography")}
          />
          Photography
        </label>
      </div></td>
            </tr>
            <tr className="event-table-row">
              <td className="event-table-data1"><label className="label-event" for="img">Upload poster:</label></td>
              <td className="event-table-data2"><input className="input-event-pic " style={{color:"black"}} type="file" id="img" name="img" accept=".jpeg, .png, .jpg" onChange={(e) => handleFileUpload(e)}/></td>
            </tr>
            
            
          </table>
          <p style={{color:"red"}}>{message}</p>
          <button className="button-event" type="submit">Create Event</button>
        </form>
        </div>
        <div className="footer"><Footer textColor={'white'}></Footer></div>
        
      </div>
    );

  };



