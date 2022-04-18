import { Box, Button, Text, Image } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { PostCard } from "../components/PostCard";
import { UserProfile } from "../components/UserProfile";
import { Navbar } from "../components/Navbar";
import { FaPlus, FaChevronDown } from "react-icons/fa";
import { Footer } from "../components/Footer";
// import { Data } from "../contexts/Data";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../utils/init-firebase";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function Homepage() {
  const { blogData } = useAuth();
  const { authorData } = useAuth();
  const { currentUser } = useAuth();

  useEffect(() => {
    const sendData = () => {
      try {
        setDoc(
          doc(db, "authors", currentUser?.user.uid),
          {
            authorName: currentUser?.user.displayName
              ? currentUser?.user.displayName
              : currentUser?.user.email,
            authorId: currentUser?.user.uid,
            authorPro: currentUser?.user.photoURL
              ? currentUser?.user.photoURL
              : "",
            role: "author",
            dateCreated: serverTimestamp(),
          },
          { merge: true }
        );
      } catch (error) {
        console.log(error);
      }
    };
    return () => sendData();
  }, [currentUser]);

  var newAuthorData = [];
  var newPostData = [];

  newAuthorData = authorData?.sort(function (a, b) {
    return a.approvedPost - b.approvedPost;
  });
  newAuthorData = newAuthorData?.reverse();

  newPostData = blogData?.sort(function (a, b) {
    return a.commentNo - b.commentNo;
  });
  newPostData = newPostData?.reverse();

  const authors = newAuthorData?.slice(0, 4).map((author) => {
    return (
      <UserProfile
        key={author.id}
        authorName={author.authorName}
        authorPro={author.authorPro}
        approvedPost={author.approvedPost}
      />
    );
  });

  const posts = newPostData.slice(0, 5)?.map((post) => {
    const year = new Date(post.dateCreated?.seconds * 1000)
      .getFullYear()
      .toString();
    var month = new Date(post.dateCreated?.seconds * 1000)
      .getMonth()
      .toString();
    const days = new Date(post.dateCreated?.seconds * 1000)
      .getDate()
      .toString();

    month++;
    if (post.approved) {
      return (
        <PostCard
          key={post.id}
          title={post.title}
          authorName={post.authorName}
          date={year + "/" + month + "/" + days}
          body={post.body}
          link={post.id}
          authorPro={post.authorPro}
        />
      );
    }
  });

  return (
    <Box
      bg="gray.50"
      minH="100vh"
      w="100%"
      display="flex"
      alignItems="center"
      flexDir="column"
    >
      <Navbar bg="transparent" />
      <Box
        w="100%"
        h="xl"
        // bg={{ md: "transparent", base: "primary" }}
        // bg="transparent"
        // bgImg="./images/test7.svg"
        display="flex"
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        px="3"
        zIndex="2"
      >
        <Image
          src="./images/final.svg"
          position="absolute"
          top="0"
          right="0"
          // w="110%"
          objectFit="cover"
          // h="100%"
          zIndex="-1"
          // display={{ md: "block", base: "none" }}
          h="xl"
        />
        <Text
          fontSize={{ md: "6xl", base: "4xl" }}
          color="whiteAlpha.900"
          fontFamily="heading"
          fontWeight="bold"
          mt="-24"
          as="h1"
        >
          Ур чадвараа нийтлэх платформ
        </Text>
        <Text
          color="whiteAlpha.700"
          // fontWeight="light"
          fontSize="xl"
          pb="12"
          pt="2"
        >
          Өөрийн ур чадвараа нийтлэлээр дамжуулан бусадтай хуваалцаарай
        </Text>
        <Box>
          <Link to={currentUser ? "/dashboard" : "/login"}>
            <Button fontFamily="heading" rightIcon={<FaPlus />}>
              Нийтлэл бичих
            </Button>
          </Link>

          <Button fontFamily="heading" ml="4" rightIcon={<FaChevronDown />}>
            Унших
          </Button>
        </Box>
      </Box>
      <Box maxW={"container.lg"} w="90%">
        <Text
          fontWeight="black"
          fontSize={{ md: "4xl", base: "3xl" }}
          mt="10"
          fontFamily="heading"
        >
          Санал болгох
        </Text>
        <Box display="flex" flexDir={{ md: "row", base: "column" }}>
          <Box>{posts}</Box>
          <Box
            ml={{ md: "5", base: "0" }}
            _hover={{ textDecor: "none" }}
            boxShadow="base"
            p="4"
            borderRadius="10"
            w={{ md: "md", base: "100%" }}
            mt="5"
            bg="white"
            // display={{ md: "block", base: "none" }}
            h="max-content"
          >
            <Text
              fontFamily="heading"
              fontSize="lg"
              fontWeight="semibold"
              mb="5"
            >
              Онцлох нийтлэгчид
            </Text>
            {authors}
          </Box>
        </Box>
      </Box>
      <Box w="100%">
        <Footer />
      </Box>
    </Box>
  );
}
