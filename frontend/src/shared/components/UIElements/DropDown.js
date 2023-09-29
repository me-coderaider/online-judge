import React, { useState } from "react";

import "./DropDown.css";
const DropDown = (props) => {
  const [language, setLanguage] = useState("java");

  const changeLanguageHandler = (event) => {
    setLanguage(event.target.value);
  };
  props.onChangeLanguage(language);

  return (
    <select
      name="language"
      id="language"
      required
      onChangeCapture={changeLanguageHandler}
    >
      <option value="java">Java</option>
      <option value="js">Javascript</option>
      <option value="py">Python</option>
      <option value="cpp">C++</option>
    </select>
  );
};

export default DropDown;
