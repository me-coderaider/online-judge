import React, { useContext } from "react";
import Editor from "@monaco-editor/react";
import Button from "../../shared/components/FormElements/Button";
import DropDown from "../../shared/components/UIElements/DropDown";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

import "./CodeEditor.css";

const CodeEditor = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const programRunHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        "http://localhost:5001/api/execution/run",
        "POST",
        JSON.stringify({}),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
    } catch (err) {}
  };
  const programSubmitHandler = (event) => {
    event.preventDefault();

    console.log("submit code");
  };
  const handleEditorChange = (event) => {
    // console.log(event);
    console.log(event);
  };

  return (
    <div className="editor_div">
      <label htmlFor="language" className="language_label">
        Choose a Language:
      </label>
      <DropDown />

      <div className="editor_input_output">
        <Editor
          height="70vh"
          width={`70%`}
          defaultLanguage="java"
          defaultValue="public class Main{
          public static void main(String[] args){
              System.out.println();
          }
      }"
          theme="vs-dark"
          onChange={handleEditorChange}
        />
        <div className="input_output">
          {/* <label>
            Input:
            <br />
            <textarea name="input" rows={10} cols={33} />
          </label> */}

          {/* <label>
            Output:
            <br />
            <textarea name="input" rows={10} cols={33} />
          </label> */}
        </div>
      </div>
      <Button onClick={programRunHandler}>Compile</Button>
      <Button danger onClick={programSubmitHandler}>
        Submit
      </Button>
    </div>
  );
};

export default CodeEditor;
