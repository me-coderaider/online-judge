import React from "react";
import ProblemsList from "../components/ProblemsList";
import { PROBLEMS } from "../../shared/components/testingData/testData";

const PROBLEMS1=PROBLEMS;

const NewProblem = () => {
  return <ProblemsList items={PROBLEMS1} />;
};

export default NewProblem;

