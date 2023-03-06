import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { checkIsAdmin, signOut } from "../store/reducers/user/adminAction";
import { getPosts } from "../store/reducers/posts/postAction";
import { IPosts } from "../types/IData";
import { BiSearch } from "react-icons/bi";
import "../styles/Posts.css";
import instagram_logo from "../images/instagram.png";
import home from "../images/fonts/home.png";
import like from "../images/fonts/like.png";
import msg from "../images/fonts/msg.png";

import trends from "../images/fonts/trends.png";
import PopUp from "./PopUp";
import AllUsers from "./AllUsers";
import Post from "./Post";

interface PostListProps {
  posts: IPosts[];
}

const Posts: React.FC<PostListProps> = () => {
  const { posts } = useAppSelector((state) => state.posts);
  const { currentUser } = useAppSelector((state) => state.admin);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkIsAdmin());
    dispatch(getPosts());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(signOut())
      .then(() => {
        // Redirect to login page
        window.location.href = "/login";
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  return (
    <>
      <div className="navbar-instagram">
        <div className="left-bar">
          <img className="instagram_logo" src={instagram_logo} alt="" />
          <div className="search-main">
            <input className="search" type="text" placeholder="Search" />
            <span className="search-icon"><i className="fa fa-search"></i></span>
          </div>
        </div>
        <div className="right-bar">
          <button className="fonts-img-button button-popup" onClick={handleLogout}>
            <img className="fonts-img" src={home} alt="" />
          </button>
          <img className="fonts-img" src={msg} alt="" />
          <PopUp />
          <img className="fonts-img" src={trends} alt="" />
          <img className="fonts-img" src={like} alt="" />
          <img className="fonts-img" src={currentUser.avatar} alt="" />
        </div>
      </div>
      <div className="form-posts">
        {posts.map((post) => (
          <Post post={post} />
        ))}
        <AllUsers />
      </div>
    </>
  );
};

export default Posts;
