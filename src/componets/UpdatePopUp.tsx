import React, { useRef, useState } from 'react';
import { updatePost } from '../store/reducers/posts/postAction';
import { useAppDispatch } from '../hooks/hooks';
import { IPosts } from '../types/IData';
import "../styles/PopUp.css"
import "../styles/Posts.css"

interface PostUpdateProps {
  post: IPosts;
}


const UpdatePopUp: React.FC<PostUpdateProps> = ({ post }) => {
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
  };

  const handleEdit = (_id: string, event: React.FormEvent) => {
      event.preventDefault();
      dispatch(updatePost({ _id, description: editDescription }));
      setEditDescription('');
  };

  return (
    <>
      <button onClick={openPopup} className="delete-button" type="submit">Edit</button>
      <div ref={popupRef} className="overlay">
        <div className="popup">
          <h2>Изменение публикации</h2>
          <button className="close" onClick={closePopup}>&times;</button>
          <div className="content">
            <form onSubmit={(event) => handleEdit(post._id, event)}>
                <input type="text" value={editDescription} onChange={(e) => setEditDescription(e.target.value)}/>
                <button className="delete-button" type="submit">Edit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePopUp;