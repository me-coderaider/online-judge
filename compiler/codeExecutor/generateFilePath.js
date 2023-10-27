const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const codeFolder = path.join(__dirname, "codes");
if (!fs.existsSync(codeFolder)) {
  fs.mkdirSync(codeFolder, { recursive: true });
}

const generateFilePath = async (language, code) => {
  let fileName;
  if (language === "java") {
    fileName = "Main.java";
  } else {
    // fileName = `${uuid()}.${language}`;
    fileName = "Main.cpp";
  }
  const filePath = path.join(codeFolder, fileName);
  await fs.writeFileSync(filePath, code);
  return filePath;
};

module.exports = {
  generateFilePath,
};
