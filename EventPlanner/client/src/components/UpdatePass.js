import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import './styles/updatepass.css';
import Navbar from "./Navbar";

export default function UpdatePass() {
    const { id } = useParams(); 
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState("abc");
  // const [eventsArray, setEventsArray ] = useState([]);
   
      

  useEffect(() => {
      const url = "http://localhost:5000/user/"+id;
      axios.get(url).then((res) =>{
          // setUser(res.data);
          setUser(res.data);
          // console.log(user, "user");
      }).catch((err) =>{
          alert(err);
      });
  }, []);

  

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

  return ( <div>
    <Navbar  links={[]} buttons={[{text:"Cancel",type:"danger", path:"/user/"+id}]} bgcolor={"rgb(34, 34, 34)"} textcolor={"white"} linkto={"../user/"+id} username={user.name}  logolink={"/user/"+id+"/home"} />
    <div className="update-profile-container">
      <h2>Update Your Profile</h2>
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
          <label>Confirm New Password</label><br/>
          <input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            className="update-profile-input"
          />
        </div>
        <button type="submit" className="update-profile-button" disabled={loading}>
          {loading ? "Updating..." : "Update Profile"}
        </button>
        {message && <div className="update-profile-message">{message}</div>}
      </form>
    </div>
    </div>
    );
}