import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
// import Auth from './componets/Auth';
import Login from './componets/Login';
import Posts from './componets/Posts';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { checkIsAdmin } from './store/reducers/user/adminAction';
import { token } from './API';

function App() {
  const { posts } = useAppSelector(state => state.posts)
  const { isAdmin } = useAppSelector(state => state.admin)
  const dispatch = useAppDispatch();

  useEffect(()=>{
    if (token) {
      dispatch(checkIsAdmin())
    }
  }, [dispatch])

  return (
    <div className="App">
      <Routes>
        { isAdmin ? (<Route path="/" element={<Posts posts={posts}/> } />) : (<Route path="/login" element={<Login/>} />) }
      </Routes>
    </div>
  );
}

export default App;
