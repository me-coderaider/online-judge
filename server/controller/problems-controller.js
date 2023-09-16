const { v4: uuidv4 } = require("uuid");
const HttpError = require("../model/http-error");
const testProblemArray = require("../../frontend/src/shared/components/testingData/testData");

let allProblems = testProblemArray.PROBLEMS;

const getProblemById = (req, res, next) => {
  const problemId = req.params.probId;
  const problem = allProblems.find((p) => {
    return p.id === problemId;
  });

  if (!problem) {
    // const error = new Error("Could not find a problem for the provided id.");
    // error.code = 404;
    // return next(error);

    return next(
      new HttpError("Could not find a problem for the provided id.", 404)
    );
  }

  res.json({ problem });
};

const getAllProblems = (req, res, next) => {
  res.json({ allProblems });
};

const createProblem = (req, res, next) => {
  const { name, description, testCases, id } = req.body;

  // adding places locally
  const createdProblem = {
    id: uuidv4(),
    name: name,
    description: description,
    testCases: testCases,
  };
  allProblems.push(createdProblem);

  res.status(201).json({ problem: createdProblem });
};

const updateProblemById = (req, res, next) => {
  const { name, description } = req.body;
  const problemId = req.params.probId;
  // not immediately updating the original data because in bigger/larger operation updation might get failed
  // so, we'll do update after creating A COPY of original data

  const updatedProblem = { ...allProblems.find((p) => p.id === problemId) };
  const problemIndex = allProblems.findIndex((p) => p.id === problemId);

  updatedProblem.name = name;
  updatedProblem.description = description;

  allProblems[problemIndex] = updatedProblem;

  res.status(200).json({ problem: updatedProblem });
};

const deleteProblemById = (req, res, next) => {
  const problemId = req.params.probId;

  allProblems = allProblems.filter((p) => p.id !== problemId);

  res.status(200).json({ message: "coding-problem deleted!" });
};

exports.getProblemById = getProblemById;
exports.getAllProblems = getAllProblems;
exports.createProblem = createProblem;
exports.updateProblemById = updateProblemById;
exports.deleteProblemById = deleteProblemById;
