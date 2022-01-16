import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import React from "react";
import { OpeningHour } from "../../model/openingHour";

interface Props {
  openingHours: OpeningHour[];
}

function ChatbotOpeningHours(props: Props) {
  return (
    <Table
      sx={{ maxWidth: 215, backgroundColor: "#515151f2" }}
      size="small"
      padding="none"
    >
      <TableBody>
        {props.openingHours.map((openingHour: OpeningHour) => (
          <TableRow key={openingHour.day}>
            <TableCell sx={{ color: "white", padding: "1px" }}>
              {openingHour.day.substring(0, 2)}
            </TableCell>
            <TableCell sx={{ color: "white", padding: "1px" }}>
              {openingHour.times[0][0]}
            </TableCell>
            <TableCell sx={{ color: "white", padding: "1px" }}>
              {openingHour.times[0][1]}
            </TableCell>
            <TableCell sx={{ color: "white", padding: "1px" }}>
              {openingHour.times[1][0]}
            </TableCell>
            <TableCell sx={{ color: "white", padding: "1px" }}>
              {openingHour.times[1][1]}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default ChatbotOpeningHours;
