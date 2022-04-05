import { chakra, Container, Heading, Box } from "@chakra-ui/react";
import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { DashboardNav } from "../components/DashboardNav";
import { SideBar } from "../components/SideBar";

export default function Profilepage() {
  const { currentUser } = useAuth();
  return (
    <Box bg="gray.50" h="100vh">
      <DashboardNav />
      <Box>
        <SideBar />
      </Box>
    </Box>
  );
}
