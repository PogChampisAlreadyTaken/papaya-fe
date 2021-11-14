import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Login() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} color="inherit">
        Einloggen
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Einloggen
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Email
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Password
          </Typography>
          <Button>Einloggen</Button>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Noch kein Account? Hier ein Account erstellen
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
