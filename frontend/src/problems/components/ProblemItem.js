import React from "react";
import {Link} from 'react-router-dom'
import './ProblemItem.css'

const ProblemsItem = (props) =>{ 
    return (
        <li className="users=list">
            <Link to={props.id}>
            <div className="user-item__content">
                <h2>{props.name}</h2>
                {/* <h3>{props.description}</h3> */}
            </div>
            
            </Link>
        </li>
    );
}

export default ProblemsItem; 