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
import { PostCard } from "../components/PostCard";

export default function Homepage() {
  return <Layout></Layout>;
}
