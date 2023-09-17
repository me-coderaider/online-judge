const express = require("express");
const { check } = require("express-validator");

const usersControllers = require("../controller/users-controllers");

const route = express.Router();

route.get("/", usersControllers.getUsers);

route.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  usersControllers.signup
);

route.post("/login", usersControllers.login);

module.exports = route;
