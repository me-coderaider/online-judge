import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "../../shared/hooks/form-hook";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";

import "./UpdateProblem.css";

const UpdateProblem = () => {
  const probId = useParams().probId;
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedProblems, setLoadedProblems] = useState();

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

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/problems/${probId}`
        );
        setLoadedProblems(responseData.problem);
        setFormData(
          {
            title: {
              value: responseData.problem.name,
              isValid: true,
            },
            description: {
              value: responseData.problem.description,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchProblem();
  }, [sendRequest, probId, setFormData]);

  // we'll get problem from the backend and this might took sometime but hook work immediately
  // if there is not data, it might lead to issues, so, how are we going to deal with this??
  // basically adding a spinner and tweaking our custom hook
  //   useEffect(() => {
  //     if (identifiedProblems) {
  //       setFormData(
  //         {
  //           title: {
  //             value: identifiedProblems.name,
  //             isValid: true,
  //           },
  //           description: {
  //             value: identifiedProblems.description,
  //             isValid: true,
  //           },
  //         },
  //         true
  //       );
  //     }
  //   }, [setFormData, identifiedProblems]);

  const problemUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/problems/${probId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      navigate("/problems/" + probId);
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedProblems && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find the coding-problem!</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading &&
        loadedProblems &&
        loadedProblems.creator === auth.userId && (
          <form
            className="updateproblem-form"
            onSubmit={problemUpdateSubmitHandler}
          >
            <Input
              id="title"
              element="input"
              type="text"
              label="Title"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid title."
              onInput={inputHandler}
              initialValue={loadedProblems.title}
              initialValid={true}
            />
            <Input
              id="description"
              element="text"
              label="Description"
              validators={[VALIDATOR_MINLENGTH(5)]}
              errorText="Please enter a valid description (min. 5 characters)."
              onInput={inputHandler}
              initialValue={loadedProblems.description}
              initialValid={true}
            />
            <Button type="submit" disabled={!formState.isValid}>
              UPDATE PROBLEM
            </Button>
          </form>
        )}
    </React.Fragment>
  );
};
export default UpdateProblem;
