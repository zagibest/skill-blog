import {
  Box,
  useColorModeValue,
  Input,
  FormControl,
  FormLabel,
  InputGroup,
  Heading,
} from "@chakra-ui/react";
import React, { useState, Component } from "react";
import { DashboardNav } from "../components/DashboardNav";
import { SideBar } from "../components/SideBar";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function Dashboard() {
  const [open, setOpen] = useState(true);

  const handleOpen = () => {
    setOpen(!open);
  };

  class ControlledEditor extends Component {
    constructor(props) {
      super(props);
      this.state = {
        editorState: EditorState.createEmpty(),
      };
    }

    onEditorStateChange: Function = (editorState) => {
      this.setState({
        editorState,
      });
    };

    render() {
      const { editorState } = this.state;
      return (
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
          placeholder="Энд дарж бичнэ үү"
        />
      );
    }
  }

  return (
    <Box h="100vh" bg={useColorModeValue("gray.50", "gray.700")} w="100%">
      <DashboardNav />
      <Box display="flex" w="100%">
        <SideBar open={open} handleOpen={handleOpen} />
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
          >
            <ControlledEditor />
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
