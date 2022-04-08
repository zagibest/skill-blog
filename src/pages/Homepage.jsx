import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout } from "../components/Layout";
import { useAuth } from "../contexts/AuthContext";
import { PostCard } from "../components/PostCard";

export default function Homepage() {
  return (
    <Layout>
      <Box></Box>
      <Box>
        <Text fontWeight="black" fontSize="3xl" mt="10">
          Санал болгох
        </Text>
        <Box>
          <PostCard />
          <PostCard />
          <PostCard />
        </Box>
      </Box>
    </Layout>
  );
}
