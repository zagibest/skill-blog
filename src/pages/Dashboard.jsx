import {
  Box,
  useColorModeValue,
  Text,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  Divider,
  Avatar,
  useToast,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { DashboardNav } from "../components/DashboardNav";
import { SideBar } from "../components/SideBar";
import { useAuth } from "../contexts/AuthContext";
import SlateJSTextEditor from "../components/Editor/Skate";
import {
  FaPaperPlane,
  FaCheck,
  FaEye,
  FaThumbsUp,
  FaComment,
  FaStar,
} from "react-icons/fa";
import { PostCard } from "../components/PostCard";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../utils/init-firebase";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [open, setOpen] = useState(false);
  const [menuNumber, setMenuNumber] = useState(1);
  const toast = useToast();

  const handleOpen = () => {
    setOpen(!open);
  };

  const showToast = () => {
    toast({
      title: "Амжилттай",
      description: "Нийтлэл илгээгдлээ.",
      status: "success",
      duration: 3000,
      isClosable: true,
      variant: "left-accent",
      position: "top-right",
    });
  };

  const sendData = (title, value) => {
    try {
      addDoc(collection(db, "blogPost"), {
        title: title,
        body: value,
        authorName: currentUser?.displayName
          ? currentUser.displayName
          : currentUser.email,
        authorPro: currentUser?.photoURL,
        dateCreated: serverTimestamp(),
        approved: false,
      });
      showToast();
      setMenuNumber(3);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.50", "gray.700")} w="100%">
      <DashboardNav setMenuNumber={setMenuNumber} currentMenu={menuNumber} />
      <Box display="flex" w="100%">
        <SideBar
          open={open}
          handleOpen={handleOpen}
          setMenuNumber={setMenuNumber}
          currentMenu={menuNumber}
        />
        <Box
          w="100%"
          minH="100%"
          mt="16"
          ml={{ md: open ? "200px" : "80px", base: "0" }}
        >
          <Box
            p={{ md: "10", base: "4" }}
            bg="white"
            m={{ md: "10", base: "4" }}
            borderRadius="10"
            minH={{ md: "70vh", base: "80vh" }}
            h="100%"
          >
            {menuNumber === 3 && (
              <Box>
                <Box display="flex">
                  <Button leftIcon={<FaCheck />} w={{ md: "48", base: "48%" }}>
                    Нийтлэгдсэн
                  </Button>
                  <Button
                    ml="2"
                    leftIcon={<FaPaperPlane />}
                    w={{ md: "48", base: "48%" }}
                  >
                    Явуулсан
                  </Button>
                </Box>
              </Box>
            )}
            {menuNumber === 2 && <SlateJSTextEditor command={sendData} />}
            {menuNumber === 1 && (
              <Box flex="1">
                <Box display="flex">
                  <Avatar src={currentUser?.photoURL} />
                  <Box ml="10">
                    <Box display="flex" alignItems="center">
                      <Text fontWeight="semibold">Нэр:</Text>
                      <Editable
                        defaultValue={
                          currentUser?.displayName
                            ? currentUser?.displayName
                            : "Нэр"
                        }
                        ml="2"
                      >
                        <EditablePreview />
                        <EditableInput />
                      </Editable>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <Text fontWeight="semibold">Овог:</Text>
                      <Editable defaultValue="Овог" ml="2">
                        <EditablePreview />
                        <EditableInput />
                      </Editable>
                    </Box>
                  </Box>
                </Box>
                <Divider py="3" />
                <Box display="flex" flexDir={{ md: "row", base: "column" }}>
                  <Box
                    mt="5"
                    fontSize="lg"
                    fontWeight="semibold"
                    flex="1"
                    mr="10"
                  >
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      // alignItems="center"
                    >
                      <Text mb="3" display="flex" alignItems="center">
                        <FaCheck />
                        <Text ml="2">Нийт нийтлэгдсэн:</Text>
                      </Text>
                      <Text fontSize="xl" color="primary">
                        20
                      </Text>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                      <Text mb="3" display="flex" alignItems="center">
                        <FaEye />
                        <Text ml="2">Нийт үзсэн:</Text>
                      </Text>
                      <Text fontSize="xl" color="primary">
                        20
                      </Text>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                      <Text mb="3" display="flex" alignItems="center">
                        <FaThumbsUp />
                        <Text ml="2">Нийт лайк:</Text>
                      </Text>
                      <Text fontSize="xl" color="primary">
                        20
                      </Text>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                      <Text display="flex" alignItems="center">
                        <FaComment />
                        <Text ml="2">Нийт сэтгэгдэл:</Text>
                      </Text>
                      <Text fontSize="xl" color="primary">
                        20
                      </Text>
                    </Box>
                    <Divider my="4" />
                    <Box display="flex" justifyContent="space-between">
                      <Text mb="3" display="flex" alignItems="center">
                        <FaStar />
                        <Text ml="2">REPUTATION POINT:</Text>
                      </Text>
                      <Text fontSize="xl" color="primary" fontWeight="bold">
                        20
                      </Text>
                    </Box>
                  </Box>
                  <Box flex="2" mt="5" ml={{ md: "10", base: "0" }}>
                    <Text
                      fontSize="xl"
                      fontWeight="semibold"
                      fontFamily="heading"
                    >
                      Хамгийн их хандалттай нийтлэлүүд
                    </Text>
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

// <FormControl isRequired>
//               <FormLabel>Гарчиг</FormLabel>
//               <InputGroup>
//                 <Input
//                   placeholder="Нийтлэлийн гарчиг"
//                   w={{ md: "50%", base: "100%" }}
//                 ></Input>
//               </InputGroup>
//             </FormControl>
