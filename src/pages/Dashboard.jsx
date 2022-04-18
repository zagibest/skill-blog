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
  Badge,
  useEditableControls,
  ButtonGroup,
  IconButton,
  Flex,
  Image,
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
  FaUserEdit,
  FaSave,
  FaTimes,
  FaEdit,
} from "react-icons/fa";
import { PostCard } from "../components/PostCard";
import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../utils/init-firebase";
import { UserProfile } from "../components/UserProfile";

export default function Dashboard() {
  const { blogData, authorData } = useAuth();
  const [approvedBut, setApprovedBut] = useState(true);
  const [approvedButAdmin, setApprovedButAdmin] = useState(true);
  const { currentUser } = useAuth();
  console.log(currentUser?.user.uid);

  const [open, setOpen] = useState(false);
  const [menuNumber, setMenuNumber] = useState(1);
  const toast = useToast();

  const [selectedUser, setSelectedUser] = useState();

  var approvedPostNo = 0,
    AllcommentNo = 0,
    pendingPostNo = 0;

  useEffect(() => {
    const unsub = authorData?.forEach((author) => {
      if (currentUser?.user.uid === author.id) {
        setSelectedUser(author);
      }
    });
    return unsub;
  }, [currentUser, authorData]);

  console.log("selectedUser", selectedUser);

  //Admin commands

  const deletePost = (id) => {
    try {
      deleteDoc(doc(db, "blogPost", id));
      showToast();
    } catch (e) {
      alert(e);
    }
  };

  const deleteUser = (id) => {
    try {
      deleteDoc(doc(db, "authors", id));
      showToast();
    } catch (e) {
      alert(e);
    }
  };

  const makeAdmin = (id) => {
    try {
      updateDoc(doc(db, "authors", id), { admin: true });
      showToast();
    } catch (e) {
      alert(e);
    }
  };

  const acceptPost = (id) => {
    try {
      updateDoc(doc(db, "blogPost", id), { approved: true });
      showToast();
    } catch (e) {
      alert(e);
    }
  };

  // blogs

  const notApproved = blogData?.map((post) => {
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
    if (post.approved === false && post.authorId === currentUser?.user.uid) {
      pendingPostNo++;
      return (
        <PostCard
          key={post.id}
          title={post.title}
          authorName={post.authorName}
          date={year + "/" + month + "/" + days}
          body={post.body}
          link={post.id}
          authorPro={post.authorPro}
          admin={selectedUser?.admin}
          delete={() => deletePost(post.id)}
          approve={() => acceptPost(post.id)}
        />
      );
    }
  });

  const notApprovedAll = blogData?.map((post) => {
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
    if (post.approved === false) {
      return (
        <PostCard
          key={post.id}
          title={post.title}
          authorName={post.authorName}
          date={year + "/" + month + "/" + days}
          body={post.body}
          link={post.id}
          authorPro={post.authorPro}
          admin={selectedUser?.admin}
          delete={() => deletePost(post.id)}
          approve={() => acceptPost(post.id)}
        />
      );
    }
  });

  const ApprovedAll = blogData?.map((post) => {
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
    if (post.approved === true) {
      return (
        <PostCard
          key={post.id}
          title={post.title}
          authorName={post.authorName}
          date={year + "/" + month + "/" + days}
          body={post.body}
          link={post.id}
          authorPro={post.authorPro}
          admin={selectedUser?.admin}
          delete={() => deletePost(post.id)}
        />
      );
    }
  });

  const Approved = blogData?.map((post) => {
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
    if (post.approved === true && post.authorId === currentUser?.user.uid) {
      AllcommentNo += post.comments.length;

      approvedPostNo++;
      return (
        <PostCard
          key={post.id}
          title={post.title}
          authorName={post.authorName}
          date={year + "/" + month + "/" + days}
          body={post.body}
          link={post.id}
          authorPro={post.authorPro}
          admin={selectedUser?.admin}
          delete={() => deletePost(post.id)}
        />
      );
    }
  });

  useEffect(() => {
    const unsub = () => {
      try {
        updateDoc(
          doc(db, "authors", currentUser?.user.uid),
          {
            approvedPost: approvedPostNo,
          },
          { merge: true }
        );
      } catch (e) {
        alert(e);
      }
    };
    return () => {
      unsub();
    };
  }, [approvedPostNo, currentUser?.user.uid]);

  useEffect(() => {
    const unsub = () => {
      updateDoc(
        doc(db, "authors", currentUser?.user.uid),
        {
          pendingPost: pendingPostNo,
        },
        { merge: true }
      );
    };
    return () => {
      unsub();
    };
  }, [currentUser?.user.uid, pendingPostNo]);

  const handleOpen = () => {
    setOpen(!open);
  };

  const showToast = () => {
    toast({
      title: "Амжилттай",
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
        authorName: currentUser?.user.displayName
          ? currentUser?.user.displayName
          : currentUser?.user.email,
        authorPro: currentUser?.user.photoURL ? currentUser?.user.photoURL : "",
        dateCreated: serverTimestamp(),
        approved: false,
        authorId: currentUser?.user.uid,
        likeNo: 0,
        commentNo: 0,
        likedUsers: [],
        commentedUsers: [],
        comments: [],
      });
      showToast();
      setMenuNumber(3);
    } catch (error) {
      alert(error);
    }
  };

  // function EditableControls() {
  //   const {
  //     isEditing,
  //     getSubmitButtonProps,
  //     getCancelButtonProps,
  //     getEditButtonProps,
  //   } = useEditableControls();

  //   return isEditing ? (
  //     <ButtonGroup justifyContent="center" size="sm" ml="10">
  //       <IconButton
  //         icon={<FaCheck />}
  //         {...getSubmitButtonProps()}
  //         onClick={changeUserName}
  //       />
  //       <IconButton icon={<FaTimes />} {...getCancelButtonProps()} />
  //     </ButtonGroup>
  //   ) : (
  //     <Flex justifyContent="center" ml="10">
  //       <IconButton size="sm" icon={<FaEdit />} {...getEditButtonProps()} />
  //     </Flex>
  //   );
  // }

  const [newName, setNewName] = useState(currentUser?.user.displayName);

  const changeUserName = () => {
    try {
      updateDoc(doc(db, "authors", currentUser?.user.uid), {
        authorName: newName,
      });
    } catch (e) {
      alert(e);
    }
  };
  console.log(newName);

  const showToastFail = () => {
    toast({
      title: "Амжилтгүй",
      status: "error",
      duration: 3000,
      isClosable: true,
      variant: "left-accent",
      position: "top-right",
    });
  };

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.50", "gray.700")} w="100%">
      <DashboardNav
        setMenuNumber={setMenuNumber}
        currentMenu={menuNumber}
        admin={selectedUser?.admin}
        superADMIN={selectedUser?.superADMIN}
      />
      <Box display="flex" w="100%">
        <SideBar
          open={open}
          handleOpen={handleOpen}
          setMenuNumber={setMenuNumber}
          currentMenu={menuNumber}
          admin={selectedUser?.admin}
          superADMIN={selectedUser?.superADMIN}
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
                  <Button
                    leftIcon={<FaPaperPlane />}
                    w={{ md: "48", base: "48%" }}
                    bg={approvedBut ? "gray.200" : "transparent"}
                    onClick={() => setApprovedBut(true)}
                  >
                    Явуулсан
                  </Button>
                  <Button
                    ml="2"
                    leftIcon={<FaCheck />}
                    w={{ md: "48", base: "48%" }}
                    onClick={() => setApprovedBut(false)}
                    bg={approvedBut ? "transparent" : "gray.200"}
                  >
                    Нийтлэгдсэн
                  </Button>
                </Box>
                <Box>{approvedBut ? notApproved : Approved}</Box>
              </Box>
            )}
            {menuNumber === 2 && <SlateJSTextEditor command={sendData} />}
            {menuNumber === 1 && (
              <Box flex="1">
                <Box display="flex" justifyContent="space-between">
                  <Box display="flex">
                    <Box display="flex" flexDir="column">
                      <Avatar src={currentUser?.user.photoURL} />
                      {selectedUser?.admin && (
                        <Badge mt="2" bg="primary" color="white">
                          Админ
                        </Badge>
                      )}
                    </Box>

                    <Box ml="10">
                      <Box display="flex" alignItems="center">
                        <Editable
                          defaultValue={
                            currentUser?.user.displayName
                              ? currentUser?.user.displayName
                              : currentUser?.user.email
                          }
                          display="flex"
                          onChange={(e) => setNewName(e)}
                          fontWeight="bold"
                          fontSize="lg"
                        >
                          <EditablePreview />
                          <EditableInput />
                        </Editable>
                      </Box>
                      <Text mt="5" as="i">
                        {currentUser?.user.email}
                      </Text>
                    </Box>
                  </Box>
                  <Box ml="20" display="flex" flexDir="column"></Box>
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
                        {approvedPostNo}
                      </Text>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                      <Text mb="3" display="flex" alignItems="center">
                        <FaEye />
                        <Text ml="2">Нийт үзсэн:</Text>
                      </Text>
                      <Text fontSize="xl" color="primary">
                        coming soon...
                      </Text>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                      <Text mb="3" display="flex" alignItems="center">
                        <FaThumbsUp />
                        <Text ml="2">Нийт лайк:</Text>
                      </Text>
                      <Text fontSize="xl" color="primary">
                        coming soon...
                      </Text>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                      <Text display="flex" alignItems="center">
                        <FaComment />
                        <Text ml="2">Нийт сэтгэгдэл:</Text>
                      </Text>
                      <Text fontSize="xl" color="primary">
                        {AllcommentNo}
                      </Text>
                    </Box>
                    <Divider my="4" />
                    <Box display="flex" justifyContent="space-between">
                      <Text mb="3" display="flex" alignItems="center">
                        <FaStar />
                        <Text ml="2">REPUTATION POINT:</Text>
                      </Text>
                      <Text fontSize="xl" color="primary" fontWeight="bold">
                        {AllcommentNo + approvedPostNo}
                      </Text>
                    </Box>
                  </Box>
                  <Box flex="2" mt="5" ml={{ md: "10", base: "0" }}></Box>
                </Box>
              </Box>
            )}
            {selectedUser?.admin && menuNumber === 4 && (
              <Box>
                <Text
                  fontWeight="semibold"
                  mb="2"
                  fontFamily="heading"
                  fontSize="xl"
                >
                  Админ
                </Text>
                <Box display="flex">
                  <Button
                    leftIcon={<FaPaperPlane />}
                    w={{ md: "48", base: "48%" }}
                    bg={approvedButAdmin ? "gray.200" : "transparent"}
                    onClick={() => setApprovedButAdmin(true)}
                  >
                    Ирсэн
                  </Button>
                  <Button
                    ml="2"
                    leftIcon={<FaCheck />}
                    w={{ md: "48", base: "48%" }}
                    onClick={() => setApprovedButAdmin(false)}
                    bg={approvedButAdmin ? "transparent" : "gray.200"}
                  >
                    Нийтлэгдсэн
                  </Button>
                </Box>
                <Box>{approvedButAdmin ? notApprovedAll : ApprovedAll}</Box>
              </Box>
            )}
            {selectedUser?.superADMIN && menuNumber === 5 && (
              <Box>
                {authorData?.map((author) => {
                  return (
                    <UserProfile
                      key={author.id}
                      authorName={author.authorName}
                      authorPro={author.authorPro}
                      approvedPost={author.approvedPost}
                      superADMIN={selectedUser?.superADMIN}
                      deleteUser={() => deleteUser(author.id)}
                      makeAdmin={() => makeAdmin(author.id)}
                    />
                  );
                })}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
