const express = require("express");

const problemControllers = require("../controller/problems-controller");

const route = express.Router();

route.get("/:probId", problemControllers.getProblemById);

route.get("/", problemControllers.getAllProblems);

route.post("/new_problem", problemControllers.createProblem);

route.patch("/:probId", problemControllers.updateProblemById);

route.delete("/:probId", problemControllers.deleteProblemById);

module.exports = route;
