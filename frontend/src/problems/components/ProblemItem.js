import * as React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";
import CheckCircleSharpIcon from "@mui/icons-material/CheckCircleSharp";
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import Paper from '@mui/material/Paper';

import "./ProblemItem.css";

const ProblemsItem = (props) => {
  return (
    <TableRow>
      <TableCell align="left">
        {/* {props.solved && <CheckCircleSharpIcon style={{ color: "green" }} />} */}
        {props.index + 1}
      </TableCell>
      <TableCell
        align="left"
        style={{
          padding: "12px",
          fontSize: "15px",
          fontWeight: "bold",
        }}
      >
        <Link to={`/problems/${props.id}`} style={{ textDecoration: "none" }}>
          {props.title}
        </Link>
      </TableCell>
      <TableCell align="left">{props.difficulty}</TableCell>
    </TableRow>
  );
};

export default ProblemsItem;
