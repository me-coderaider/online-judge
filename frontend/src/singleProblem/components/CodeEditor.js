import React, { useState, useContext } from "react";
import Editor from "@monaco-editor/react";
import Button from "../../shared/components/FormElements/Button";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import "./CodeEditor.css";

const CodeEditor = (props) => {
  const height = "70vh";
  const width = "95%";

  let sampleCode = `public class Main{
	public static void main(String[] args){
		System.out.println("Be Creative");
	}
}`;

  const auth = useContext(AuthContext);
  const [language, setLanguage] = useState("java");
  const [code, setCode] = useState(`public class Main{
	public static void main(String[] args){
		System.out.println("Be Creative");
	}
}`);
  const [input, setInput] = useState();
  const [output, setOutput] = useState();
  const [message, setMessage] = useState();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { sendRequest } = useHttpClient();

  const programRunHandler = async (event) => {
    event.preventDefault();
    let responseData;
    try {
      responseData = await sendRequest(
        `${process.env.REACT_APP_COMPILER_SERVER_PATH}/api/execution/run`,
        "POST",
        JSON.stringify({
          language: language,
          code: code,
          input: input,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      //   console.log(responseData);
      setOutput(responseData.output);
    } catch (err) {
      //   console.log(responseData);
      setMessage(
        err + "\nPlease check if you have selected proper language or not."
      );
    }
  };

  const programSubmitHandler = (event) => {
    event.preventDefault();
    console.log("submit code");
  };
  const handleEditorChange = (value, event) => {
    event.preventDefault();
    setCode(value);
  };

  const changeLanguageHandler = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    let selectedLang = event.target.value;
    setLanguage(selectedLang);

    console.log(sampleCode);
  };

  const inputChangeHandler = (event) => {
    setInput(event.target.value);
  };
  //   setSampleCode(sampleCode(language));
  //   const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    // console.log("onMount: the editor instance:", editor);
    // console.log("onMount: the monaco instance:", monaco);
    setEditorLoaded(true);
  }

  return (
    <React.Fragment>
      <div className="editor_div">
        <label htmlFor="language" className="language_label">
          Choose a Language:
        </label>
        <select
          name="language"
          id="language"
          value={language}
          required
          onChange={changeLanguageHandler}
        >
          <option value="java">Java</option>
          <option value="cpp">C++</option>
        </select>
        {language === "java" && (
          <p
            style={{
              color: "red",
              fontWeight: "bold",
              margin: "0rem 0rem 0.5rem 0.0rem",
            }}
          >
            Please keep class name as "public class Main".
          </p>
        )}

        <div className="editor_input_output">
          {!editorLoaded && <LoadingSpinner />}
          <Editor
            height={height}
            width={width}
            defaultLanguage="java"
            defaultValue={sampleCode}
            theme="vs-dark"
            onChange={handleEditorChange}
            onMount={handleEditorDidMount}
          />
        </div>
        <div className="input_output">
          <div className="input">
            <label>
              Input:
              <br />
              <textarea
                name="input"
                value={props.problemData.testcasesInput}
                rows={6}
                cols={33}
                onChange={inputChangeHandler}
                required={true}
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
