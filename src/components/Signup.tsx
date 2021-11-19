import * as React from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Typography } from "@mui/material";

export default function Signup() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} color="inherit">
        Account erstellen
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Registrieren</DialogTitle>

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
            label="Name"
            variant="outlined"
            margin="normal"
            fullWidth
          />
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
          <TextField
            id="outlined-basic"
            label="Passwort wiederholen"
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="Erhalte Rabatte, Treueangebote und andere Updates."
            />
          </FormGroup>
          <div style={{ height: 20 }} />
          <Button variant="contained" onClick={handleClose} fullWidth>
            Registrieren
          </Button>

          <div style={{ height: 20 }} />
          <Typography style={{ color: "grey" }}>
            Beim Klicken auf "Absenden" erklärst Du Dich mit unseren{" "}
            <a href="#">AGB</a>,{" "}
            <a href="#">Geschäftsbedingungen zur Sammlung von Punkten</a>
            und <a href="#">Datenschutzerklärung</a> einverstanden.
          </Typography>

          <div style={{ height: 20 }} />
          <Button variant="outlined" onClick={handleClose} fullWidth>
            Bereits ein Account?
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
