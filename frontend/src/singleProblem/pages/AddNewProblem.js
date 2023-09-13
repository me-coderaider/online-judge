import React, { useCallback } from "react";

import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import "./AddNewProblem.css";
// again form will have input field and other fields, so we'll build a separate component
// for that
// passing validators to deal with the validaton on input field
const AddNewProblem = () => {
  const titleInputHandler = useCallback((id, value, isValid) => {}, []);

  const descriptionInputHandler = useCallback((id, value, isValid) => {}, []);


  return (
    <form className="newproblem-form">
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={titleInputHandler}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(20)]}
        errorText="Please enter a valid description (at least 20 characters)."
        onInput={descriptionInputHandler}
      />
    </form>
  );
};

export default AddNewProblem;
