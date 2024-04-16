
import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./styles/createevent.css"
import "./styles/create.css"
import Navbar from "./Navbar";
import Footer from "./Footer";
import { format, parseISO } from 'date-fns';

export default function CreateNewEvent(){
    const { id } = useParams();
    const [ user, setUser ] = useState("");
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
    const [ eventPoster, setPoster ] = useState("https://picsum.photos/160/200?random=3.jpg");
    const userId = id;
    var [message,setMessage] = useState("");
    const registeredUsers = [{}];
    
    useEffect(() => {
      axios
      .get("http://localhost:5000/user/" + id + "/createevent")
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
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
  
  

     const handleFileUpload2 = async (e) => {
      const file = e.files[0];
      const base64 = await convertToBase64(file);
      setPoster(base64);
     }

  
    
      const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setPoster(base64);
       }

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
          userId,
          registeredUsers
        };
    
        const url = "http://localhost:5000/user/createevent";//need to replace
        var date = new Date();
        date=format(date, "yyyy-MM-dd'T'HH:mm");
        startDate>date ? endDate>startDate? organizerContact.length == 10? (axios.post(url, eventData).then((res) => {
          if (res.status === 200) {
            let eid = res.data._id;
            window.location.replace(`/user/${id}/home`);
          } else {
            Promise.reject();
          }
        })
        .catch((err) => {
          alert(err);
        })):setMessage("Please provide proper contact information"):setMessage("end date/time is invalid"):setMessage("start date/time is invalid");
    }

const customStyle={
    width: "75%",
    height: "100%",
    dislay: "flex",
    justifyContent: "center",
    alignItems: "center",
}

