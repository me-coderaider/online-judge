import React from "react";
import './ProblemsList.css'
import ProblemsItem from "./ProblemItem";

// this page will be getting problems list from the backend
const ProblemsList = (props) => {
    // and there will be 2 scenario, if we have problems or not

    if (props.items.length === 0) {
        return <div className="center">
            <h2>No Problems found.</h2>
        </div>
    }

    return (
        <ul className="users=list">
            {props.items.map(problem => (
                <ProblemsItem 
                    key={problem.id} 
                    id={problem.id} 
                    name={problem.name} 
                    description = {problem.description}
                     
                />
            ))}
        </ul>
    )
}

export default ProblemsList; 