import React from "react";
import { TypeAnimation } from "react-type-animation";
import { NavLink } from "react-router-dom";
import "./Users.css";

const Users = () => {
  return (
    <div className="home">
      <p
        className="center"
        style={{
          color: "ivory",
          fontSize: "40px",
          marginTop: "200px",
          padding: "20px 20px",
          fontWeight: "bold",
        }}
      >
        Hello & Welcome at CodeRaider Online Judge
      </p>
      <div className="center">
        <TypeAnimation
          sequence={[
            // Same substring at the start will only be typed out once, initially
            "Solve problem of Two Sum",
            1000, // wait 1s before replacing "Mice" with "Hamsters"
            "Solve problem of Binary Search",
            1000,
            "Solve problem of Merge Two Sorted Arrays",
            1000,
            "Solve problem of Mice in Maze",
            1000,
          ]}
          wrapper="span"
          speed={50}
          style={{
            fontSize: "2em",
            display: "inline-block",
          }}
          repeat={Infinity}
        />
      </div>
      <div className="center">
        <ul className="nav-links-users">
          <li>
            <NavLink to="/problems">Explore Problems</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Users;
