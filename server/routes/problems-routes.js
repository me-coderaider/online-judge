const express = require("express");
// validating req data using express-validator
const { check } = require("express-validator");
const problemControllers = require("../controller/problems-controllers");
const checkAuth = require("../middleware/check-auth");

const route = express.Router();

route.get("/:probId", problemControllers.getProblemById);

route.get("/", problemControllers.getAllProblems);

// addding a middleware, if request does not have valid TOKEN, then we'll throw error
route.use(checkAuth);

route.post(
  "/new_problem",
  [check("title").not().isEmpty(), check("description").isLength({ min: 20 })],
  problemControllers.createProblem
);

route.patch(
  "/:probId",
  [check("title").not().isEmpty(), check("description").isLength({ min: 20 })],
  problemControllers.updateProblemById
);

route.delete("/:probId", problemControllers.deleteProblemById);

module.exports = route;
