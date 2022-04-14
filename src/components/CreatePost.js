import React, { useState } from "react";
import { Box, Button, Input } from "@chakra-ui/react";
import { FaSave, FaPaperPlane } from "react-icons/fa";
// import { RichTextBlock } from "../components/Editor/RichTextBlock";
import SlateJSTextEditor from "./Editor/Skate";

export const CreatePost = (props) => {
  const [text, setText] = useState();
  const [title, setTitle] = useState();
  // var name = currentUser?.displayName;

  return (
    <Box
      w="100%"
      display="flex"
      flexDir="column"
      justifyContent="space-between"
      h="100%"
    >
      <Box>
        <SlateJSTextEditor />
      </Box>

      <Box>
        <Button
          mr="2"
          colorScheme="green"
          leftIcon={<FaSave />}
          w={{ md: "inherit", base: "100%" }}
        >
          Хадгалах
        </Button>
        <Button
          leftIcon={<FaPaperPlane />}
          w={{ md: "inherit", base: "100%" }}
          mt={{ md: "0", base: "2" }}
          onClick={() => props.command(title, text)}
        >
          Нийтлэх хүсэлт явуулах
        </Button>
      </Box>
    </Box>
  );
};
