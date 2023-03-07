import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../pages/context/AuthContext";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);

  const likeHandler = () => {
    try {
      const like = async () => {
        await axios.post(`http://127.0.0.1:8000/api/auth/postlike/${post.id}`, {
          id: post.user_id,
        }).then(res=>{
          console.log(res.data.postLikes);
          setLike(res.data.postLikes);
        })
      };
      like();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const postLikes = async () => {
      await axios.get(`http://127.0.0.1:8000/api/auth/postshow/${post.id}`);
      setLike(post?.likes?.length);
    };
    postLikes();
  }, [post.id]);
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link
              to={`profile/${user.id}`}
              styles={{ TextDecoderation: "none" }}>
              <img
                className="postProfileImg"
                src={
                  user.profilePicture
                    ? user.profilePicture
                    : PF + "person/avatar.png"
                }
                alt=""
              />
            </Link>
            <span className="postUsername">{user.name}</span>
            <span className="postDate">{format(post.created_at)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src="assets/like.png"
              onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIcon"
              src="assets/heart.png"
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
