import React from "react";
import { useParams } from "react-router-dom";

import { PROBLEMS } from "../../shared/components/testingData/testData";

import './SingleProblem.css'
import Description from "../components/Description";
import Button from "../../shared/components/FormElements/Button";

const map=new Map(PROBLEMS.map((obj)=> [obj.id,obj]));

const currentLoggedInUser="u1";

// similary this single problem will consist of multiple smaller components
// description, editor, testcases == all 3 will be common for each of the problem
const SingleProblem = () =>{
    // if this problem (basically we'll be getting problem-code) doesn't exist in database
    // we'll throws some error page
    // or maybe we can ask user to add a problem

    const probId=useParams().probId;
    const problemData=map.get(probId);
    // console.log(problemData);
    if(problemData === undefined){
        return <div>
            problem doesn't exist
        </div>
    }

    // if current logged-in user's Id === problems' creator Id then we'll display the edit button 

    return (
        <div className="singleProblem-parent">
            <div>
                {problemData.creatorId===currentLoggedInUser && <Button to={`/updateproblem/${problemData.creatorId}/${problemData.id}`}>Edit Problem</Button>}
            </div>
            <div className="singleProblem-description">
                {problemData.name}
            </div>
            <div className="singleProblem-child">
                <Description description={problemData.description}/>
            </div>
            <div className="singleProblem-child">
                editor for the problem
            </div>
        </div>
    );
}
export default SingleProblem;