import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout } from "../components/Layout";
import { useAuth } from "../contexts/AuthContext";
import { PostCard } from "../components/PostCard";
import { UserProfile } from "../components/UserProfile";

export default function Homepage() {
  return (
    <Layout>
      <Box></Box>
      <Box>
        <Text fontWeight="black" fontSize="3xl" mt="10">
          Санал болгох
        </Text>
        <Box display="flex" flexDir={{ md: "row", base: "column" }}>
          <Box>
            <PostCard />
            <PostCard />
            <PostCard />
          </Box>
          <Box
            ml={{ md: "5", base: "0" }}
            _hover={{ textDecor: "none" }}
            boxShadow="base"
            p="4"
            borderRadius="10"
            w={{ md: "md", base: "100%" }}
            mt="5"
            bg="white"
            // display={{ md: "block", base: "none" }}
            h="max-content"
          >
            <UserProfile />
            <UserProfile />
            <UserProfile />
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}
