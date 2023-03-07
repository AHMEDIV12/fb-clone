/* eslint-disable eqeqeq */
import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../pages/context/AuthContext";
import { Add, Remove } from "@material-ui/icons";

export default function Rightbar({ user }) {
  console.log(user)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    const getFriends = async () => {
      const friendList = await axios.get(
        `http://127.0.0.1:8000/api/auth/followings/${user.id}`
      );
      setFriends(friendList.data.followings);
      console.log(friendList)
    };
    getFriends();
  }, [user.id]);
  console.log(friends);

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="{PF +gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src={PF + "ad.png"} alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [followed, setFollowed] = useState(null);
    const { user: currentUser } = useContext(AuthContext);
    let { id } = useParams() ;

    useEffect(() => {
      setFollowed(currentUser.following.includes(id));
    }, [currentUser, id]);

    const handleClick = async () => {
      if (followed) {
        await axios
          .put(`http://127.0.0.1:8000/api/auth/unfollow/${id}`, { id: currentUser.id })
          .then((res) => {
            console.log(res);
          });
      } else {
        await axios
          .put(`http://127.0.0.1:8000/api/auth/follow/${id}`, {
            id: currentUser.id,
          })
          .then((res) => {
            console.log(res);
          });
      }
      setFollowed(!followed)
    };

    return (
      <>
        {currentUser.id !=id && (typeof id != "undefined") && (
          <button className="rightbarfollowbutton" onClick={handleClick}>
            {followed ? "unfollow" : "follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{user.relationship}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.length !== 0 ? (
            friends.map((friend) => (
              <Link
                to={`/profile/${friend.id}`}
                style={{ textDecoration: "none" }}>
                <div className="rightbarFollowing">
                  <img
                    src={friend.img ? friend.img : PF + "person/1.jpeg"}
                    alt=""
                    className="rightbarFollowingImg"
                  />
                  <span className="rightbarFollowingName">{friend.name}</span>
                </div>
              </Link>
            ))
          ) : (
            <h4 className="rightbarTitle">User has no friends</h4>
          )}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
