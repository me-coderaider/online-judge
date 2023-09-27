const HttpError = require("../models/http-error");
const { generateFile } = require("../cpp/generateFile");
const { executeCpp } = require("../cpp/executeCpp");

const runProgram = async (req, res, next) => {
  const { language, input, code } = req.body;
  try {
    if (language === "cpp") {
      const filePath = await generateFile(language, code);
      const output = await executeCpp(filePath);
      console.log(output);
      res.status(200).json({ filePath, output });
    }
  } catch (err) {
    const error = new HttpError("Failed to run the code", 500);
    return next(error);
  }
  res.send({ message: "we are executing cpp code" });
};

exports.runProgram = runProgram;
