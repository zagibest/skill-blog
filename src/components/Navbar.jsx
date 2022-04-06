import {
  Box,
  Button,
  HStack,
  IconButton,
  Spacer,
  useColorMode,
  useColorModeValue,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import React from "react";
import { FaMoon, FaSun, FaBars, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import Navlink from "./Navlink";
import { SearchBar } from "./SearchBar";

export function Navbar() {
  const { toggleColorMode } = useColorMode();
  // const { logout, currentUser } = useAuth()
  const { logout, currentUser } = useAuth();

  return (
    <Box
      mb={4}
      py={4}
      bg={useColorModeValue("green.500", "gray.600")}
      w="100%"
      color="whiteAlpha.900"
    >
      <Box display="flex" justifyContent="space-between">
        <Link
          href="/"
          _hover={{ textDecor: "none" }}
          ml={{ md: "10", base: "4" }}
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
        <SearchBar />

        <Box display={{ md: "block", base: "none" }} mr="10">
          {!currentUser && (
            <Navlink
              to="/login"
              name="Нэвтрэх"
              _hover={{
                bg: "green.400",
              }}
            />
          )}
          {!currentUser && (
            <Navlink
              to="/register"
              name="Бүртгүүлэх"
              ml="2"
              color={"white"}
              variant="outline"
              _hover={{
                bg: "green.400",
              }}
              _focus={{
                bg: "green.500",
              }}
            />
          )}

          {currentUser && (
            <Navlink
              to="/profile"
              _hover={{
                bg: "green.400",
              }}
              name="Dashboard"
            />
          )}
          {currentUser && (
            <Navlink
              to="/logout"
              rightIcon={<FaSignOutAlt />}
              onClick={async (e) => {
                e.preventDefault();
                await logout();
              }}
            />
          )}
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
          </MenuList>
        </Menu>
      </Box>
    </Box>
  );
}

// MenuItem
//               IconButton
//                 variant="ghost"
//                 icon={useColorModeValue(<FaSun />, <FaMoon />)}
//                 onClick={toggleColorMode}
//                 aria-label="toggle-dark-mode"
//
//             MenuItem

// <IconButton
//             variant="ghost"
//             icon={useColorModeValue(<FaSun />, <FaMoon />)}
//             onClick={toggleColorMode}
//             aria-label="toggle-dark-mode"
//             ml="2"
//           />
