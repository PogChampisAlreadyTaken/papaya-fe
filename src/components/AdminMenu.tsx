import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

export default function AdminMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const nav = useNavigate();

  return (
    <div>
      <Button
        color="inherit"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Admin Tools
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            nav("mealmanager");
          }}
        >
          Gerichte hinzufügen
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            nav("timemanager");
          }}
        >
          Zeitmanagement
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            nav("delivermanager");
          }}
        >
          Liefergebietverwaltung
        </MenuItem>
      </Menu>
    </div>
  );
}
