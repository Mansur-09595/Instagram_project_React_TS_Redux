import React, { useRef, useState } from "react";
import { updatePost } from "../store/reducers/posts/postAction";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { IPosts } from "../types/IData";
import arrow from "../images/fonts/arrow.png";
import "../styles/PopUp.css";
import "../styles/Posts.css";

interface PostUpdateProps {
  post: IPosts;
}

const UpdatePopUp: React.FC<PostUpdateProps> = ({ post }) => {
  const { currentUser } = useAppSelector((state) => state.admin);
  const [editDescription, setEditDescription] = useState<string>("");
  const dispatch = useAppDispatch();
  const popupRef = useRef<HTMLDivElement>(null);

  const openPopup = () => {
    if (popupRef.current) {
      popupRef.current.classList.add("active");
    }
  };

  const closePopup = () => {
    if (popupRef.current) {
      popupRef.current.classList.remove("active");
    }
    setEditDescription("");
  };

  const handleEdit = (_id: string, event: React.FormEvent) => {
    event.preventDefault();
    dispatch(updatePost({ _id, description: editDescription }));
    closePopup();
    setEditDescription("");
  };

  return (
    <>
      <button onClick={openPopup} className="delete-button" type="submit">
        Edit
      </button>
      <div ref={popupRef} className="overlay">
        <div className="popup-description">
          <div className="navbar-popup-description">
            <button className="fonts-img-button button" onClick={closePopup}>
              <img className="fonts-img move-arrow" src={arrow} alt="" />
            </button>
            <h2 className="create-title-description">Изменения публикации</h2>
            <a onClick={(event) => handleEdit(post._id, event)} className="share">Поделиться</a>
          </div>
          <form className="column-description">
            <div className="description-popup-column-in-update">
              <div className="data-descpt">
                <img className="avatar" src={currentUser.avatar} alt="avatar" />
                <p className="post-username-description">
                  {currentUser.username}
                </p>
              </div>

              <textarea className="input_name-in-update" value={editDescription} maxLength={2200}  placeholder="Добавьте подпись..." onChange={(e) => setEditDescription(e.target.value)}/>

              <p className="descpt-ileft">
                {`${0 + editDescription.length}/2200`}
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdatePopUp;
