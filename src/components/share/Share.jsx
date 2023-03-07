import "./share.css";
import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons";
import { useContext, useState } from "react";
import { AuthContext } from "../../pages/context/AuthContext";
import { useRef } from "react";
import axios from "axios";

export default function Share() {
  const { user, PF } = useContext(AuthContext);
  const desc = useRef();
  const [file, setFile] = useState({});
  const submitHandler = (e) => {
    e.preventDefault();
    
      const data = new FormData()
      data.append('img', file)
      data.append("title", "dffdds");
      data.append("desc", desc.current.value);
      data.append("user_id", user.id);
    
    try {
      const postStore = async () => {
        await axios
          .post("http://127.0.0.1:8000/api/auth/poststore", data)
          .then((res) => {
            console.log(res.data);
          });
          // console.log(file)
      };
      postStore()
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              user.profilePicture
                ? user.profilePicture
                : PF + "person/avatar.png"
            }
            alt=""
          />
          <input
            placeholder={`What's in your mind ${user.name}?`}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        <form
          className="shareBottom"
          onSubmit={submitHandler}
          enctype="multipart/form-data">
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}
