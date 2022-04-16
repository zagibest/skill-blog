import React from "react";
import { NavLink as Link, useLocation } from "react-router-dom";
import { Button } from "@chakra-ui/react";

export default function Navlink({ to, name, linkw, ...rest }) {
  const location = useLocation();

  const isActive = location.pathname === to;

  return (
    <Link to={to} w={linkw}>
      <Button
        variant={isActive ? "ghost" : "ghost"}
        colorScheme={isActive ? "white" : ""}
        bg={isActive ? "p9" : ""}
        {...rest}
      >
        {name}
      </Button>
    </Link>
  );
}
