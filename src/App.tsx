import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Auth from './componets/Auth';
import Login from './componets/Login';
import Posts from './componets/Posts';
import AddPosts from './componets/AddPosts';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { checkIsAdmin } from './store/reducers/user/adminAction';

function App() {
  const { posts } = useAppSelector(state => state.posts)
  const dispatch = useAppDispatch();

  useEffect(()=>{
    dispatch(checkIsAdmin())
  }, [dispatch])

  return (
    <div className="App">
      <Routes>
        <Route path="/posts" element={
          <Auth>
            <Posts posts={posts}/>
            <AddPosts />
          </Auth>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </div>
  );
}

export default App;
