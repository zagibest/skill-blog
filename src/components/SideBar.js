import { Box, Button, useColorModeValue } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  FaChevronLeft,
  FaMarker,
  FaChevronRight,
  FaBook,
  FaUser,
} from "react-icons/fa";

export function SideBar() {
  const [open, setOpen] = useState(true);

  const handleOpen = () => {
    setOpen(!open);
  };

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
            mt="20"
            w="100%"
            display="flex"
            flexDir="column"
            alignItems="center"
          >
            <Button
              w="90%"
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              my="2"
              leftIcon={<FaBook />}
              variant="ghost"
            >
              Бүх нийтлэлүүд
            </Button>
            <Button
              w="90%"
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              my="2"
              leftIcon={<FaMarker />}
              variant="ghost"
            >
              Нийтлэл бичих
            </Button>
            <Button
              w="90%"
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              my="2"
              leftIcon={<FaUser />}
              variant="ghost"
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
            <Button w="90%" my="2" variant="ghost">
              <FaBook />
            </Button>
            <Button w="90%" my="2" variant="ghost">
              <FaMarker />
            </Button>
            <Button w="90%" my="2" variant="ghost">
              <FaUser />
            </Button>
          </Box>
        )}
        <Box
          w={{ md: "90%", base: "100%" }}
          display="flex"
          justifyContent={open ? "flex-end" : "center"}
          mb="5"
        >
          <Button onClick={handleOpen} variant="ghost">
            {open ? <FaChevronLeft /> : <FaChevronRight />}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
