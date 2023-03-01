import React from "react";
import "../styles/AllUsers.scss"
import { useAppSelector } from "../hooks/hooks";

const AllUsers = () => {
  const { currentUser } = useAppSelector(state => state.admin)
//   const { users } = useAppSelector(state => state.users)
//   console.log(users);

    const postUsernames = document.querySelectorAll('.post-username');
    const usernamesArray = Array.from(postUsernames).map((el) => el.textContent);
    const uniqueUsernames = Array.from(new Set(usernamesArray));

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
      {uniqueUsernames.map((user) => 
      <div className="Recomended__secondPlus">
        <div className="Circle small"></div>
        <div>
          <h1>{user ? <h1>{user}</h1> : <p>No username available</p>}</h1>
          <h4>Suggestion for you</h4>
        </div>
        <h3>Follow</h3>
      </div>
        )}
      <h4>
        Information · Help · Prisoner · API · Job · Privacity · Conditions ·
        Locations · Trending accounts · Hashtags · Language
        <br />
        <br />© 2022 INSTAGRAM FROM SIMMXS
      </h4>
    </div>
  );
};

export default AllUsers;