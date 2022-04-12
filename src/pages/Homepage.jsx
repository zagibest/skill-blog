import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout } from "../components/Layout";
import { useAuth } from "../contexts/AuthContext";
import { PostCard } from "../components/PostCard";
import { UserProfile } from "../components/UserProfile";
import { Navbar } from "../components/Navbar";
import { FaPlus, FaChevronDown } from "react-icons/fa";

export default function Homepage() {
  return (
    <Box
      bg="gray.50"
      minH="100vh"
      w="100%"
      display="flex"
      alignItems="center"
      flexDir="column"
    >
      <Navbar />
      <Box
        w="100%"
        h="lg"
        bg="primary"
        display="flex"
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
      >
        <Text
          fontSize={{ md: "6xl", base: "3xl" }}
          color="whiteAlpha.900"
          fontFamily="heading"
          fontWeight="bold"
          mt="-24"
        >
          Ур чадвараа нийтлэх платформ
        </Text>
        <Text
          color="whiteAlpha.700"
          // fontWeight="light"
          fontSize="xl"
          pb="12"
          pt="2"
        >
          Lorem ipsum lorem test ipsumn lorem
        </Text>
        <Box>
          <Button fontFamily="heading" rightIcon={<FaPlus />}>
            Нийтлэл бичих
          </Button>
          <Button fontFamily="heading" ml="4" rightIcon={<FaChevronDown />}>
            Унших
          </Button>
        </Box>
      </Box>
      <Box maxW="container.lg" px="4">
        <Text
          fontWeight="black"
          fontSize={{ md: "4xl", base: "3xl" }}
          mt="10"
          fontFamily="heading"
        >
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
            <Text
              fontFamily="heading"
              fontSize="lg"
              fontWeight="semibold"
              mb="5"
            >
              Онцлох нийтлэгчид
            </Text>
            <UserProfile />
            <UserProfile />
            <UserProfile />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
