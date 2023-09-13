import React from "react";
import { useParams } from "react-router-dom";

import { PROBLEMS } from "../../shared/components/testingData/testData";

import './SingleProblem.css'
import Description from "../components/Description";

const map=new Map(PROBLEMS.map((obj)=> [obj.id,obj]));

// similary this single problem will consist of multiple smaller components
// description, editor, testcases == all 3 will be common for each of the problem
const SingleProblem = () =>{
    // if this problem (basically we'll be getting problem-code) doesn't exist in database
    // we'll throws some error page
    // or maybe we can ask user to add a problem

    const probId=useParams().probId;
    const problemData=map.get(probId);
    if(problemData === undefined){
        return <div>
            problem doesn't exist
        </div>
    }

    return (
        <div className="singleProblem-parent">
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