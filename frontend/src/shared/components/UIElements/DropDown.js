import React, { useState } from "react";

import "./DropDown.css";
const DropDown = () => {
  const [language, setLanguage] = useState("javascript");

  const changeLanguageHandler = (event) => {
    setLanguage(event.target.value);
  };
  return (
    <select
      name="language"
      id="language"
      required
      onChangeCapture={changeLanguageHandler}
    >
      <option value="javascript">Javascript</option>
      <option value="java">Java</option>
      <option value="python">Python</option>
      <option value="cpp">C++</option>
    </select>
  );
};

export default DropDown;
