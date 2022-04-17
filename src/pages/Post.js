import {
  Container,
  Heading,
  chakra,
  ListItem,
  UnorderedList,
  OrderedList,
  Button,
  Box,
  Avatar,
  Text,
  Divider,
  Textarea,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { createEditor, Descendant } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { Layout } from "../components/Layout";
import { useAuth } from "../contexts/AuthContext";
import { useParams } from "react-router-dom";
import { FaThumbsUp, FaComment } from "react-icons/fa";
import {
  updateDoc,
  doc,
  arrayUnion,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../utils/init-firebase";

export default function Post() {
  const { blogData, currentUser } = useAuth();
  const { postid } = useParams();
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState();
  console.log(currentUser);
  const editor = useMemo(() => withReact(createEditor()), []);
  var likeNumber;

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

  // useEffect(() => {
  //   const unsub = () => {
  //     var l = parseInt(likeNumber) + 1;
  //     if (liked) {
  //       updateDoc(
  //         doc(db, "blogPost", postid),
  //         {
  //           likedUsers: arrayUnion(currentUser?.user.id),
  //         },
  //         { merge: true }
  //       );
  //     }
  //   };
  //   return () => {
  //     unsub();
  //   };
  // }, [liked]);

  const CommentSend = () => {
    try {
      updateDoc(doc(db, "blogPost", postid), {
        comments: arrayUnion({
          commentor: currentUser?.user.uid,
          comment: comment,
          commentDate: new Date(),
        }),
      });
      setComment("");
    } catch (e) {
      alert(e);
    }
  };

  const LikeSend = () => {
    try {
      updateDoc(doc(db, "blogPost", postid), {
        likes: arrayUnion({
          liker: currentUser?.user.uid,
          liked: liked,
        }),
      });
      setComment("");
    } catch (e) {
      alert(e);
    }
  };

  var comments;

  for (var i = 0; i < blogData?.length; i++) {
    if (blogData[i].id === postid) {
      comments = blogData[i].comments.map((data) => {
        const year = new Date(data.commentDate?.seconds * 1000)
          .getFullYear()
          .toString();
        var month = new Date(data.commentDate?.seconds * 1000)
          .getMonth()
          .toString();
        const days = new Date(data.commentDate?.seconds * 1000)
          .getDate()
          .toString();
        month++;
        return (
          <Box
            key={data.commentor}
            w={{ md: "md", sm: "90%" }}
            bg="white"
            boxShadow="sm"
            mt="4"
            borderRadius="10"
            p="4"
          >
            <Text fontWeight="semibold">{data.comment}</Text>
            <Box w="100%" display="flex" justifyContent="flex-end">
              <Text fontSize="sm">{month + "/" + days + "/" + year}</Text>
            </Box>
          </Box>
        );
      });
      console.log(blogData[i]);
    }
  }

  const Porsts = blogData?.map((e) => {
    const year = new Date(e.dateCreated?.seconds * 1000)
      .getFullYear()
      .toString();
    var month = new Date(e.dateCreated?.seconds * 1000).getMonth().toString();
    const days = new Date(e.dateCreated?.seconds * 1000).getDate().toString();

    month++;
    if (e.id === postid) {
      likeNumber = e.likeNo;
      return (
        <Container maxW="container.lg" py={4}>
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
          <Divider my="3" />
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-end"
          >
            <Box display="flex" alignItems="center">
              <Avatar h="10" w="10" mr="2" src={e.authorPro} />
              <Text mr="2">{e.authorName}</Text>
            </Box>
            <Box>
              <Text>{month + "/" + days + "/" + year}</Text>
            </Box>
          </Box>
        </Container>
      );
    }
  });

  return (
    <Layout>
      {Porsts}

      <Box display="flex" mt="10" alignItems="center">
        <Button
          onClick={() => setLiked(!liked)}
          color={liked ? "primary" : "black"}
          borderRadius="full"
        >
          <FaThumbsUp />
        </Button>
        <Text fontWeight="bold" fontSize="lg" ml="1" color="primary">
          {likeNumber}
        </Text>
      </Box>
      <Box mt="5" bg="gray.100" borderRadius="10">
        <Textarea
          placeHolder="Сэтгэгдэл"
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        {comment && (
          <Button
            m="3"
            bg="primary"
            color="white"
            leftIcon={<FaComment />}
            onClick={CommentSend}
          >
            Сэтгэгдэл үлдээх
          </Button>
        )}
      </Box>
      {comments}
    </Layout>
  );
}
