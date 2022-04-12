import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Box, Button, Input } from "@chakra-ui/react";
import { FaSave, FaPaperPlane } from "react-icons/fa";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../utils/init-firebase";
import { useAuth } from "../contexts/AuthContext";

export const CreatePost = () => {
  const { currentUser } = useAuth();
  const [text, setText] = useState();
  const [title, setTitle] = useState();
  var name = currentUser?.displayName;

  const sendData = () => {
    try {
      addDoc(collection(db, "blogPost"), {
        title: title,
        body: text,
        authorName: name,
        dateCreated: serverTimestamp(),
        approved: false,
      });
      alert("success");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Box
      w="100%"
      display="flex"
      flexDir="column"
      justifyContent="space-between"
      h="100%"
    >
      <Box>
        <Input
          placeholder="Гарчиг"
          variant="unstyled"
          fontSize="2xl"
          fontWeight="semibold"
          mb="2"
          onChange={(e) => setTitle(e.target.value)}
        />
        <CKEditor
          editor={ClassicEditor}
          data={text}
          onChange={(event, editor) => {
            const data = editor.getData();
            setText(data);
          }}
        />
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
          onClick={sendData}
        >
          Нийтлэх хүсэлт явуулах
        </Button>
      </Box>
    </Box>
  );
};
