// import React from "react";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./ProblemsList.css";
import ProblemsItem from "./ProblemItem";

// this page will be getting problems list from the backend
const ProblemsList = (props) => {
  // and there will be 2 scenario, if we have problems or not

  if (props.items.length === 0) {
    return (
      <div className="center">
        <h2>No Coding Problems found.</h2>
      </div>
    );
  }

  return (
    <TableContainer component={Paper} className="main--table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">Title</TableCell>
            <TableCell align="left">Difficulty</TableCell>
            {/* <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.items.map((problem) => (
            <ProblemsItem
              key={problem.id}
              solved={problem.solved}
              id={problem.id}
              title={problem.title}
              description={problem.description}
              difficulty={problem.difficulty}
              creator={problem.creator}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProblemsList;
