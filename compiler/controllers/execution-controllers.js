const HttpError = require("../models/http-error");
const { generateFilePath } = require("../codeExecutor/generateFilePath");
const { genericExecuteCode } = require("../codeExecutor/genericExecuteCode");

const runProgram = async (req, res, next) => {
  const { language, code, input } = req.body;

  if (!language || !code || !input) {
    const error = new HttpError("Missing required fields.", 400);
    return next(error);
  }
  try {
    const filePath = await generateFilePath(language, code);
    const output = await genericExecuteCode(filePath, language, input);
    if (output.trim() === "Time Limit Exceeded (TLE)") {
      throw err;
    }
    res.status(200).json({ output: output.trim() });
  } catch (err) {
    const error = new HttpError("Compilation failed, please try again.", 500);
    return next(error);
  }
};

const submitProgram = async (req, res, next) => {
  //   console.log("submitProgram");
  const { language, code, input, actualOutput } = req.body;

  if (!language || !code || !input) {
    const error = new HttpError("Missing required fields.", 400);
    return next(error);
  }
  try {
    const filePath = await generateFilePath(language, code);
    const output = await genericExecuteCode(filePath, language, input);

    if (output.trim() === actualOutput.trim()) {
      res.status(200).json({ verdict: "AC", output: output.trim() });
    } else {
      res.status(200).json({ verdict: "WA", output: output.trim() });
    }
  } catch (err) {
    console.log(err);
    const error = new HttpError("Execution Failed, please try again.", 500);
    return next(error);
  }
};
exports.runProgram = runProgram;
exports.submitProgram = submitProgram;
