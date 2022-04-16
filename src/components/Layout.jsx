import React from "react";
import { Box, Container, useColorModeValue } from "@chakra-ui/react";
import { Navbar } from "./Navbar";

export function Layout({ children }) {
  return (
    <Box bg={useColorModeValue("gray.50", "gray.700")} minH="100vh" w="100%">
      <Navbar bg="primary" />
      <Container maxW="container.lg">{children}</Container>
    </Box>
  );
}
