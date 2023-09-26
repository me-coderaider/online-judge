import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import "./CodeEditor.css";

const CodeEditor = () => {
  const [language, setLanguage] = useState("java");
  console.log(language);
  return (
    <div className="editor_div">
      <label htmlFor="language" className="language_label">
        Choose a Language:
      </label>

      <select name="language" id="language" required>
        <option value="java">Java</option>
        <option value="javascript">Javascript</option>
        <option value="python">Python</option>
        <option value="cpp">C++</option>
      </select>
      <Editor
        height="90vh"
        defaultLanguage="java"
        defaultValue="public class Main{
          public static void main(String[] args){
              System.out.println();
          }
      }"
      />
    </div>
  );
};

export default CodeEditor;
