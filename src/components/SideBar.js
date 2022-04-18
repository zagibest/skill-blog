import { Box, Button, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import {
  FaChevronLeft,
  FaMarker,
  FaChevronRight,
  FaBook,
  FaUser,
  FaUsersCog,
  FaUserAstronaut,
} from "react-icons/fa";

export function SideBar({
  open,
  handleOpen,
  setMenuNumber,
  currentMenu,
  admin,
  superADMIN,
}) {
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
                <FaUser color={currentMenu === 1 ? "#1f46cf" : "black"} />
              }
              variant="ghost"
              bg={currentMenu === 1 ? "gray.100" : "none"}
              onClick={() => setMenuNumber(1)}
              _focus={{ border: "none" }}
            >
              Хэрэглэгч
            </Button>
            <Button
              w="90%"
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              my="2"
              leftIcon={
                <FaMarker color={currentMenu === 2 ? "#1f46cf" : "black"} />
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
                <FaBook color={currentMenu === 3 ? "#1f46cf" : "black"} />
              }
              variant="ghost"
              onClick={() => setMenuNumber(3)}
              bg={currentMenu === 3 ? "gray.100" : "none"}
              _focus={{ border: "none" }}
            >
              Бүх нийтлэлүүд
            </Button>
            {admin && (
              <Button
                w="90%"
                my="2"
                display="flex"
                justifyContent="flex-start"
                variant="ghost"
                onClick={() => setMenuNumber(4)}
                bg={currentMenu === 4 ? "gray.100" : "none"}
                _focus={{ border: "none" }}
                leftIcon={
                  <FaUsersCog
                    fontSize="20px"
                    color={currentMenu === 4 ? "#1f46cf" : "black"}
                  />
                }
              >
                Админ
              </Button>
            )}
            {superADMIN && (
              <Button
                w="90%"
                my="2"
                display="flex"
                justifyContent="flex-start"
                variant="ghost"
                onClick={() => setMenuNumber(5)}
                bg={currentMenu === 5 ? "gray.100" : "none"}
                _focus={{ border: "none" }}
                leftIcon={
                  <FaUsersCog
                    fontSize="20px"
                    color={currentMenu === 5 ? "#1f46cf" : "black"}
                  />
                }
              >
                Super Admin
              </Button>
            )}
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
              <FaUser color={currentMenu === 1 ? "#1f46cf" : "black"} />
            </Button>
            <Button
              w="90%"
              my="2"
              variant="ghost"
              onClick={() => setMenuNumber(2)}
              bg={currentMenu === 2 ? "gray.100" : "none"}
              _focus={{ border: "none" }}
            >
              <FaMarker color={currentMenu === 2 ? "#1f46cf" : "black"} />
            </Button>
            <Button
              w="90%"
              my="2"
              variant="ghost"
              onClick={() => setMenuNumber(3)}
              bg={currentMenu === 3 ? "gray.100" : "none"}
              _focus={{ border: "none" }}
            >
              <FaBook color={currentMenu === 3 ? "#1f46cf" : "black"} />
            </Button>
            {admin && (
              <Button
                w="90%"
                my="2"
                variant="ghost"
                onClick={() => setMenuNumber(4)}
                bg={currentMenu === 4 ? "gray.100" : "none"}
                _focus={{ border: "none" }}
              >
                <FaUsersCog
                  fontSize="20px"
                  color={currentMenu === 4 ? "#1f46cf" : "black"}
                />
              </Button>
            )}
            {superADMIN && (
              <Button
                w="90%"
                my="2"
                variant="ghost"
                onClick={() => setMenuNumber(5)}
                bg={currentMenu === 5 ? "gray.100" : "none"}
                _focus={{ border: "none" }}
              >
                <FaUserAstronaut
                  fontSize="20px"
                  color={currentMenu === 5 ? "#1f46cf" : "black"}
                />
              </Button>
            )}
          </Box>
        )}
        <Box
          w={{ md: "90%", base: "100%" }}
          display="flex"
          justifyContent={open ? "flex-end" : "center"}
          mb="5"
        >
          <Button
            onClick={() => {
              handleOpen();
            }}
            variant="ghost"
          >
            {open ? <FaChevronLeft /> : <FaChevronRight />}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
