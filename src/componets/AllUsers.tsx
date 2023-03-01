import React from "react";
import "../styles/AllUsers.scss"
import { useAppSelector } from "../hooks/hooks";

const AllUsers = () => {
  const { currentUser } = useAppSelector(state => state.admin)

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
      <div className="Recomended__secondPlus">
        <div className="Circle small"></div>
        <div>
          <h1>janedoe</h1>
          <h4>Suggestion for you</h4>
        </div>
        <h3>Follow</h3>
      </div>
      <div className="Recomended__secondPlus">
        <div className="Circle small"></div>
        <div>
          <h1>robertdoe</h1>
          <h4>Suggestion for you</h4>
        </div>
        <h3>Follow</h3>
      </div>
      <div className="Recomended__secondPlus">
        <div className="Circle small"></div>
        <div>
          <h1>sandradoe</h1>
          <h4>Suggestion for you</h4>
        </div>
        <h3>Follow</h3>
      </div>
      <div className="Recomended__secondPlus">
        <div className="Circle small"></div>
        <div>
          <h1>pepedoe_</h1>
          <h4>Suggestion for you</h4>
        </div>
        <h3>Follow</h3>
      </div>
      <div className="Recomended__secondPlus">
        <div className="Circle small"></div>
        <div>
          <h1>simon.doe</h1>
          <h4>Suggestion for you</h4>
        </div>
        <h3>Follow</h3>
      </div>
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