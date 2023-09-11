import React from "react";
import ProblemsList from "../components/ProblemsList";

const NewProblem = () =>{
    const PROBLEMS=[
        {
        id:'problem1',
        name:"two sum",
        description : "given an array of integers"
    },
    {
        id:'problem2',
        name:"Merge 2 sorted array",
        description : "given 2 sorted arrays of integers"
    }
];

    return (
        <ProblemsList items={PROBLEMS}/>
    )
}

export default NewProblem;