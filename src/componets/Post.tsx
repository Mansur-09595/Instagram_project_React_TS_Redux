import React from "react";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { IPosts } from "../types/IData";
import { removePosts } from "../store/reducers/posts/postAction";
import comments from "../images/fonts/comments.png";
import share from "../images/fonts/share.png";
import emojis from "../images/fonts/emojis.png";
import save from "../images/fonts/save.png";
import options from "../images/fonts/options.png";
import like from "../images/fonts/like.png";
import UpdatePopUp from "./UpdatePopUp";
import "../styles/PopUp.css";
import "../styles/Posts.css";

interface PostProps {
  post: IPosts;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const { currentUser } = useAppSelector((state) => state.admin);
  const dispatch = useAppDispatch();

  const handleDelete = (_id: string) => {
    dispatch(removePosts(_id));
  };

  return (
    <div className="card-inst" key={post._id}>
      <div className="navbar-post">
        <img className="avatar" src={post.user.avatar} alt={post.description} />
        <p className="post-username">{post.user.username}</p>

        {currentUser.username === post.user.username && (
          <div className="dropdown">
            <img className="options" src={options} alt="options" />
            <div className="dropdown-content">
              <UpdatePopUp post={post} />

              <button className="delete-button" onClick={() => handleDelete(post._id)}>
                Delete
              </button>
            </div>
          </div>
        )}
      </div>

      <img className="post-img" src={post.image} alt={post.description} />
      <div className="card-footer">
        <div className="actions-buttons">
          <div className="buttons-column">
            <img className="button-img" src={like} alt="" />
            <img className="button-img" src={comments} alt="" />
            <img className="button-img" src={share} alt="" />
          </div>
          <div className="button-save">
            <img className="button-img" src={save} alt="" />
          </div>
        </div>
        <div className="blocks-to-left">
          <div className="likes-counts">9.999 likes</div>
          <div className="in-blocks">
            <p className="post-username-in-block">{post.user.username}&nbsp;</p>
            <p className="post-description-in-block">
              {post.description.length > 75 ? `${post.description.substring(0, 75)}` : post.description}
              {post.description.length > 75 && (<span className="more">...more</span>)}
            </p>
          </div>
          <p className="coments-99">See 99 comments</p>
          <p className="hours-9">9 HOURS AGO</p>
          <div className="footer-actions">
            <div className="footer-action-left">
              <img className="button-img-emoj" src={emojis} alt="" />
              <input className="add-comment" type="text" placeholder="Add a comment..." />
            </div>
            <div className="footer-action-right">
              <a href="#" className="post-button">Post</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;