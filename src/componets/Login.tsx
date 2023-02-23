import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { signIn } from '../store/reducers/user/adminAction';
import  instagram_logo  from "../images/instagram.png"
import "../styles/Login.css"
import { Navigate } from 'react-router-dom';


const Login: React.FC = () => {
  const { token } = useAppSelector((state) => state.admin.currentUser)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(signIn({ username, password }));
  };

  return (
    <>
      <div className='form'>
        <img src={instagram_logo} className="instagram_logo" alt='Instagram Logo' />
        <input className='username' type="username" value={username} onChange={event => setUsername(event.target.value)} placeholder="Телефон, имя пользователя или эл.адрес"/>
        <input className='password' type="password" value={password} onChange={event => setPassword(event.target.value)} placeholder="Пароль" />
        <button className='button' onClick={handleSubmit} type="submit">Войти</button>
        <p>mansurmusaev mansurmusaev123</p>
      </div>
      {!!token && <Navigate to="/posts"/>}
    </>
  )
}

export default Login;