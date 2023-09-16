import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "../../shared/hooks/form-hook";

import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { PROBLEMS } from "../../shared/components/testingData/testData";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card"
import "./UpdateProblem.css";


const UpdateProblem = () => {
//   const creatorId=useParams().creatorId;
  const currentLoggedInUser="u1";
  const probId = useParams().probId;

  const [formState, inputHandler, setFormData] = useForm(
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
  const identifiedProblems = PROBLEMS.find((p) => ( p.creatorId === currentLoggedInUser && p.id === probId ));

  // we'll get problem from the backend and this might took sometime but hook work immediately
  // if there is not data, it might lead to issues, so, how are we going to deal with this??
  // basically adding a spinner and tweaking our custom hook
  useEffect(() => {
    if (identifiedProblems) {
      setFormData(
        {
          title: {
            value: identifiedProblems.name,
            isValid: true,
          },
          description: {
            value: identifiedProblems.description,
            isValid: true,
          },
        },
        true
      );
    }
  }, [setFormData, identifiedProblems]);

  const problemUpdateSubmitHandler = (event) => {
    event.preventDefault();

    console.log(formState.inputs);
  };

  if (!identifiedProblems) {
    return (
      <div className="center">
        <Card>
        <h2>Could not find the coding problem!</h2>
        </Card>
      </div>
    );
  }

  if (!formState.inputs.title.value) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <form className="updateproblem-form" onSubmit={problemUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="text"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (min. 5 characters)."
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PROBLEM
      </Button>
    </form>
  );
};
export default UpdateProblem;
