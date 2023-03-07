/* eslint-disable eqeqeq */
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../pages/context/AuthContext";
import { useParams } from "react-router-dom";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  let { id } = useParams();

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/userposts/${user.id}`
      );
      // console.log(res.data.posts);
      setPosts(
        res.data.posts.sort((p1, p2) => {
          return new Date(p2.created_at) - new Date(p1.created_at);
        })
      );
    };

    fetchPosts();
  }, [user.id]);
  console.log(id,user.id)

  return (
    <div className="feed">
      <div className="feedWrapper">
        {user.id == id && <Share />}
        {posts.map((p) => (
          <Post key={p.id} post={p} />
        ))}
      </div>
    </div>
  );
}