const customSlideStyle={
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "18px",
    fontSize: "22px",
    fontWeight: "bold",
    color: "#fff",
    height: "40rem",
    width: "60rem",

    backgroundColor: "rgb(50,50,50)"
}
    return (
        <div className="create-page" id="createpage">        
            <Navbar links={[]} pfpicon={true} userpfp={user.pfp} dropdown={[{text:"Profile", path:"/user/"+id},{text:"Log Out", path:"../"}]} buttons={[]} bgcolor={"rgb(34, 34, 34)"} textcolor={"white"} linkto={"../user/"+id} username={user.name} logolink={"/user/"+id+"/home"}/>
            <div className="background-image-create"></div>
        <div className="create-container">
        <h1 id="createheading" className="rowdies-text" style={{color:"white"}}>Create a new Event</h1>

            <form className="form-create was-validated">
                <swiper-container className="mySwiper" css-mode="false" pagination-clickable="true" grab="false" keyboard="true" mousewheel="false" pagination="true" navigation="true" effect="cards" grab-cursor="false" centered-slides="true"  slides-per-view='auto' style={customStyle}>
                    <swiper-slide style={customSlideStyle}>
                    <table className="create-table">
                        <tr className="create-table-row">
                            <td className="create-table-data1"><label className="label-create" >Event Name:</label></td>
                            <td className="create-table-data2"><input
                            className="form-control input-create"
                            type="text"
                            required
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                            /></td>
                        </tr>

                        <tr className="create-table-row">
                        <td className="create-table-data1"><label className="label-create">
                        Event Type: </label></td>
                        {/* <td className="create-radio-table-data2">
                            <div className="radio-create">
                                <label >
                                    <img src="https://picsum.photos/200/100?random=3.jpg"/>
                                    <input type="radio" for="type" value="wedding" onSelect={() => setEventType("wedding")}/>
                                Wedding
                                </label>
                            </div>
                        </td>
                        <td className="create-table-data2">
                            <div className="radio-create">
                                <label >
                                    <img src="https://picsum.photos/200/100?random=5.jpg"/>
                                    <input type="radio" for="type" value="wedding" onSelect={() => setEventType("wedding")}/>
                                Wedding
                                </label>
                            </div>
                        </td>
                        <td className="create-table-data2">
                            <div className="radio-create">
                                <label >
                                    <img src="https://picsum.photos/200/100?random=4.jpg"/>
                                    <input type="radio" for="type" value="wedding" onSelect={() => setEventType("wedding")}/>
                                Wedding
                                </label>
                            </div>
                        </td> */}
                        <td className="create-table-data2"><select
                        required
                        className="select-create"
                            value={eventType}
                            onChange={(e) => setEventType(e.target.value)}
                        >
                            <option value="Type">Select Event Type</option>
                            <option value="wedding">Wedding</option>
                            <option value="getogether">Get-together</option>
                            <option value="concert">Concert/Party</option>
                            <option value="meeting">Conference Meeting</option>
                            <option value="workshop">Workshop</option>
                            <option value="gathering">Social/ Community Event</option>
                            <option value="convention">Convention/ Exhibition</option>
                            <option value="product launch">Product launch</option>
                            <option value="fests">Institutional Events</option>
                            <option value="sport">Sporting Events</option>
                        </select></td>
                        </tr>
                        
                        <tr className="create-table-row">
                            <td className="create-table-data1"><label className=" label-create">
                            Event Description:</label></td>
                            <td className="create-table-data2"><textarea
                            className="form-control textarea-create"
                            required
                            value={eventDescription}
                            onChange={(e) => setEventDescription(e.target.value)}
                            /></td>
                        </tr>

                        <tr className="create-table-row">
                            <td className="create-table-data1"><label className="label-create">
                            Event Theme:</label></td>
                            <td className="create-table-data2"><input
                            required
                            className="form-control textarea-create"
                            value={eventTheme}
                            onChange={(e) => setEventTheme(e.target.value)}
                            /></td>
                        </tr>
                    </table>
                    </swiper-slide>
                    
                    <swiper-slide style={customSlideStyle}>
                    <table className="create-table">
                    <tr className="create-table-row">
                        <td className="create-table-data1"><label className="label-create">
                        Start Date and Time:</label></td>
                        <td className="create-table-data2">
                            
                            <input
                        className="form-control input-create"
                            type="datetime-local"
                            required
                            value={startDate}
                            onChange={(e) => {setStartDate(e.target.value);}}
                        />
                        
                        </td>
                        </tr>
                        <tr className="create-table-row">
                        <td className="create-table-data1"><label className="label-create">
                        End Date and Time:</label></td>
                        <td className="create-table-data2"><input
                        className="form-control input-create"
                            type="datetime-local"
                            required
                            value={endDate}
                            onChange={(e) => {setEndDate(e.target.value);}}
                        /></td>
                        </tr>         
                        <tr className="create-table-row">
                        <td className="create-table-data1"><label className="label-create">
                        Venue Name:</label></td>
                        <td className="create-table-data2"><input
                        className="form-control input-create"
                            type="text"
                            required
                            value={venueName}
                            onChange={(e) => setVenueName(e.target.value)}
                        /></td>
                        </tr>
                        <tr className="create-table-row">
                        <td className="create-table-data1"><label className="label-create">
                        Venue Address:</label></td>
                        <td className="create-table-data2"><textarea
                        className="form-control textarea-create"
                            value={venueAddress}
                            required
                            onChange={(e) => setVenueAddress(e.target.value)}
                        /></td>
                        </tr>
                    </table>
                    </swiper-slide>
                    <swiper-slide style={customSlideStyle}>
                    <table className="create-table">
                    <tr className="create-table-row">
                        <td className="create-table-data1"><label className="label-create">Number of Attendees:</label></td>
                        <td className="create-table-data2"><input
                        className="form-control input-create"
                            type="number"
                            required
                            value={expectedAttendees}
                            onChange={(e) => setExpectedAttendees(e.target.value)}
                        /></td>
                    </tr>     
                <tr className="create-table-row">
              <td className="create-table-data1"><label className="label-create">
              Organizer's Contact Number:</label></td>
              <td className="create-table-data2"><input
              className="form-control input-create"
                type="number"
                required
                value={organizerContact}
                onChange={(e) => setOrganizerContact(e.target.value)}
              /></td>
            </tr> 
                    <tr className="create-table-row">
                        <td className="create-table-data1"><label className="label-create" >Event Visibility</label></td>
                        <td className="create-table-data2"><label className="label-options">
                        <input
                        className="input-create"
                            type="radio"
                            value="public"
                            checked={!isPrivate}
                            onChange={() => setIsPrivate(false)}
                        />Public
                        </label>
                        <label className="label-options">
                        <input
                        className="input-create"
                            type="radio"
                            value="private"
                            checked={isPrivate}
                            onChange={() => setIsPrivate(true)}
                        />  Private
                        </label></td>
                        </tr>     
                    {!isPrivate && (<tr className="create-table-row">
                        <td className="create-table-data1"><label className="label-create">
                        Ticket Price:</label></td>
                        <td className="create-table-data2"><input
                        className="input-create"
                            type="number"
                            placeholder="0"
                            onChange={(e) => setTicketPrice(e.target.value)}
                        /></td>
                        </tr>) } 
                    </table>
                    </swiper-slide>
                    <swiper-slide style={customSlideStyle}>
                    <table className="create-table">
                    <tr className="create-table-row">
                        <td className="create-table-data1"><label className="label-create">Need of other services?</label></td>
                        <td className="create-table-data2"><div>
                    <label className="label-options">
                    <input
                    className="input-create"
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
                    className="input-create"
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
                    className="input-create"
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
                    className="input-create"
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
                        <tr className="create-table-row">
                            <td className="create-table-data1"><label className="label-create" for="img">Upload poster:</label></td>
                            <td className="create-table-data2">
                        <label for="img" className="drop-container" id="dropcontainer" onDragOver={(e)=>e.preventDefault()} onDragEnter={(e) => e.target.classList.add("drag-active")} onDragLeave={(e) =>e.target.classList.remove("drag-active")} onDrop={(e) => {
    e.preventDefault();
    e.target.classList.remove("drag-active");
    const fileInput = document.getElementById("img");
    fileInput.files = e.dataTransfer.files;
    handleFileUpload2(fileInput);
  }}>
                            <div className="drop-title">Drop files here</div>
                            <div>or</div>
                            <div style={{display:"inline"}}>                            
                                <input type="file" onChange={(e) => handleFileUpload(e)} id="img" accept=".jpg, .png, .jpeg" required />
                            </div>
                            </label>
                            </td>
                        </tr>
                        
                        
                        
                    </table>
                    <p style={{color:"red"}}>{message}</p>
                    <button className="button-create" type="submit"  onClick={handleSubmit}>Create Event</button>
        
                   
                    </swiper-slide>

                    {/* <swiper-slide style={customSlideStyle}>
                    <table className="create-table">

                    </table>
                    </swiper-slide> */}
                </swiper-container>
            </form>
        </div>
        <div className="footer"><Footer textColor={'white'} isLogin={true} id={id}></Footer></div>

        </div>
    )
}