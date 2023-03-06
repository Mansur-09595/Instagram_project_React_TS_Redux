import React from "react";
import "../styles/AllUsers.scss"
import { useAppSelector } from "../hooks/hooks";
import avatar from "../images/fonts/avatar.png"

const AllUsers = () => {
  const { currentUser } = useAppSelector(state => state.admin)
  const uniqueUsernames = Array.from(new Set(Array.from(document.querySelectorAll('.post-username')).map((el) => el.textContent)));
  const uniqueAvatar = Array.from(new Set(Array.from(document.querySelectorAll('.avatar')).map((el) => el.getAttribute('src') ?? '')));
    
  return (
    <div className="Recomended">
      <div className="Recomended__first">
        <img className="Circle big" src={currentUser.avatar} alt={currentUser.username}/>
        <div>
          <h1>{currentUser.username}</h1>
          <h2>{currentUser.username}</h2>
        </div>
        <h3>Change</h3>
      </div>
      <div className="Recomended__second">
        <h4>Suggestions for you</h4>
        <span>See all</span>
      </div>
      {uniqueUsernames.slice(0, 5).map((user, index) => 
      <div className="Recomended__secondPlus">
          <img className="avatar_in_recomended" src={uniqueAvatar[index] || avatar} alt={`Avatar of ${uniqueUsernames[index]}`} />
        <div>
          <h1>{user ? <h1>{user}</h1> : <p>No username available</p>}</h1>
          <h4>Suggestion for you</h4>
        </div>
        <h3>Follow</h3>
      </div>
        )}
      <h4 className="information-footer-recomended">
        Information · Help · Prisoner · API · Job · Privacity · Conditions ·
        Locations · Trending accounts · Hashtags · Language
        <br />
        <br />© 2022 INSTAGRAM FROM SIMMXS
      </h4>
    </div>
  );
};

export default AllUsers;