import React from "react";
import { NavLink } from "react-router-dom";

import './NavLinks.css';

const NavLinks = (props) =>{
    return (
        <ul className="nav-links">
            <li>
                <NavLink to="/" >HOME</NavLink>
            </li>
            <li>
                <NavLink to="/problems">PROBLEMS</NavLink>
            </li>
            <li>
                <NavLink to="/problems/new">ADD PROBLEM</NavLink>
            </li>
            <li>
                <NavLink to="/auth">AUTHENTICATE</NavLink>
            </li>
        </ul>
    );
}

export default NavLinks;