import { signOut } from "@firebase/auth";
import { Button } from "@mui/material";
import React from "react";
import { auth } from "../config/Firebase-config";

export default function Logout() {
  const logout = async () => {
    console.log(auth.currentUser);
    await signOut(auth);
  };

  return (
    <div>
      <Button onClick={logout} color="inherit">
        Ausloggen
      </Button>
    </div>
  );
}
