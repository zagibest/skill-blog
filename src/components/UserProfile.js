import {
  Box,
  Text,
  Link,
  Badge,
  Grid,
  Avatar,
  Button,
  LinkBox,
  Divider,
} from "@chakra-ui/react";

export const UserProfile = (props) => {
  return (
    <LinkBox w="100%">
      <Divider my="3" />
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" justifyContent="space-between">
          <Avatar src={props.authorPro} />
          <Box ml="2">
            <Text fontWeight="bold">{props.authorName}</Text>
            <Text fontSize="sm">{props.approvedPost} нийтлэл</Text>
          </Box>
        </Box>
        <Button>Дагах</Button>
      </Box>
    </LinkBox>
  );
};
