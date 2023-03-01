import React, { useRef, useState } from "react";
import add from "../images/fonts/add.png";
import arrow from "../images/fonts/arrow.png";
import "../styles/PopUp.css";
import "../styles/Posts.css";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { addPosts } from "../store/reducers/posts/postAction";

const PopUp = () => {
  const popupRef = useRef<HTMLDivElement>(null);
  const [newPost, setNewPost] = useState("");
  const [newImage, setNewImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<any>("");
  const { currentUser } = useAppSelector((state) => state.admin);
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
    setImageUrl("");
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
      <button className="fonts-img-button button-popup" onClick={openPopup} type="button">
        <img className="fonts-img" src={add} alt="" />
      </button>
      {imageUrl ? (
        <div ref={popupRef} className="overlay">
          <div className="popup-description">
            <div className="navbar-popup-description">
              <button className="fonts-img-button button-popup" onClick={closePopup}>
                <img className="fonts-img move-arrow" src={arrow} alt="" />
              </button>
              <h2 className="create-title-description">Создание публикации</h2>
              <a onClick={handleSubmit} className="share">Поделиться</a>
            </div>
            <form className="column-description">
              <img className="image-description" src={imageUrl} alt="your post" />
              <div className="description-popup-column">
                <div className="data-descpt">
                  <img className='avatar' src={currentUser.avatar} alt="avatar" />
                  <p className='post-username-description'>{currentUser.username}</p>
                </div>
                
                <textarea className="input_name" value={newPost} maxLength={2200} placeholder="Добавьте подпись..."onChange={(event) => setNewPost(event.target.value)}/>

                <p className="descpt-ileft">
                  {`${0 + newPost.length}/2200`}
                </p>

              </div>
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
