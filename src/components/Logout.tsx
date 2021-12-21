import * as React from "react";
import { signOut } from "@firebase/auth";
import { Button } from "@mui/material";
import { auth } from "../config/Firebase-config";
import { onAuthStateChanged, User } from "firebase/auth";

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
