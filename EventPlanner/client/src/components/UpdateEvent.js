import React, { useState, useEffect } from "react";
import axios from "axios";
// import "./styles/updateevent.css";
import { useParams } from "react-router-dom";
import { format, parseISO } from 'date-fns';
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function UpdateEvent() {
    const { eid } = useParams();
    const { id } = useParams();
    var [user, setUser] = useState("");
    // var [eventData, setEventData] = useState(); 
    var [eventName, setEventName] = useState();
    var [isPrivate, setIsPrivate] = useState();
    var [eventDescription, setEventDescription] = useState();
    var [eventType, setEventType] = useState();
    var [eventTheme, setEventTheme] = useState();

    var [startDate, setStartDate] = useState();
    var [endDate, setEndDate] = useState();
    var [venueName, setVenueName] = useState();
    var [venueAddress, setVenueAddress] = useState();
    var [organizerContact, setOrganizerContact] = useState();
    var [ticketPrice, setTicketPrice] = useState();
    var [expectedAttendees, setExpectedAttendees] = useState("");
    var [useOtherServices, setUseOtherServices] = useState(
      { "hosting": false, "parking": false, "catering": false, "photography":false }
);    
    var [eventPoster, setPoster ] = useState();
    var [ eventStatus, setEventStatus ] = useState();
    var [ ticketBooked,setTicketBooked ] = useState();
    var  userId = id;
    var [message,setMessage] = useState("");

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
  useEffect(() => {
    const fetchEventData = async () => {
      axios
      .get("http://localhost:5000/user/" + id + "/createevent")
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        alert(err);
     });
      const url = "http://localhost:5000/events/" +eid;
      try {
        const res = await axios.get(url);
        // console.log(res.data);
        // setEventData(res.data);
        setEventName(res.data.eventName);
        setIsPrivate(res.data.isPrivate);
        setEventDescription(res.data.eventDescription);
        setEventType(res.data.eventType);
        setEventTheme(res.data.eventTheme);
        var date = parseISO(res.data.startDate);
        date=format(date, "yyyy-MM-dd'T'hh:mm:ss");
        setStartDate(date);
        date = parseISO(res.data.endDate)
        date=format(date, "yyyy-MM-dd'T'hh:mm:ss");
        setEndDate(date);
        setVenueName(res.data.venueName);
        setVenueAddress(res.data.venueAddress);
        setOrganizerContact(res.data.organizerContact);
        setTicketPrice(res.data.ticketPrice);
        setExpectedAttendees(res.data.expectedAttendees);
        // setUseOtherServices(res.data.useOtherServices);
        // console.log(useOtherServices);
        setEventStatus(res.data.eventStatus);
        setUseOtherServices(res.data.useOtherServices);
        setPoster(res.data.eventPoster);
        setTicketBooked(res.data.ticketBooked);
      } catch (error) {
        console.error("Error fetching event data", error);
      }
    };
    fetchEventData();
  }, []);

  // const handleOtherServiceChange = (selectedService) => {
  //   if (useOtherServices.includes(selectedService)) {
  //     setUseOtherServices(
  //       useOtherServices.filter((service) => service !== selectedService)
  //     );
  //   } else {
  //     setUseOtherServices([...useOtherServices, selectedService]);
  //   }
  // };

const deleteEvent = async () => {
  try{
    const res = axios.patch("http://localhost:5000/"+id+"/events/delete/"+eid);
    window.location.replace(`/user/${id}`);
    alert(await res.data.message);

  } catch(err){
    console.error(err);
  }

}


  const handleSubmit = (e) => {
    e.preventDefault();
    e.preventDefault();
   
    const updatedData = {
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

    const url = "http://localhost:5000/"+id+"/events/update/"+eid; 
    var date = new Date();
    date=format(date, "yyyy-MM-dd'T'HH:mm");
    startDate>date ? endDate>startDate? organizerContact.length == 10? (axios.patch(url, updatedData).then((res) => {
        if (res.status === 200) {
          window.location.replace(`/user/${id}`);
          alert("Event updated successfully");
        } else {
          Promise.reject();
        }
      })
      .catch((err) => {
        alert(err);
      })):setMessage("Please provide proper constact information"):setMessage("end date/time is invalid"):setMessage("start date/time is invalid");
  };

//   if (!eventData) {
//     return <div>Loading...</div>;
//   }


return (
  <div>
            <Navbar links={[]} pfpicon={true} userpfp={user.pfp} dropdown={[{text:"Profile", path:"/user/"+id},{text:"Log Out", path:"../"}]} buttons={[]} bgcolor={"rgb(34, 34, 34)"} textcolor={"white"} linkto={"../user/"+id} username={user.name} logolink={"/user/"+id+"/home"}/>
    {/* <img src={eventPoster} /> */}
    <div className="background-image-update"></div>
    <div className="eventcreatepage">
    <h2>Update Your Event</h2>
    <form className="form-event" onSubmit={handleSubmit}>
        <table className="event-table">
        
        <tr className="event-table-row">
          <td className="event-table-data1"><label className="label-event" >Event Name:</label></td>
          <td className="event-table-data2"><input
          className="input-event"
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
          <td className="event-table-data2"><input
          className="form-control input-event"
            type="datetime-local"
            required
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          /></td>
        </tr>
        <tr className="event-table-row">
          <td className="event-table-data1"><label className="label-event">
          End Date and Time:</label></td>
          <td className="event-table-data2"><input
          className="form-control input-event"
            type="datetime-local"
            required
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
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
          <td className="event-table-data1"><label className="label-event">
          Organizer's Contact Number:</label></td>
          <td className="event-table-data2"><input
          className="input-event"
            type="text"
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
                value={ticketPrice}
                onChange={(e) => setTicketPrice(e.target.value)}
              /></td>
            </tr>) }          
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
      <button className="button-event" type="submit">Update</button>
    </form>
    <button className="button-event-dlt" onClick={deleteEvent}>Terminate Event</button>
    </div>
    <div className="footer"><Footer textColor={'white'} isLogin={true} id={id}></Footer></div>
  </div>
);
  
        
      

        {/* <label>
          Additional Services:
          <div className="services-checkboxes">
            {['Catering', 'Security', 'Audio/Visual'].map((service) => (
              <div key={service}>
                <input
                  type="checkbox"
                  id={service}
                  checked={useOtherServices.includes(service)}
                  onChange={() => handleOtherServiceChange(service)}
                />
                <label htmlFor={service}>{service}</label>
              </div>
            ))}
          </div>
        </label> */}
    
}

