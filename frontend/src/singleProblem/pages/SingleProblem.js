import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { PROBLEMS } from "../../shared/components/testingData/testData";

import "./SingleProblem.css";
import Description from "../components/Description";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";

const map = new Map(PROBLEMS.map((obj) => [obj.id, obj]));

const currentLoggedInUser = "u1";

// similary this single problem will consist of multiple smaller components
// description, editor, testcases == all 3 will be common for each of the problem
const SingleProblem = () => {
  // if this problem (basically we'll be getting problem-code) doesn't exist in database
  // we'll throws some error page
  // or maybe we can ask user to add a problem

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const probId = useParams().probId;
  const problemData = map.get(probId);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = () => {
    setShowConfirmModal(false);
    console.log("DELETING...");
  };

  // console.log(problemData);
  if (problemData === undefined) {
    return <div>problem doesn't exist</div>;
  }

  // if current logged-in user's Id === problems' creator Id then we'll display the edit button

  return (
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
          Do you want to proceed and delete this place? Please note that it
          can't be undone thereafter.
        </p>
      </Modal>
      <div className="singleProblem-parent">
        <div>
          {problemData.creatorId === currentLoggedInUser && (
            <Button
              to={`/updateproblem/${problemData.creatorId}/${problemData.id}`}
            >
              Edit Problem
            </Button>
          )}
        </div>
        <div>
          {problemData.creatorId === currentLoggedInUser && (
            <Button danger onClick={showDeleteWarningHandler}>DELETE</Button>
          )}
        </div>
        <div className="singleProblem-description">{problemData.name}</div>
        <div className="singleProblem-child">
          <Description description={problemData.description} />
        </div>
        <div className="singleProblem-child">editor for the problem</div>
      </div>
    </React.Fragment>
  );
};
export default SingleProblem;
