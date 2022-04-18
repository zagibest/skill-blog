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
  FaSignOutAlt,
  FaUsersCog,
} from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import Navlink from "./Navlink";

export function DashboardNav({
  setMenuNumber,
  currentMenu,
  admin,
  superADMIN,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { toggleColorMode } = useColorMode();
  // const { logout, currentUser } = useAuth()
  const { logout, currentUser } = useAuth();

  return (
    <Box
      h="16"
      // bg={useColorModeValue("green.500", "gray.600")}
      bg="primary"
      // bg="#02054B"
      w="100%"
      zIndex="10"
      color="whiteAlpha.900"
      position="fixed"
      fontFamily="heading"
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        h="100%"
      >
        <Button
          display={{ md: "none", base: "block" }}
          variant="outline"
          ml={"4"}
          onClick={onOpen}
        >
          <FaEquals />
        </Button>
        <Navlink
          to="/"
          _hover={{ textDecor: "none" }}
          ml={{ md: "10", base: "0" }}
          // display={{ md: "block", base: "none" }}
          name={
            <Button variant="unstyled" fontSize={{ md: "md", base: "xl" }}>
              SkillEd
            </Button>
          }
        ></Navlink>

        <Navlink
          mr="4"
          fontSize="20"
          to="/logout"
          leftIcon={<FaSignOutAlt />}
          onClick={async (e) => {
            e.preventDefault();
            await logout();
          }}
        />
      </Box>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        closeOnOverlayClick="true"
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
              leftIcon={<FaUser />}
              mt="20"
              onClick={() => {
                setMenuNumber(1);
                onClose();
              }}
            >
              Хэрэглэгч
            </Button>
            <Button
              w="90%"
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              my="2"
              leftIcon={<FaMarker />}
              onClick={() => {
                setMenuNumber(2);
                onClose();
              }}
            >
              Нийтлэл бичих
            </Button>
            <Button
              w="90%"
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              my="2"
              leftIcon={<FaBook />}
              onClick={() => {
                setMenuNumber(3);
                onClose();
              }}
            >
              Бүх нийтлэл
            </Button>
            {admin && (
              <Button
                w="90%"
                my="2"
                display="flex"
                justifyContent="flex-start"
                onClick={() => {
                  setMenuNumber(4);
                  onClose();
                }}
                _focus={{ border: "none" }}
                leftIcon={<FaUsersCog fontSize="20px" />}
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
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

// <Menu>
//           <MenuButton
//             as={Button}
//             variant="outline"
//             display={{ md: "none", base: "block" }}
//             mr="4"
//           >
//             <FaBars />
//           </MenuButton>
//           <MenuList>
//             {currentUser && (
//               <>
//                 <MenuItem>
//                   <Navlink to="/profile" name="Dashboard" />
//                 </MenuItem>

//                 <MenuItem>

//                 </MenuItem>
//               </>
//             )}
//           </MenuList>
//         </Menu>
