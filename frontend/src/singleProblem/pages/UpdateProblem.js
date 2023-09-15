import React, {useEffect} from "react";
import { useParams } from "react-router-dom";
import { useForm } from "../../shared/hooks/form-hook";

import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { PROBLEMS } from "../../shared/components/testingData/testData";
import "./UpdateProblem.css";
import Button from "../../shared/components/FormElements/Button";

const UpdateProblem = () => {
  // const creatorId=useParams().creatorId;
  const probId = useParams().probId;

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
    },
    false
  );
  const identifiedProblems = PROBLEMS.find((p) => p.id === probId);
    // we'll get problem from the backend and this might took sometime but hook work immediately
    // if there is not data, it might lead to issues, so, how are we going to deal with this??
    // basically adding a spinner and tweaking our custom hook 
    useEffect(()=>{
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
    },[setFormData, identifiedProblems]);


  const problemUpdateSubmitHandler = event => {
    event.preventDefault();

    console.log(formState.inputs);
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
