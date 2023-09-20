const { v4: uuidv4 } = require("uuid");
const HttpError = require("../model/http-error");
const { validationResult } = require("express-validator");
const Problem = require("../model/problem-schema");
const User = require("../model/user-schema");
const { default: mongoose } = require("mongoose");

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
    const error = new HttpError(
      "Could not find a coding-problem for the provided id.",
      404
    );
    return next(error);
  }

  res.json({ problem: problem.toObject({ getters: true }) });
};

const getAllProblems = async (req, res, next) => {
  let problems;
  try {
    problems = await Problem.find({});
  } catch (err) {
    const error = new HttpError(
      "Fetching problems failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({
    problems: problems.map((problem) => problem.toObject({ getters: true })),
  });
};

const createProblem = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data once", 422)
    );
  }

  const { title, description, testCases, difficulty, creator } = req.body;

  // adding places locally
  const createdProblem = new Problem({
    title: title,
    description: description,
    testCases: "testCases",
    solved: false,
    difficulty: "easy",
    creator: creator,
  });
  let user;
  try {
    user = await User.findById(creator);
  } catch (err) {
    const error = new HttpError(
      "Problem creation failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError(
      "Could not find user for the provided id.",
      404
    );
    return next(error);
  }

  try {
    // now we have to save the created place with the
    // a) user id, b) update the problem id in the users' problem list
    // basically, we'll be performing 2 operations and one of them can fail & we can achieve this using SESSIONS & TRANSACTIONS

    const session = await mongoose.startSession();
    session.startTransaction();

    await createdProblem.save({ session: session });
    user.problems.push(createdProblem);
    await user.save({ session: session });

    await session.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Problem creation failed, please try again later.",
      500
    );
    return next(error);
  }
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

  let problem;
  try {
    problem = await Problem.findById(problemId).populate("creator");
    // as we're deleting one place, then that place id should also be removed from the creators' place list, right??
    // for that we'll be using populate method and this'll work only if there is relation b/w 2 schemas
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete coding-problem.",
      500
    );
    return next(error);
  }

  if (!problem) {
    const error = new HttpError(
      "Could not find problem for the given id.",
      404
    );
    return next(error);
  }

  try {
    await problem.deleteOne();

    const session = await mongoose.startSession();
    session.startTransaction();
    await problem.deleteOne({ session: session });
    problem.creator.problems.pull(problem);
    await problem.creator.save({ session: session });

    await session.commitTransaction();
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
