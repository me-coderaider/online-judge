import React from "react";

import "./Auth.css";
import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_EMAIL } from "../../shared/util/validators";

const Auth = () => {
  return (
    <Card className="authentication">
      <h2>Login Required</h2>
      <hr />
      <form>
        <Input
          element="input"
          id="email"
          type="email"
          label="E-Mail"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
          onChange={()=>{}}
        />
      </form>
    </Card>
  );
};
export default Auth;
