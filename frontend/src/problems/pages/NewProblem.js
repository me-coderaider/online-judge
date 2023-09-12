import React from "react";
import ProblemsList from "../components/ProblemsList";

const NewProblem = () => {
  const PROBLEMS = [
    {
      id: "problem1",
      name: "two sum",
      description: "given an array of integers",
      difficulty: "easy",
    },
    {
      id: "problem2",
      name: "Merge 2 sorted array",
      description: "given 2 sorted arrays of integers",
      difficulty: "medium",
    },
    {
      id: "problem3",
      name: "two sum",
      description: "given an array of integers",
      difficulty: "easy",
    },
    {
      id: "problem4",
      name: "Merge 2 sorted array",
      description: "given 2 sorted arrays of integers",
      difficulty: "medium",
    },
    {
      id: "problem5",
      name: "two sum",
      description: "given an array of integers",
      difficulty: "easy",
    },
    {
      id: "problem6",
      name: "Merge 2 sorted array",
      description: "given 2 sorted arrays of integers",
      difficulty: "medium",
    },
    {
      id: "problem7",
      name: "two sum",
      description: "given an array of integers",
      difficulty: "easy",
    },
    {
      id: "problem8",
      name: "Merge 2 sorted array",
      description: "given 2 sorted arrays of integers",
      difficulty: "medium",
    },
    {
      id: "problem9",
      name: "two sum",
      description: "given an array of integers",
      difficulty: "easy",
    },
    {
      id: "problem10",
      name: "Merge 2 sorted array",
      description: "given 2 sorted arrays of integers",
      difficulty: "medium",
    },
  ];

  return <ProblemsList items={PROBLEMS} />;
};

export default NewProblem;
