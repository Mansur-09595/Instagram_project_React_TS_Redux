import React, { useRef, useState } from 'react';
import add from "../images/fonts/add.png"
import "../styles/PopUp.css"
import "../styles/Posts.css"
import { useAppDispatch } from '../hooks/hooks';
import { addPosts } from '../store/reducers/posts/postAction';

const PopUp = () => {
  const popupRef = useRef<HTMLDivElement>(null);
  const [newPost, setNewPost] = useState("");
  const [newImage, setNewImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<any>("");
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
    if(newPost.length && newImage) {
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
      <div ref={popupRef} className="overlay">
        <div className="popup">
          <h2>Создание публикации</h2>
          <button className="close" onClick={closePopup}>&times;</button>
          <div className="content">
            <div className="addForm">
              <input
                className="input_name"
                value={newPost}
                type="text"
                placeholder="Enter description"
                onChange={(event) => setNewPost(event.target.value)}
              />
              <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleInputChange} />
                {imageUrl && <img src={imageUrl} alt="your post" />}
                <button type="submit" className="">Добавить</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopUp;