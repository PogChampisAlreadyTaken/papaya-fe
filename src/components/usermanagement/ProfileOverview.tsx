import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import Divider from "@mui/material/Divider";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { Typography } from "@mui/material";

import { CustomerContext } from "../context/customerContext";
import React from "react";
import { useNavigate } from "react-router";

interface props {
  setIsAddingAddress: (value: boolean) => void;
  handleClose: () => void;
}

export default function ProfileOverview(props: props) {
  const nav = useNavigate();
  const { setIsAddingAddress, handleClose } = props;
  const [customerContext, setCustomerContext] = React.useContext(
    CustomerContext
  );

  return (
    <DialogContent style={{ background: "#282c34f0" }}>
      <IconButton
        onClick={() => {
          handleClose();
        }}
        style={{ right: 10, top: 10, position: "absolute", color: "#fff" }}
      >
        <CloseIcon />
      </IconButton>
      <div>
        <EmojiEmotionsIcon style={{ fontSize: 70, color: "#fff" }} />
        <Typography style={{ color: "#fff" }}>
          {customerContext?.first_name}
          {}
        </Typography>
        <Typography style={{ color: "#fff" }}>
          {customerContext?.last_name}
          {}
        </Typography>
        <div style={{ height: "20px" }} />
        <Divider
          style={{
            color: "#fff",
            borderBlockColor: "#fff",
            fontWeight: "bold",
          }}
        >
          Lieferadresse
        </Divider>
        <div style={{ height: "20px" }} />
        {customerContext?.customer_address_id === 0 ||
        customerContext?.customer_address_id === undefined ? (
          <></>
        ) : (
          <div>
            {" "}
            <Typography style={{ color: "#fff" }}>
              {customerContext?.address?.street}{" "}
              {customerContext?.address?.house_number}
            </Typography>
            <Typography style={{ color: "#fff" }}>
              {" "}
              {customerContext?.address?.zip} {customerContext?.address?.city}
            </Typography>
          </div>
        )}
      </div>
      <div style={{ height: "20px" }} />
      <Button
        sx={{
          color: "white",
          borderColor: "#fff",
          marginTop: "10px",
          marginBottom: "10px",
        }}
        variant="outlined"
        onClick={() => {
          setIsAddingAddress(true);
        }}
        fullWidth
      >
        Adresse ändern oder hinzufügen
      </Button>
      <div style={{ height: "20px" }} />
      <Divider />
      <div style={{ height: "20px" }} />

      <Button
        variant="outlined"
        sx={{
          color: "white",
          borderColor: "#fff",
          marginTop: "10px",
          marginBottom: "10px",
        }}
        onClick={() => {
          handleClose();
          nav("/orderhistory");
        }}
        fullWidth
      >
        Bestellungen ansehen?
      </Button>
      <div style={{ height: "20px" }} />
    </DialogContent>
  );
}
