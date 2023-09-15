import React from "react";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import "./AddNewProblem.css";
import { useForm } from "../../shared/hooks/form-hook";
// again form will have input field and other fields, so we'll build a separate component
// for that
// passing validators to deal with the validaton on input field



const AddNewProblem = () => {
 const [formState,inputHandler]= useForm({
    title: {
      value: "",
      isValid: false,
    },
    description: {
      value: "",
      isValid: false,
    },
  },
  false);

  

  const problemSubmitHandler = event =>{
    event.preventDefault();

    console.log(formState.inputs); // send this to backend
  }

  return (
    <form className="newproblem-form" onSubmit={problemSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(20)]}
        errorText="Please enter a valid description (at least 20 characters)."
        onInput={inputHandler}
      />
      <Input
        id="testcases"
        element="textarea"
        label="TestCases"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter test-cases in valid format"
        onInput={inputHandler}
      />
      {/* <Input
        id="singleOrMany"
        element="input"
        label="Single"
        type="radio"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter test-cases in valid format"
        onInput={inputHandler}
      /> */}

      <Button type="submit" disabled={!formState.isValid}>
        ADD PROBLEM
      </Button>
    </form>
  );
};

export default AddNewProblem;
