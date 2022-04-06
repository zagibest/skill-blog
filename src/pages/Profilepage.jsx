import {
  chakra,
  Container,
  Heading,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { DashboardNav } from "../components/DashboardNav";
import { SideBar } from "../components/SideBar";

export default function Profilepage() {
  const { currentUser } = useAuth();
  return (
    <Box h="100vh" bg={useColorModeValue("gray.50", "gray.700")}>
      <DashboardNav />
      <Box>
        <SideBar />
      </Box>
    </Box>
  );
}
