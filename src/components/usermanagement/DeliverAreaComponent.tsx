import { Divider, Paper, TextField, Typography } from "@mui/material";
import React from "react";

export default function DeliverAreaComponent() {
  const [deliverTime, setDeliverTime] = React.useState<String>("15");

  return (
    <div style={{ height: "300px" }}>
      <Paper style={{ backgroundColor: "#white", opacity: "95%" }}>
        <div style={{ height: "30px" }} />
        <Typography style={{ margin: "10px", fontSize: "30px" }}>
          Liefergebietsverwaltung
        </Typography>
        <div style={{ height: "30px" }} />
        <Divider></Divider>
        <div style={{ height: "30px" }} />
        <Typography style={{ margin: "10px" }}>
          Liefergebiete einstellen
        </Typography>
        <div style={{ height: "10px" }} />
        <TextField
          sx={{ fontStyle: { color: "red" } }}
          style={{ margin: "10px", font: "white" }}
          id="delivertime"
          label="Lieferkosten in €"
          variant="standard"
          type="Number"
          value={deliverTime}
          onChange={(deliverTime) => {
            setDeliverTime(deliverTime.currentTarget.value);
          }}
        />
      </Paper>
    </div>
  );
}
