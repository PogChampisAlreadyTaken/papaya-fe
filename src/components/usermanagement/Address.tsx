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
import { makeStyles } from "@material-ui/core/styles";

interface props {
  setIsAddingAddress: (value: boolean) => void;
  handleClose: () => void;
}

export default function Address(props: props) {
  const classes = useStyles();
  const { setIsAddingAddress, handleClose } = props;

  //handling input values
  const [registerStreet, setRegisterStreet] = useState<string>("");
  const [registerHousenumber, setRegisterHousenumber] = useState<string>("");
  const [registerZip, setRegisterZip] = useState<string>("");
  const [registerCity, setRegisterCity] = useState<string>("");
  
  const [customerContext, setCustomerContext] =
    React.useContext(CustomerContext);
const [overlayContext, setOverlayContext] = React.useContext(OverlayContext);
 
  const customer = customerContext;

  return (
    <DialogContent style={{ background: "#282c34f0" }}>
      <IconButton
        onClick={() => {
          setOverlayContext({ ...overlayContext, open: false });
        }}
        style={{ right: 10, top: 10, position: "absolute" }}
      >
        <CloseIcon />
      </IconButton>
      <Divider style={{ color: "#fff", fontWeight: "bold"}}>
        Lieferadresse
      </Divider>
      <div>
        <TextField
          InputLabelProps={{
            style: { color: "#fff" },
          }}
          InputProps={{
            style: { color: "#fff" },
          }}
          className={classes.overrides}
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
          InputLabelProps={{
            style: { color: "#fff" },
          }}
          InputProps={{
            style: { color: "#fff" },
          }}
          className={classes.overrides}
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
          InputLabelProps={{
            style: { color: "#fff" },
          }}
          InputProps={{
            style: { color: "#fff" },
          }}
          className={classes.overrides}
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
          InputLabelProps={{
            style: { color: "#fff" },
          }}
          InputProps={{
            style: { color: "#fff" },
          }}
          className={classes.overrides}
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
        sx={{
          color: "white",
          borderColor: "white",
          marginTop: "10px",
          marginBottom: "10px",
        }}
        variant="outlined"
        onClick={() => {
          postAddress(
            registerCity,
            registerHousenumber,
            registerStreet,
            registerZip
          ).then((address) => {
            if (customer !== undefined) {
              //set address of customer
              updateUser(
                customer.id,
                customer.last_name,
                customer.first_name,
                address?.id
              ).then((user) => {
                //update success
                user.address = address;
                setCustomerContext(user);
              });
            }
          });
          handleClose();
        }}
        fullWidth
      >
        Adresse hinzufügen
      </Button>
      <div style={{ height: 20, color: "#fff" }} />
      <Button
        sx={{
          color: "white",
          borderColor: "white",
          marginTop: "10px",
          marginBottom: "10px",
        }}
        variant="outlined"
        onClick={() => setIsAddingAddress(false)}
        fullWidth
      >
        zurück
      </Button>
    </DialogContent>
  );
}

const useStyles = makeStyles({
  overrides: {
    backgroundColor: "#282c34f0",
    "& label.Mui-focused": { color: "#fff" },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": { borderColor: "#fff" },
    },
  },
});
