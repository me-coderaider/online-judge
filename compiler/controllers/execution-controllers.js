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

    res.status(200).json({ output: output.trim() });
  } catch (err) {
    const error = new HttpError(
      "Couldn't able to compile the code, please try again.",
      500
    );
    return next(error);
  }
};
exports.runProgram = runProgram;
