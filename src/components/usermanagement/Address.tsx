import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import Divider from "@mui/material/Divider";
import { postAddress, updateUser } from "../../request/userManagement";
import { CustomerContext } from "../context/customerContext";
import React from "react";
import { OverlayContext } from "../context/overlayContext";

interface props {
  setIsAddingAddress: (value: boolean) => void;
  handleClose: () => void;
}

export default function Address(props: props) {
  const { setIsAddingAddress, handleClose } = props;

  //handling input values
  const [registerStreet, setRegisterStreet] = useState<string>("");
  const [registerHousenumber, setRegisterHousenumber] = useState<string>("");
  const [registerZip, setRegisterZip] = useState<string>("");
  const [registerCity, setRegisterCity] = useState<string>("");
  const [error, setError] = useState<string>("");

  const [customerContext, setCustomerContext] =
    React.useContext(CustomerContext);
  const [overlayContext, setOverlayContext] = React.useContext(OverlayContext);
  const { open } = overlayContext;

  const customer = customerContext;

  return (
    <DialogContent>
      <IconButton
        onClick={() => {
          setOverlayContext({ ...overlayContext, open: false });
        }}
        style={{ right: 10, top: 10, position: "absolute" }}
      >
        <CloseIcon />
      </IconButton>
      <Divider>Lieferadresse</Divider>
      <div>
        <TextField
          onChange={(event) => {
            setRegisterStreet(event.target.value);
          }}
          required
          id="street"
          label="Straße"
          variant="outlined"
          margin="normal"
        />

        <TextField
          onChange={(event) => {
            setRegisterHousenumber(event.target.value);
          }}
          required
          id="house-number"
          label="Hausnummer"
          variant="outlined"
          margin="normal"
          type="number"
        />
      </div>
      <div>
        <TextField
          onChange={(event) => {
            setRegisterCity(event.target.value);
          }}
          required
          id="city"
          label="Stadt"
          variant="outlined"
          margin="normal"
        />
        <TextField
          onChange={(event) => {
            setRegisterZip(event.target.value);
          }}
          required
          id="zip"
          label="Postleitzahl"
          variant="outlined"
          margin="normal"
          type="number"
        />
      </div>
      <div style={{ height: 20 }} />
      <Button
        variant="contained"
        onClick={() => {
          postAddress(
            registerCity,
            registerHousenumber,
            registerStreet,
            registerZip
          ).then((resultId) => {
            if (customer != undefined) {
              updateUser(
                customer.id,
                customer.last_name,
                customer.first_name,
                resultId
              );
            }
          });
          handleClose();
        }}
        fullWidth
      >
        Adresse hinzufügen
      </Button>
      <div style={{ height: 20 }} />
      <Button
        variant="outlined"
        onClick={() => setIsAddingAddress(false)}
        fullWidth
      >
        zurück
      </Button>
    </DialogContent>
  );
}
