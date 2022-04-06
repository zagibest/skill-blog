import {
  chakra,
  Container,
  Heading,
  Box,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { DashboardNav } from "../components/DashboardNav";
import { SideBar } from "../components/SideBar";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [open, setOpen] = useState(true);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <Box h="100vh" bg={useColorModeValue("gray.50", "gray.700")} w="100%">
      <DashboardNav />
      <Box display="flex" w="100%">
        <SideBar open={open} handleOpen={handleOpen} />
        <Box
          w="100%"
          minH="100%"
          mt="16"
          ml={{ md: open ? "200px" : "80px", base: "0" }}
        >
          asdasdas
        </Box>
      </Box>
    </Box>
  );
}
