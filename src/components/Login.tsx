import * as React from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";

export default function Login() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} color="inherit">
        Login
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Anmelden</DialogTitle>

        <DialogContent>
          <IconButton
            onClick={handleClose}
            style={{ right: 10, top: 10, position: "absolute" }}
          >
            <CloseIcon />
          </IconButton>
          <Button onClick={handleClose}>Mit Google anmelden</Button>
          <div>
            <Button onClick={handleClose}>Mit Facebook anmelden</Button>
          </div>
          <Divider>oder</Divider>
          <div style={{ height: 30 }} />
          <TextField
            id="outlined-basic"
            label="E-Mail-Adresse"
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <TextField
            id="outlined-basic"
            label="Passwort"
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <div style={{ height: 20 }} />
          <Button variant="contained" onClick={handleClose} fullWidth>
            Anmelden
          </Button>
          <div style={{ height: 20 }} />
          <Button variant="outlined" onClick={handleClose} fullWidth>
            Account erstellen?
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
