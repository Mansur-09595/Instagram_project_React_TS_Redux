import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { checkIsAdmin, signOut } from '../store/reducers/user/adminAction';
import { getPosts, removePosts } from '../store/reducers/posts/postAction';
import { IPosts } from '../types/IData';
import "../styles/Posts.css"
import instagram_logo from "../images/instagram.png"
import home from "../images/fonts/home.png"
import like from "../images/fonts/like.png"
import msg from "../images/fonts/msg.png"
import trends from "../images/fonts/trends.png"
import options from "../images/fonts/options.png"
import PopUp from './PopUp';
import UpdatePopUp from './UpdatePopUp';

interface PostListProps {
    posts: IPosts[];
}

const Posts: React.FC<PostListProps> = () => {
    const { posts } = useAppSelector(state => state.posts)
    const { currentUser } = useAppSelector(state => state.admin)
    console.log(currentUser);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(checkIsAdmin());
        dispatch(getPosts())
    }, [dispatch]);

    const handleDelete = (_id: string) => {
        dispatch(removePosts(_id));
    };

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
 
    return (
        <>
        <div className='navbar-instagram'>
            <div className='left-bar'>
                <img className='instagram_logo' src={instagram_logo} alt="" />
                <input className='search' type="text" placeholder='Search'/>
            </div>
            <div className='right-bar'>
                <button className="fonts-img-button button" onClick={handleLogout}>
                    <img className='fonts-img' src={home} alt="" />
                </button>
                <img className='fonts-img' src={msg} alt="" />
                    <PopUp />
                <img className='fonts-img' src={trends} alt="" />
                <img className='fonts-img' src={like} alt="" />
            </div>
            
        </div>
        <div className='form-posts'>
            
            <div>   
                {posts.map((post) => (
                    <div  className='card-inst' key={post._id}>
                        <div className='navbar-post'>
                            <img className='avatar' src={post.user.avatar} alt={post.description} />
                            <p className='post-username'>{post.user.username}</p>

                            { currentUser.username === post.user.username && (
                                <div className="dropdown">
                                    <img className='options'  src={options} alt="options" />
                                    <div className="dropdown-content">

                                    <UpdatePopUp post={post}/>

                                        <button className="delete-button" onClick={() => handleDelete(post._id)}>Delete</button>
                                    </div>
                                </div>
                            )}
                        </div>
                        

                        <img className='post-img' src={post.image} alt={post.description} />
                        <div className='card-footer'>
                            <div>
                                <p className='post-username'>{post.user.username}</p>
                                <p>{post.description}</p>
                            </div>
                            
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </>
    )
}

export default Posts;