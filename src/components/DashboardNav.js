import {
  Box,
  Button,
  IconButton,
  useColorMode,
  useColorModeValue,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  FaMoon,
  FaSun,
  FaBars,
  FaEquals,
  FaBook,
  FaUser,
  FaMarker,
} from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import Navlink from "./Navlink";

export function DashboardNav() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { toggleColorMode } = useColorMode();
  // const { logout, currentUser } = useAuth()
  const { logout, currentUser } = useAuth();

  return (
    <Box
      borderBottom="2px"
      borderBottomColor={useColorModeValue("gray.100", "gray.600")}
      py={4}
      bg={useColorModeValue("gray.100", "gray.600")}
      w="100%"
      position="fixed"
      zIndex="1"
    >
      <Box display="flex" justifyContent="space-between">
        <Button
          display={{ md: "none", base: "block" }}
          variant="outline"
          ml="4"
          onClick={onOpen}
        >
          <FaEquals />
        </Button>
        <Link
          href="/"
          _hover={{ textDecor: "none", color: "green.500" }}
          ml={{ md: "10", base: "0" }}
          display={{ md: "block", base: "none" }}
        >
          <Button variant="unstyled">Skill Share Blog</Button>
        </Link>
        <Link
          href="/"
          _hover={{ textDecor: "none", color: "green.500" }}
          ml={{ md: "10", base: "4" }}
          display={{ md: "none", base: "block" }}
        >
          <Button variant="outline">SSB</Button>
        </Link>
        <Box display={{ md: "block", base: "none" }} mr="10">
          {!currentUser && <Navlink to="/login" name="Нэвтрэх" />}
          {!currentUser && <Navlink to="/register" name="Бүртгүүлэх" />}
          {currentUser && <Navlink to="/profile" name="Dashboard" />}
          {currentUser && (
            <Navlink
              to="/logout"
              name="Гарах"
              onClick={async (e) => {
                e.preventDefault();
                await logout();
              }}
            />
          )}
          <IconButton
            variant="ghost"
            icon={useColorModeValue(<FaSun />, <FaMoon />)}
            onClick={toggleColorMode}
            aria-label="toggle-dark-mode"
            ml="2"
          />
        </Box>
        <Menu>
          <MenuButton
            as={Button}
            variant="outline"
            display={{ md: "none", base: "block" }}
            mr="4"
          >
            <FaBars />
          </MenuButton>
          <MenuList>
            {!currentUser && (
              <>
                <MenuItem>
                  <Navlink to="/login" name="Нэвтрэх" />
                </MenuItem>
                <MenuItem>
                  <Navlink to="/register" name="Бүртгүүлэх" />
                </MenuItem>
              </>
            )}

            {currentUser && (
              <MenuItem>
                <Navlink to="/profile" name="Dashboard" />
              </MenuItem>
            )}
            <MenuItem>
              <IconButton
                variant="ghost"
                icon={useColorModeValue(<FaSun />, <FaMoon />)}
                onClick={toggleColorMode}
                aria-label="toggle-dark-mode"
              />
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        // finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerBody>
            <Button
              w="90%"
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              my="2"
              leftIcon={<FaBook />}
              mt="20"
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
            >
              Хэрэглэгч
            </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
