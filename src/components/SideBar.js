import { Box, Button, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import {
  FaChevronLeft,
  FaMarker,
  FaChevronRight,
  FaBook,
  FaUser,
} from "react-icons/fa";

export function SideBar({ open, handleOpen, setMenuNumber, currentMenu }) {
  return (
    <Box display={{ md: "block", base: "none" }}>
      <Box
        w={open ? "200px" : "80px"}
        bg={useColorModeValue("white", "gray.600")}
        h="100vh"
        display="flex"
        flexDir="column"
        alignItems="center"
        position="fixed"
        justifyContent="space-between"
        boxShadow="base"
      >
        {open && (
          <Box
            w="100%"
            display="flex"
            flexDir="column"
            alignItems="center"
            mt="20"
          >
            <Button
              w="90%"
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              my="2"
              leftIcon={
                <FaUser color={currentMenu === 1 ? "green" : "black"} />
              }
              variant="ghost"
              bg={currentMenu === 1 ? "gray.100" : "none"}
              onClick={() => setMenuNumber(1)}
              _focus={{ border: "none" }}
            >
              Бүх нийтлэлүүд
            </Button>
            <Button
              w="90%"
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              my="2"
              leftIcon={
                <FaMarker color={currentMenu === 2 ? "green" : "black"} />
              }
              variant="ghost"
              bg={currentMenu === 2 ? "gray.100" : "none"}
              onClick={() => setMenuNumber(2)}
              _focus={{ border: "none" }}
            >
              Нийтлэл бичих
            </Button>
            <Button
              w="90%"
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              my="2"
              leftIcon={
                <FaBook color={currentMenu === 3 ? "green" : "black"} />
              }
              variant="ghost"
              onClick={() => setMenuNumber(3)}
              bg={currentMenu === 3 ? "gray.100" : "none"}
              _focus={{ border: "none" }}
            >
              Хэрэглэгч
            </Button>
          </Box>
        )}
        {!open && (
          <Box
            mt="20"
            display="flex"
            flexDir="column"
            alignItems="center"
            w="100%"
          >
            <Button
              w="90%"
              my="2"
              variant="ghost"
              onClick={() => setMenuNumber(1)}
              bg={currentMenu === 1 ? "gray.100" : "none"}
              _focus={{ border: "none" }}
            >
              <FaUser color={currentMenu === 1 ? "green" : "black"} />
            </Button>
            <Button
              w="90%"
              my="2"
              variant="ghost"
              onClick={() => setMenuNumber(2)}
              bg={currentMenu === 2 ? "gray.100" : "none"}
              _focus={{ border: "none" }}
            >
              <FaMarker color={currentMenu === 2 ? "green" : "black"} />
            </Button>
            <Button
              w="90%"
              my="2"
              variant="ghost"
              onClick={() => setMenuNumber(3)}
              bg={currentMenu === 3 ? "gray.100" : "none"}
              _focus={{ border: "none" }}
            >
              <FaBook color={currentMenu === 3 ? "green" : "black"} />
            </Button>
          </Box>
        )}
        <Box
          w={{ md: "90%", base: "100%" }}
          display="flex"
          justifyContent={open ? "flex-end" : "center"}
          mb="5"
        >
          <Button onClick={() => handleOpen()} variant="ghost">
            {open ? <FaChevronLeft /> : <FaChevronRight />}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
