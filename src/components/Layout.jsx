import React from "react";
import { Box, Container, useColorModeValue } from "@chakra-ui/react";
import { Navbar } from "./Navbar";

export function Layout({ children }) {
  return (
    <Box bg={useColorModeValue("white", "gray.700")} minH="100vh" w="100%">
      <Navbar />
      <Container maxW="container.lg">{children}</Container>
    </Box>
  );
}