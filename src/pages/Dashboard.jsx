import {
  Box,
  useColorModeValue,
  Text,
  Button,
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
  FormLabel,
  Image,
} from "@chakra-ui/react";
import React, { useState, Component } from "react";
import { DashboardNav } from "../components/DashboardNav";
import { SideBar } from "../components/SideBar";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useAuth } from "../contexts/AuthContext";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [open, setOpen] = useState(true);
  const [menuNumber, setMenuNumber] = useState(1);

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
          onEditorStateChange={this.onEditorStateChange}
          placeholder="Үндсэн нийтлэл..."
          // toolbarHidden
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
          }}
        />
      );
    }
  }

  return (
    <Box h="100vh" bg={useColorModeValue("gray.50", "gray.700")} w="100%">
      <DashboardNav />
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
          >
            {menuNumber === 1 && (
              <Box>
                <Box>
                  <Button>Зөвшөөрөгдсөн</Button>
                  <Button ml="2">Явуулсан</Button>
                </Box>
              </Box>
            )}
            {menuNumber === 2 && <ControlledEditor />}
            {menuNumber === 3 && (
              <Box>
                <Box display="flex">
                  <Image
                    borderRadius="full"
                    src={currentUser?.photoURL}
                    w="150"
                  />
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
