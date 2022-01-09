import { Button } from "@mui/material";
import { useKeycloak } from "@react-keycloak/web";
import * as React from "react";

interface props {}

const AdminRoute = (props: React.PropsWithChildren<props>) => {
  const { keycloak } = useKeycloak();

  return (
    <> {keycloak.hasResourceRole("admin") == true ? props.children : null}</>
  );
};

export default AdminRoute;
