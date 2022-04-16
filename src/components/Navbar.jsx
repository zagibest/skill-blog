import {
  Box,
  Button,
  useColorModeValue,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import React from "react";
import { FaBars, FaSignOutAlt, FaPlusCircle } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import Navlink from "./Navlink";
import { SearchBar } from "./SearchBar";

export function Navbar({ bg }) {
  // const { toggleColorMode } = useColorMode();
  // const { logout, currentUser } = useAuth()
  const { logout, currentUser } = useAuth();

  return (
    <Box
      h="16"
      // bg={useColorModeValue("green.500", "gray.600")}
      // bg={color}
      bg={bg}
      w="100%"
      color="whiteAlpha.900"
      fontFamily="heading"
      zIndex="3"
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        h="100%"
      >
        <Navlink
          to="/"
          _hover={{ textDecor: "none" }}
          ml={{ md: "10", base: "0" }}
          display={{ md: "block", base: "none" }}
          bg="primary"
          name={<Button variant="unstyled">SkillEd</Button>}
        ></Navlink>
        <Navlink
          to="/"
          _hover={{ textDecor: "none", color: "green.500" }}
          ml={{ md: "10", base: "2" }}
          display={{ md: "none", base: "block" }}
          variant="outline"
          bg="primary"
          name={
            <Button variant="unstyled" fontWeight="black" fontSize="lg">
              SE
            </Button>
          }
        ></Navlink>
        <SearchBar />

        <Box display={{ md: "block", base: "none" }} mr="10">
          {!currentUser && (
            <Navlink
              to="/login"
              name="Нэвтрэх"
              _hover={{
                bg: "p9",
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
                bg: "p9",
              }}
              _focus={{
                bg: "green.500",
              }}
            />
          )}
          {currentUser && (
            <Navlink
              to="/dashboard"
              _hover={{
                bg: "p9",
              }}
              fontSize="18px"
              name={<FaPlusCircle />}
            />
          )}
          {currentUser && (
            <Navlink
              to="/dashboard"
              _hover={{
                bg: "p9",
              }}
              name="Миний булан"
            />
          )}
          {currentUser && (
            <Navlink
              _hover={{
                bg: "p9",
              }}
              to="/logout"
              name={<FaSignOutAlt />}
              fontSize="18px"
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
            _focus={{ bg: "primary" }}
            _hover={{ bg: "p9" }}
          >
            <FaBars />
          </MenuButton>
          <MenuList color="black">
            {!currentUser && (
              <>
                <MenuItem>
                  <Navlink to="/login" name="Нэвтрэх" variant="outline" />
                </MenuItem>
                <MenuItem>
                  <Navlink to="/register" name="Бүртгүүлэх" variant="outline" />
                </MenuItem>
              </>
            )}

            {currentUser && (
              <>
                <MenuItem>
                  <Navlink
                    to="/dashboard"
                    name="Dashboard"
                    w="100%"
                    variant="outline"
                  />
                </MenuItem>
                <MenuItem>
                  <Navlink
                    variant="outline"
                    to="/logout"
                    name={<FaSignOutAlt />}
                    onClick={async (e) => {
                      e.preventDefault();
                      await logout();
                    }}
                  />
                </MenuItem>
              </>
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
