import React, { useState, useContext } from "react";
import Editor from "@monaco-editor/react";
import Button from "../../shared/components/FormElements/Button";
import DropDown from "../../shared/components/UIElements/DropDown";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
// import { sampleCode } from "../../shared/util/sampleCode";
// import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import "./CodeEditor.css";

const CodeEditor = () => {
  const height = "70vh";
  const width = "100%";

  const auth = useContext(AuthContext);
  const [language, setLanguage] = useState("js");
  const [code, setCode] = useState();
  const [input, setInput] = useState();
  const [output, setOutput] = useState();
  const [message, setMessage] = useState();
  //   const [sampleCode1, setSampleCode] = useState();

  const { sendRequest } = useHttpClient();

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
  //   setSampleCode(sampleCode(language));
  //   const editorRef = useRef(null);

  //   function handleEditorDidMount(editor, monaco) {
  //     // here is the editor instance
  //     // you can store it in `useRef` for further usage
  //     editorRef.current = editor;
  //   }

  return (
    <React.Fragment>
      <div className="editor_div">
        <label htmlFor="language" className="language_label">
          Choose a Language:
        </label>
        <DropDown onChangeLanguage={changeLanguageHandler} />
        {language === "java" && (
          <p style={{ color: "red", fontWeight: "bold" }}>
            please keep class name as "public class Main"
          </p>
        )}

        <div className="editor_input_output">
          <Editor
            height={height}
            width={width}
            defaultLanguage="java"
            defaultValue="this is java"
            theme="vs-dark"
            onChange={handleEditorChange}
            // onMount={handleEditorDidMount}
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
