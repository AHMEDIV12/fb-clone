import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
    let { id } = useParams();

   const [user, setUser] = useState({});
   const PF = process.env.REACT_APP_PUBLIC_FOLDER;

   
  // console.log(user);

   useEffect(() => {
     const fetchUser = async () => {
       const res = await axios.get(
         `http://127.0.0.1:8000/api/user/${id}`
       );
      setUser(res.data.user);
     };
     if (typeof id == "undefined") {
      setUser(JSON.parse(localStorage.getItem("user")));
     }else{fetchUser();}
}, [id]);

console.log(user);
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user.profilePicture
                    ? user.coverPicture
                    : PF + "person/avatar.png"
                }
                alt=""
              />
              <img
                className="profileUserImg"
                src={
                  user.profilePicture
                    ? user.profilePicture
                    : PF + "person/avatar.png"
                }
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.name}</h4>
              <span className="profileInfoDesc">{user.email}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
