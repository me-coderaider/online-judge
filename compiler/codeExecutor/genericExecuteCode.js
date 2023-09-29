const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const outputFolder = path.join(__dirname, "outputs");
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder, { recursive: true });
}

const inputFolder = path.join(__dirname, "inputs");
if (!fs.existsSync(inputFolder)) {
  fs.mkdirSync(inputFolder, { recursive: true });
}

const genericExecuteCode = async (filePath, languageCode, input) => {
  const fileId = path.basename(filePath).split(".")[0];
  const outputPath = path.join(outputFolder, `${fileId}.exe`);

  const inputPath = path.join(inputFolder, `${fileId}.txt`);
  await fs.writeFileSync(inputPath, input);

  const executeCommands = {
    cpp: [
      `g++ ${filePath} -o ${outputPath} && cd ${outputFolder} && ./${fileId}.exe < ${inputPath}`,
    ],
    py: [`python ${filePath} < ${inputPath}`],
    java: [`java ${filePath} < ${inputPath}`],
  };

  return new Promise((resolve, reject) => {
    exec(executeCommands[languageCode][0], (error, stdout, stderr) => {
      if (error) {
        reject(error);
      }
      if (stderr) {
        reject(stderr);
      }
      //   console.log(stdout);
      resolve(stdout);
    });
  });
};

module.exports = {
  genericExecuteCode,
};
