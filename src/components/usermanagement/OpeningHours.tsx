import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(
  name: string,
  min: string,
  minMiddle: string,
  maxMiddle: string,
  max: string
) {
  return {
    name,
    calories: min,
    fat: minMiddle,
    carbs: maxMiddle,
    protein: max,
  };
}

const rows = [
  createData("Montag", "11:00", "15:00", "17:00", "22:00"),
  createData("Dienstag", "11:00", "15:00", "17:00", "22:00"),
  createData("Mittwoch", "11:00", "15:00", "17:00", "22:00"),
  createData("Donnerstag", "11:00", "15:00", "17:00", "22:00"),
  createData("Freitag", "11:00", "15:00", "17:00", "22:00"),
  createData("Samstag", "11:00", "15:00", "17:00", "22:00"),
  createData("Sonntag", "11:00", "15:00", "17:00", "22:00"),
];

export default function OpeningHours() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow></TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
