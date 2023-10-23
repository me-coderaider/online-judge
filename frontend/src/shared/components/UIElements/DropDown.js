import React, { useState } from "react";

import "./DropDown.css";
const DropDown = (props) => {
  const [language, setLanguage] = useState("java");

  const changeLanguageHandler = (event) => {
    props.getLanguage(language);
    setLanguage(event.target.value);
  };

  return (
    <select
      name="language"
      id="language"
      value={language}
      required
      onChange={changeLanguageHandler}
    >
      <option value="java">Java</option>
      {/* <option value="js">Javascript</option>
      <option value="py">Python</option> */}
      <option value="cpp">C++</option>
    </select>
  );
};

export default DropDown;
