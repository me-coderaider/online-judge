import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Description from "../components/Description";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import "./SingleProblem.css";

// similary this single problem will consist of multiple smaller components
// description, editor, testcases == all 3 will be common for each of the problem
const SingleProblem = () => {
  // if this problem (basically we'll be getting problem-code) doesn't exist in database
  // we'll throws some error page
  // or maybe we can ask user to add a problem

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [loadedProblems, setLoadedProblems] = useState("");
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const probId = useParams().probId;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSingleProblem = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/problems/${probId}`
        );
        setLoadedProblems(responseData.problem);
      } catch (err) {}
    };
    fetchSingleProblem();
  }, [sendRequest, probId]);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);

    try {
      await sendRequest(
        `http://localhost:5000/api/problems/${probId}`,
        "DELETE",
        null,
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      navigate("/problems");
    } catch (err) {}
  };
  // if current logged-in user's Id === problems' creator Id then we'll display the edit button

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedProblems && (
        <React.Fragment>
          <Modal
            show={showConfirmModal}
            onCancel={cancelDeleteHandler}
            header="Are you sure?"
            footerClass="place-item__modal-actions"
            footer={
              <React.Fragment>
                <Button inverse onClick={cancelDeleteHandler}>
                  CANCEL
                </Button>
                <Button danger onClick={confirmDeleteHandler}>
                  DELETE
                </Button>
              </React.Fragment>
            }
          >
            <p>
              Do you want to proceed and delete this problem? Please note that
              it can't be undone thereafter.
            </p>
          </Modal>
          <div className="singleProblem-parent">
            <div>
              {loadedProblems.creator === auth.userId && (
                <Button to={`/updateproblem/${loadedProblems.id}`}>
                  UPDATE PROBLEM
                </Button>
              )}
            </div>
            <div>
              {loadedProblems.creator === auth.userId && (
                <Button danger onClick={showDeleteWarningHandler}>
                  DELETE
                </Button>
              )}
            </div>
            <div className="singleProblem-description">
              {loadedProblems.title}
            </div>
            <div className="singleProblem-child">
              <Description description={loadedProblems.description} />
            </div>
            <div className="singleProblem-child">editor for the problem</div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
export default SingleProblem;
