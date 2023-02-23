import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { checkIsAdmin, signOut } from '../store/reducers/user/adminAction';
import { getPosts, removePosts } from '../store/reducers/posts/postAction';
import { IPosts } from '../types/IData';
import "../styles/Posts.css"
import instagram_logo from "../images/instagram.png"
import add from "../images/fonts/add.png"
import home from "../images/fonts/home.png"
import like from "../images/fonts/like.png"
import msg from "../images/fonts/msg.png"
import trends from "../images/fonts/trends.png"

interface PostListProps {
    posts: IPosts[];
}

const Posts: React.FC<PostListProps> = () => {
    const { posts } = useAppSelector(state => state.posts)    
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(checkIsAdmin());
        dispatch(getPosts())
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(signOut())
          .then(() => {
            // Redirect to login page
            window.location.href = "/login";
          })
          .catch((error) => {
            console.error("Logout error:", error);
          });
    };
    
    const handleDelete = (_id: string) => {
        dispatch(removePosts(_id));
    };
    
    return (
        <>
        <div className='navbar-instagram'>
            <div className='left-bar'>
                <img className='instagram_logo' src={instagram_logo} alt="" />
                <input className='search' type="text" placeholder='search'/>
            </div>
            <div className='right-bar'>
                <img className='fonts-img' src={home} alt="" />
                <img className='fonts-img' src={msg} alt="" />
                <button className='fonts-img-button' type="submit">
                    <img className='fonts-img' src={add} alt="" />
                </button>
                <img className='fonts-img' src={trends} alt="" />
                <img className='fonts-img' src={like} alt="" />
            </div>
            
        </div>
        <div className='form-posts'>
            <button onClick={handleLogout}>Logout</button>
            <div>   
                {posts.map((post) => (
                    <div  className='card-inst' key={post._id}>
                        <div className='navbar-post'>
                            <img className='avatar' src={post.user.avatar} alt={post.description} />
                            <p className='post-username'>{post.user.username}</p>
                        </div>
                        <img className='post-img' src={post.image} alt={post.description} />
                        <div className='card-footer'>
                            <p className='post-username'>{post.user.username}</p>
                            <p>{post.description}</p>
                            { 'mansurmusaev' === post.user.username && (
                                <button className="fa-solid fa-trash" onClick={() => handleDelete(post._id)}></button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </>
    )
}

export default Posts;