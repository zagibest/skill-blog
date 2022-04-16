import {
  Container,
  Heading,
  chakra,
  ListItem,
  UnorderedList,
  OrderedList,
} from "@chakra-ui/react";
import React, { useCallback, useMemo, useState } from "react";
import { createEditor, Descendant } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { Layout } from "../components/Layout";
import { useAuth } from "../contexts/AuthContext";
import { useParams } from "react-router-dom";

export default function Post() {
  const { blogData } = useAuth();
  const { postid } = useParams();
  console.log("postId", postid);
  const editor = useMemo(() => withReact(createEditor()), []);

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

  const Porsts = blogData?.map((e) => {
    // const existingValue = JSON.parse(e.body);
    if (e.id === postid) {
      return (
        <>
          <Heading as="h2" mt="6" mb="4">
            {e.title}
          </Heading>
          <Slate value={e.body} editor={editor}>
            <Editable
              readOnly
              renderElement={renderElement}
              renderLeaf={renderLeaf}
            />
          </Slate>
        </>
      );
    }
  });

  return (
    <Layout>
      <Container maxW="container.lg" py={4}>
        {Porsts}
      </Container>
    </Layout>
  );
}
