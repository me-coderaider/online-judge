import React, { useState, useContext, useEffect } from "react";
import Editor from "@monaco-editor/react";
import Button from "../../shared/components/FormElements/Button";
import DropDown from "../../shared/components/UIElements/DropDown";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

import "./CodeEditor.css";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const CodeEditor = () => {
  const height = "70vh";
  const width = "100%";

  const auth = useContext(AuthContext);
  const [language, setLanguage] = useState("js");
  const [code, setCode] = useState();
  const [input, setInput] = useState();
  const [output, setOutput] = useState();
  const [message, setMessage] = useState();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const programRunHandler = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_COMPILER_SERVER_PATH}/api/execution/run`,
        "POST",
        JSON.stringify({
          language: language,
          code: code,
          input: input,
          //   maincode : req.
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      console.log(responseData);
      setOutput(responseData.output);
      setMessage(responseData.message);
    } catch (err) {}
  };

  //   useEffect(() => {
  //     if (isLoading) {
  //       return (
  //         <div className="center">
  //           <LoadingSpinner />
  //         </div>
  //       );
  //     }
  //   }, [language, code, input]);

  const programSubmitHandler = (event) => {
    event.preventDefault();

    console.log("submit code");
  };
  const handleEditorChange = (value, event) => {
    setCode(value);
  };

  // lifting-up the state by passing a function as prop
  const changeLanguageHandler = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  };

  const inputChangeHandler = (event) => {
    setInput(event.target.value);
  };

  return (
    <React.Fragment>
      <div className="editor_div">
        <label htmlFor="language" className="language_label">
          Choose a Language:
        </label>
        <DropDown onChangeLanguage={changeLanguageHandler} />
        {/* {language === "java" && (
          <p>please keep class name as Main and access as Public</p>
        )} */}

        <div className="editor_input_output">
          <Editor
            height={height}
            width={width}
            defaultLanguage="java"
            defaultValue="public class Main{
          public static void main(String[] args){
              System.out.println();
          }
      }"
            theme="vs-dark"
            onChange={handleEditorChange}
          />
        </div>
        <div className="input_output">
          <div className="input">
            <label>
              Input:
              <br />
              <textarea
                name="input"
                rows={6}
                cols={33}
                onChange={inputChangeHandler}
              />
            </label>
          </div>
          <div>
            <label>
              Output:
              <br />
              <textarea
                name="output"
                rows={6}
                cols={33}
                value={!output ? message : output}
                disabled
              />
            </label>
          </div>
        </div>
        <Button onClick={programRunHandler}>Compile</Button>
        <Button danger onClick={programSubmitHandler}>
          Submit
        </Button>
      </div>
    </React.Fragment>
  );
};

export default CodeEditor;
