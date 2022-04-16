import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import isHotkey from "is-hotkey";
import { Editable, withReact, useSlate, Slate } from "slate-react";
import { Editor, Transforms, createEditor } from "slate";
import { withHistory } from "slate-history";
import {
  MdCode,
  MdFormatBold,
  MdFormatItalic,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdFormatQuote,
  MdFormatUnderlined,
  MdLooksOne,
  MdLooksTwo,
} from "react-icons/md";
import { FaSave, FaPaperPlane } from "react-icons/fa";

// import { Button, Icon, Toolbar } from "./components";
import {
  HStack,
  Input,
  chakra,
  IconButton,
  ListItem,
  OrderedList,
  UnorderedList,
  Heading,
  Box,
  Button,
} from "@chakra-ui/react";

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];

const SlateJSTextEditor = (props) => {
  const [value, setValue] = useState(initialValue);
  const [title, setTitle] = useState("");
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  return (
    <Box
      w="100%"
      display="flex"
      flexDir="column"
      justifyContent="space-between"
      h="100%"
    >
      <Box>
        <Slate
          editor={editor}
          value={value}
          onChange={(value) => setValue(value)}
        >
          <HStack
            borderWidth={"0 0 1px 0"}
            padding={"10px 5px"}
            spacing={"5px"}
            wrap={"wrap"}
          >
            <MarkButton2 format="bold" icon={<MdFormatBold />} />
            <MarkButton2 format="italic" icon={<MdFormatItalic />} />
            <MarkButton2 format="underline" icon={<MdFormatUnderlined />} />
            <MarkButton2 format="code" icon={<MdCode />} />
            <BlockButton2 format="heading-one" icon={<MdLooksOne />} />
            <BlockButton2 format="heading-two" icon={<MdLooksTwo />} />
            <BlockButton2 format="block-quote" icon={<MdFormatQuote />} />
            <BlockButton2
              format="numbered-list"
              icon={<MdFormatListNumbered />}
            />
            <BlockButton2
              format="bulleted-list"
              icon={<MdFormatListBulleted />}
            />
          </HStack>
          <Input
            placeholder="Гарчиг"
            variant="unstyled"
            fontSize="2xl"
            fontWeight="semibold"
            mb="3"
            fontFamily="heading"
            onChange={(e) => setTitle(e.target.value)}
          />
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder="Үндсэн нийтлэл"
            style={{ minHeight: "150px", resize: "vertical", overflow: "auto" }}
            spellCheck
            autoFocus
            onKeyDown={(event) => {
              for (const hotkey in HOTKEYS) {
                if (isHotkey(hotkey, event)) {
                  event.preventDefault();
                  const mark = HOTKEYS[hotkey];
                  toggleMark(editor, mark);
                }
              }
            }}
          />
        </Slate>
      </Box>

      <Box>
        <Button
          colorScheme="green"
          leftIcon={<FaPaperPlane />}
          w={{ md: "inherit", base: "100%" }}
          mt={{ md: "0", base: "2" }}
          onClick={() => props.command(title, value)}
        >
          Нийтлэх хүсэлт явуулах
        </Button>
      </Box>
    </Box>
  );
};

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) => LIST_TYPES.includes(n.type),
    split: true,
  });

  Transforms.setNodes(editor, {
    type: isActive ? "paragraph" : isList ? "list-item" : format,
  });

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n.type === format,
  });

  return !!match;
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const BlockquoteStyle = {
  margin: "1.5em 10px",
  padding: "0.5em 10px",
};

const MarkButton2 = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <IconButton
      variant="outline"
      colorScheme="blue"
      isActive={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
      aria-label={format}
      icon={icon}
      borderWidth={0}
      fontSize={"20px"}
    />
  );
};

const BlockButton2 = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <IconButton
      variant="outline"
      colorScheme="blue"
      isActive={isBlockActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
      aria-label={format}
      icon={icon}
      borderWidth={0}
      fontSize={"20px"}
    />
  );
};

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case "block-quote":
      return (
        <chakra.blockquote
          style={BlockquoteStyle}
          borderLeftWidth={"10px"}
          borderLeftColor={"gray.200"}
          {...attributes}
        >
          {children}
        </chakra.blockquote>
      );
    case "bulleted-list":
      return <UnorderedList {...attributes}>{children}</UnorderedList>;
    case "heading-one":
      return (
        <Heading as="h1" size="3xl" {...attributes}>
          {children}
        </Heading>
      );
    case "heading-two":
      return (
        <Heading as="h2" size="2xl" {...attributes}>
          {children}
        </Heading>
      );
    case "list-item":
      return <ListItem {...attributes}>{children}</ListItem>;
    case "numbered-list":
      return <OrderedList {...attributes}>{children}</OrderedList>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = (
      <chakra.code
        padding={"3px"}
        backgroundColor={"gray.200"}
        fontSize={"90%"}
      >
        {children}
      </chakra.code>
    );
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

export default SlateJSTextEditor;
