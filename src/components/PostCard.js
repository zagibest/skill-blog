import {
  Box,
  Text,
  Link,
  Badge,
  Grid,
  Avatar,
  Button,
  LinkBox,
  LinkOverlay,
  Divider,
} from "@chakra-ui/react";

export const PostCard = () => {
  return (
    <LinkBox
      _hover={{ textDecor: "none" }}
      boxShadow="base"
      p="4"
      borderRadius="10"
      w={{ md: "xl", base: "100%" }}
      mt="5"
      bg="white"
    >
      <Box py="1" spacing="2">
        <Badge>Санхүү</Badge>
        <Badge ml="2">Хүний хөгжил</Badge>
      </Box>

      <Text fontWeight="bold" fontSize="2xl" py="2">
        Хэрхэн бизнес эхлэх вэ?
      </Text>
      <Text>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and...
      </Text>
      <Divider my="3" />
      <Box display="flex" justifyContent="space-between" alignItems="flex-end">
        <Box display="flex" alignItems="center">
          <Avatar h="10" w="10" mr="2" />
          <Text>Батаа</Text>
        </Box>
        <Box>
          <Text>2022.12.12</Text>
        </Box>
      </Box>
    </LinkBox>
  );
};
