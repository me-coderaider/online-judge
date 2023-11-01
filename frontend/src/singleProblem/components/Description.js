import React from "react";

import "./Description.css";

const Description = (props) => {
  const problemDescription = props.description;
  //   return <div className="problem-description">{props.description}</div>;
  return (
    <div className="problem-description">
      <textarea value={problemDescription} readOnly />
    </div>
  );
};

export default Description;
