import {
  Box,
  Text,
  Badge,
  Avatar,
  LinkBox,
  Divider,
  OrderedList,
  UnorderedList,
  ListItem,
  chakra,
  Heading,
  Button,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Portal,
} from "@chakra-ui/react";
import React, { useCallback, useMemo } from "react";
import { FaCheck, FaTrash } from "react-icons/fa";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";

export const PostCard = (props) => {
  const editor = useMemo(() => withReact(createEditor()), []);
  // const existingValue = JSON.parse(props.body);

  const BlockquoteStyle = {
    margin: "1.5em 10px",
    padding: "0.5em 10px",
  };

  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

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

  return (
    <LinkBox
      _hover={{ textDecor: "none" }}
      boxShadow="base"
      p="4"
      borderRadius="10"
      w={{ lg: "xl", md: "lg", base: "100%" }}
      mt="5"
      bg="white"
    >
      <Box py="1" spacing="2">
        <Badge>????????????</Badge>
        <Badge ml="2">?????????? ????????????</Badge>
      </Box>

      <Text fontWeight="bold" fontSize="2xl" py="2" fontFamily="heading">
        {props.title}
      </Text>

      <Box maxH="100" overflow="hidden">
        <Slate value={props.body} editor={editor}>
          <Editable
            readOnly
            renderElement={renderElement}
            renderLeaf={renderLeaf}
          />
        </Slate>
      </Box>
      <Link
        _hover={{ textDecor: "none" }}
        color="primary"
        href={`post/${props.link}`}
      >
        ???????? ??????????...
      </Link>
      <Divider my="3" />
      <Box display="flex" justifyContent="space-between" alignItems="flex-end">
        <Box display="flex" alignItems="center">
          <Avatar h="10" w="10" mr="2" src={props.authorPro} />
          <Text mr="2">{props.authorName}</Text>
        </Box>
        <Box>
          <Text>{props.date}</Text>
        </Box>
      </Box>
      {props.admin && (
        <>
          <Divider my="3" />
          <Box
            alignItems="flex-end"
            justifyContent="flex-end"
            w="100%"
            display="flex"
          >
            <Popover>
              <PopoverTrigger>
                <Button ml="2">
                  <FaCheck />
                </Button>
              </PopoverTrigger>
              <Portal>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverHeader>?????????????? ?????</PopoverHeader>
                  <PopoverCloseButton />
                  <PopoverBody>
                    <Button colorScheme="green" onClick={props.approve}>
                      ????????
                    </Button>
                  </PopoverBody>
                </PopoverContent>
              </Portal>
            </Popover>
            <Popover>
              <PopoverTrigger>
                <Button ml="2">
                  <FaTrash />
                </Button>
              </PopoverTrigger>
              <Portal>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverHeader>???????????? ?????</PopoverHeader>
                  <PopoverCloseButton />
                  <PopoverBody>
                    <Button colorScheme="red" onClick={props.delete}>
                      ????????
                    </Button>
                  </PopoverBody>
                </PopoverContent>
              </Portal>
            </Popover>
          </Box>
        </>
      )}
    </LinkBox>
  );
};
