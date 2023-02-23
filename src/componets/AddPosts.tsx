import React, { useState } from 'react';
import { useAppDispatch } from '../hooks/hooks';
import { addPosts } from '../store/reducers/posts/postAction';

const AddPosts = () => {
    const [newPost, setNewPost] = useState("");
    const [newImage, setNewImage] = useState<File | null>(null);
    const dispatch = useAppDispatch();

    const handleSubmit = (event: React.FormEvent) => {
        if(newPost.length && newImage) {
            event.preventDefault();
            dispatch(addPosts({ description: newPost, image: newImage }));
            setNewPost("")
            setNewImage(null);
        } 
      };
    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setNewImage(files[0]);
          }
      };
  
  return (
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
      <button type="submit" className="">Добавить</button>
    </form>
  </div>
  )
}

export default AddPosts;