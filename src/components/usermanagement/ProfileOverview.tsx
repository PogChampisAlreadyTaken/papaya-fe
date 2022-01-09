import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import Divider from "@mui/material/Divider";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { Typography } from "@mui/material";
import keycloak from "../../keycloak";
import Keycloak, {
  KeycloakInstance,
  KeycloakProfile,
  KeycloakPromise,
} from "keycloak-js";
import { CustomerContext } from "../context/customerContext";
import React from "react";
import { getAddress } from "../../request/userManagement";

interface props {
  setIsAddingAddress: (value: boolean) => void;
  handleClose: () => void;
}

export default function ProfileOverview(props: props) {
  const { setIsAddingAddress, handleClose } = props;
  const [customerContext, setCustomerContext] =
    React.useContext(CustomerContext);

  return (
    <DialogContent>
      <IconButton
        onClick={() => {
          handleClose();
        }}
        style={{ right: 10, top: 10, position: "absolute" }}
      >
        <CloseIcon />
      </IconButton>
      <div>
        <EmojiEmotionsIcon style={{ fontSize: 70 }} />
        <Typography>{customerContext?.first_name}</Typography>
        <Typography>{customerContext?.last_name}</Typography>
        <Divider>Lieferaddresse</Divider>
        <Typography> {customerContext?.address?.street}</Typography>
        <Typography> {customerContext?.address?.house_number}</Typography>
        <Typography> {customerContext?.address?.zip}</Typography>
        <Typography> {customerContext?.address?.city}</Typography>

        <Typography>{customerContext?.customer_address_id}</Typography>
      </div>

      <Button
        variant="outlined"
        onClick={() => {
          setIsAddingAddress(true);
        }}
        fullWidth
      >
        Adresse ändern oder hinzufügen
      </Button>
    </DialogContent>
  );
}
