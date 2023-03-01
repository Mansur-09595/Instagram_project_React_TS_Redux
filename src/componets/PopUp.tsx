import React, { useRef, useState } from "react";
import add from "../images/fonts/add.png";
import arrow from "../images/fonts/arrow.png";
import "../styles/PopUp.css";
import "../styles/Posts.css";
import { useAppSelector } from "../hooks/hooks";
import { useAppDispatch } from "../hooks/hooks";
import { addPosts } from "../store/reducers/posts/postAction";

const PopUp = () => {
  const popupRef = useRef<HTMLDivElement>(null);
  const [newPost, setNewPost] = useState("");
  const [newImage, setNewImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<any>("");
  const { username, avatar } = useAppSelector((state) => state.admin.currentUser);
  const dispatch = useAppDispatch();

  const openPopup = () => {
    if (popupRef.current) {
      popupRef.current.classList.add("active");
    }
  };

  const closePopup = () => {
    if (popupRef.current) {
      popupRef.current.classList.remove("active");
    }
    setNewPost("");
    setNewImage(null);
  };

  const handleSubmit = (event: React.FormEvent) => {
    if (newPost.length && newImage) {
      event.preventDefault();
      dispatch(addPosts({ description: newPost, image: newImage }));
      closePopup();
      setImageUrl("");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setNewImage(files[0]);
      setImageUrl(URL.createObjectURL(files[0]));
    }
  };

  return (
    <>
      <button className="fonts-img-button button" onClick={openPopup} type="button">
        <img className="fonts-img" src={add} alt="" />
      </button>
      {imageUrl ? (
        <div ref={popupRef} className="overlay">
          <div className="popup-description">
          <div className="navbar-popup">
              <button className="fonts-img-button button" onClick={closePopup}>
                <img className="fonts-img" src={arrow} alt="" />
              </button>
              <h2 className="create-title">Создание публикации</h2>
              <a onClick={handleSubmit} className="close">Поделиться</a>
            </div>
            <form className="column-description">
              <img className="image-description" src={imageUrl} alt="your post" />
              <img className='avatar' src={avatar} alt="avatar" />
              <p className='post-username'>{username}</p>
              <textarea className="input_name" value={newPost} placeholder="Enter description"onChange={(event) => setNewPost(event.target.value)}/>
              {/* <button type="submit" className="">Добавить</button> */}
            </form>
          </div>
        </div>
      ) : (
        <div ref={popupRef} className="overlay">
          <div className="popup">
            <div className="navbar-popup">
              <h2 className="create-title">Создание публикации</h2>
              <a className="close" href="#" onClick={closePopup}>Закрыть</a>
            </div>
            <div className="content">
              <div className="addForm">
                <h2 className="picture-choose">Перетащите сюда фото и видео</h2>
                <form onSubmit={handleSubmit}>
                  <label htmlFor="file-input" className="file-input-button">
                    <input className="fix-none" id="file-input" type="file" onChange={handleInputChange}/>
                    Выбрать на компьютере
                  </label>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PopUp;
