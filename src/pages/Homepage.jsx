import {
  Badge,
  Box,
  chakra,
  Code,
  Heading,
  List,
  ListItem,
  OrderedList,
} from "@chakra-ui/react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout } from "../components/Layout";
import { useAuth } from "../contexts/AuthContext";

export default function Homepage() {
  return (
    <>
      <Layout></Layout>
      <Box w="100%" h="10vh" bg="green.500"></Box>
    </>
  );
}
