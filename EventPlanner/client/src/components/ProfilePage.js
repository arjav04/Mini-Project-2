import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from "./Navbar";
import Modal from 'react-modal';
import "./styles/profile.css"
import ProfileCarousel from "./ProfileCarousel";
import MyCalendar from "./MyCalendar";
import LoadingScreen from './LoadingScreen';

const customStyles = {
    content: {
      top: '50%',
      left: '13%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
    },
  };

export default function ProfilePage(){
  const { id } = useParams();
  const [user, setUser] = useState("abc");
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [loading, setLoading] = useState(false);
  var [eventsArray, setEventsArray ] = useState([]);
  var [pfp, setPfp] = useState("");
  const [upcomArray,setUArray] = useState([]);
  const [termArray,setTArray] = useState([]);
  const [ongoArray,setOArray] = useState([]);
 const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {


    const getData= async () => {
      setIsLoading(true);
      try{
        const res1 = await axios.get("http://localhost:5000/user/"+id);
        setUser(res1.data);
        const res2 = await axios.get("http://localhost:5000/"+id+"/events/upc");
        setUArray(res2.data);
        const res3 = await axios.get("http://localhost:5000/"+id+"/events/term");
        setTArray(res3.data);
        const res4  = await axios.get("http://localhost:5000/"+id+"/events/ong");
        setOArray(res4.data);



      } catch (err){
        alert(err);
      } finally{
        setIsLoading(false);
      }
    }

    getData();

  }, []);

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



   const handleBackend = async ()=>{
    console.log(pfp);
    try{
          const res = await axios.patch("http://localhost:5000/user/"+id+"/pfp" ,{pfp: pfp});
          window.location.replace(`/user/${id}`)
      
      } catch (err){
        console.error(err);
      }
   }

   const handleFileUpload2 = async (e) => {
    const file = e.files[0];
    
    const base64 = await convertToBase64(file);
    pfp=base64;
    handleBackend();

   }

  const handleFileUpload = async (e) => {
    console.log(e.target.files);
    const file = e.target.files[0];
    
    const base64 = await convertToBase64(file);
    pfp=base64;
    handleBackend();
   }
      
   if (isLoading) {
    return <LoadingScreen  isLoading={isLoading}/>
  }



  const isPasswordValid = () => {
    return  newPassword === confirmNewPassword;
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isPasswordValid()) {
      setMessage("passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      // backend
      const url = "http://localhost:5000/user/"+id+"/update-pass";
      const obj = {
                        id,
                        currentPassword,
                        newPassword };
      const res = await axios.patch(url, obj);
      if (res.data.message === "Password updated successfully"){
        setMessage("Password updated successfully.");
        await setTimeout(8000);
        window.location.replace(`/user/${id}`);
      }
      setMessage(res.data.message || "Password updated successfully.");
    } catch (err) {
      // console.error(error);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };



    return (
        <div className="profile-page">
          <Navbar links={[]}  pfpicon={false} dropdown={[]} buttons={[{text:"Create an Event",type:"danger", path:"/user/"+id+"/create-event"}]} bgcolor={"rgb(34, 34, 34)"} textcolor={"white"} linkto={"../user/"+id} username={user.name}  logolink={"../user/"+id+"/home"}/>
          <div className="profile-sidebar">
            <div className="sidebar-top">
              <label for="img" className="drop-container-pfp" id="dropcontainer" onDragOver={(e)=>e.preventDefault()} onDragEnter={(e) => e.target.classList.add("drag-active")} onDragLeave={(e) =>e.target.classList.remove("drag-active")} onDrop={(e) => {
                e.preventDefault();
                e.target.classList.remove("drag-active");
                const fileInput = document.getElementById("img");
                fileInput.files = e.dataTransfer.files;
                handleFileUpload2(fileInput);
              }}><h5 className="rowdies-text">change pfp</h5>
              <div style={{display:"inline"}}>                            
                  <input type="file" onChange={(e) => handleFileUpload(e)} id="img" accept=".jpg, .png, .jpeg" required />
              </div>
              </label>
              {
                user.pfp===""? (<svg  style={{color: "white"}}  xmlns="http://www.w3.org/2000/svg" width="120" height="120" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
              </svg>):(<img className="pfp-image" src={user.pfp} />)
              }
              
              {/*  */}
              <h1 className="rowdies-text">{user.name}</h1>
              <p className="rowdies-text">email: {user.email}</p>
              <p className="rowdies-text">location: {user.location}</p>
            </div>
            <div className="sidebar-cal">
            {/* <MyCalendar /> */}

            </div>
            <div className="sidebar-bot">
            <button className="updt-pass" onClick={openModal}>Update Password</button>
            <Link to={"/"}><button className="lgout">Log Out</button></Link>
            </div>
          </div>
          <div className="profile-events">
          <h3 className="rowdies-text">Your Ongoing Events</h3>
            { 
              ongoArray.length==0 ? (<swiper-container centered-slides="false" slides-per-view='auto' style={{marginLeft:"0rem", marginTop:"3rem"}}>
              <swiper-slide style={{color:"white"}} >
                No Current Events
              </swiper-slide> 
            </swiper-container> ) : (
                <ProfileCarousel butn={false} dlt={false} eventarray={ongoArray} id={id}/>
              )
              }
            <h3 className="rowdies-text">Your Upcoming Events</h3>
            { 
              upcomArray.length==0 ? (<swiper-container centered-slides="false" slides-per-view='auto' style={{marginLeft:"0rem", marginTop:"3rem"}}>
              <swiper-slide style={{color:"white"}} >
                No Current Events
              </swiper-slide> 
            </swiper-container> ) : (
                <ProfileCarousel butn={true} dlt={false}  eventarray={upcomArray} id={id}/>
              )
              }
             
              <h3 className="rowdies-text">Your Terminated Events</h3>
            { 
              termArray.length==0 ? (<swiper-container centered-slides="false" slides-per-view='auto' style={{marginLeft:"0rem", marginTop:"3rem"}}>
              <swiper-slide style={{color:"white"}} >
                No Current Events
              </swiper-slide> 
            </swiper-container> ) : (
                <ProfileCarousel butn={false} dlt={true} eventarray={termArray} id={id}/>
              )
              }
              {/* <div style={{width:"400px", height:"400px"}}> */}
              {/* <AddressMap address={"vit chennai"} /></div> */}
          </div>

            
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)} style={{marginRight:"auto", marginLeft:"auto"}}>Update Password<span className="material-symbols-outlined icon2" onClick={closeModal}>cancel</span></h2>
        
        <div  className="update-profile-container">
      <form onSubmit={handleSubmit} className="update-profile-form">
        <div>
          <label>Current Password</label><br />
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="update-profile-input"
          />
        </div>
        <div>
          <label>New Password</label><br />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="update-profile-input"
          />
        </div>
        <div>
          <label>Confirm New Password</label><br />
          <input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            className="update-profile-input"
          />
        </div>
        <button className="update-profile-button" disabled={loading}>
          {loading ? "Updating..." : "Update Profile"}
        </button>
        {message && <div className="update-profile-message">{message}</div>}
      </form>
    </div>
      </Modal>

     
        </div>
    )
}
