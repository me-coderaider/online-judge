const { v4: uuidv4 } = require("uuid");
const HttpError = require("../model/http-error");
const { validationResult } = require("express-validator");
const Problem = require("../model/problem-schema");
const testProblemArray = require("../../frontend/src/shared/components/testingData/testData");

let allProblems = testProblemArray.PROBLEMS;

const getProblemById = async (req, res, next) => {
  const problemId = req.params.probId;
  let problem;
  try {
    problem = await Problem.findById(problemId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a coding-problem",
      500
    );
    return next(error);
  }

  if (!problem) {
    // const error = new Error("Could not find a problem for the provided id.");
    // error.code = 404;
    // return next(error);

    const error = new HttpError(
      "Could not find a coding-problem for the provided id.",
      404
    );
    return next(error);
  }

  res.json({ problem: problem.toObject({ getters: true }) });
};

const getAllProblems = (req, res, next) => {
  res.json({ allProblems });
};

const createProblem = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    throw new HttpError(
      "Invalid inputs passed, please check your data once",
      422
    );
  }

  const { title, description, testCases, difficulty, creator } = req.body;

  // adding places locally
  const createdProblem = new Problem({
    title: title,
    description: description,
    testCases: testCases,
    solved: false,
    difficulty: difficulty,
    creator: creator,
  });
  //   allProblems.push(createdProblem);
  createdProblem.save();

  res.status(201).json({ problem: createdProblem });
};

const updateProblemById = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    const error = new HttpError(
      "Invalid inputs passed, please check your data once",
      422
    );
    return next(error);
  }
  const { title, description } = req.body;
  const problemId = req.params.probId;
  // not immediately updating the original data because in bigger/larger operation updation might get failed
  // so, we'll do update after creating A COPY of original data
  //   const updatedProblem = { ...allProblems.find((p) => p.id === problemId) };
  //   const problemIndex = allProblems.findIndex((p) => p.id === problemId);

  let updatedProblem;
  try {
    updatedProblem = await Problem.findById(problemId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update problem",
      500
    );
    return next(error);
  }
  updatedProblem.title = title;
  updatedProblem.description = description;

  //   allProblems[problemIndex] = updatedProblem;
  // again saving the data into database in an async task, so, we'll use try-catch for that
  try {
    await updatedProblem.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update problem",
      500
    );
    return next(error);
  }

  res.status(200).json({ problem: updatedProblem.toObject({ getters: true }) });
};

const deleteProblemById = async (req, res, next) => {
  const problemId = req.params.probId;

  //   if (!allProblems.find((p) => p.id === problemId)) {
  //     throw new HttpError("Could not find a problem for that id", 404);
  //   }
  //   allProblems = allProblems.filter((p) => p.id !== problemId);

  let problem;
  try {
    problem = await Problem.findById(problemId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete coding-problem.",
      500
    );
    return next(error);
  }

  try {
    await problem.deleteOne();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete coding-problem.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Coding-problem deleted!" });
};

exports.getProblemById = getProblemById;
exports.getAllProblems = getAllProblems;
exports.createProblem = createProblem;
exports.updateProblemById = updateProblemById;
exports.deleteProblemById = deleteProblemById;
