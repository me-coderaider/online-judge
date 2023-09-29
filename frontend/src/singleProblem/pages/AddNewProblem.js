import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import "./AddNewProblem.css";
// again form will have input field and other fields, so we'll build a separate component
// for that
// passing validators to deal with the validaton on input field

const AddNewProblem = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const navigate = useNavigate();

  const problemSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `${process.env.REACT_APP_SERVER_PATH}/api/problems/new_problem`,
        "POST",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      navigate("/problems");
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="newproblem-form" onSubmit={problemSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
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
    </React.Fragment>
  );
};

export default AddNewProblem;
