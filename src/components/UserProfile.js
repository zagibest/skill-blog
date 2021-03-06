import { Box, Text, Avatar, Button, LinkBox, Divider } from "@chakra-ui/react";
import { FaUserCheck, FaUserTimes } from "react-icons/fa";

export const UserProfile = (props) => {
  return (
    <LinkBox w="100%">
      <Divider my="3" />
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" justifyContent="space-between">
          <Avatar src={props.authorPro} />
          <Box ml="2">
            <Text fontWeight="bold">{props.authorName}</Text>
            <Text fontSize="sm">
              {props.approvedPost ? props.approvedPost + "нийтлэл" : ""}
            </Text>
          </Box>
        </Box>
        <Box>
          {props.superADMIN && (
            <>
              <Button onClick={props.makeAdmin}>
                <FaUserCheck />
              </Button>
              <Button ml="2" onClick={props.deleteUser}>
                <FaUserTimes />
              </Button>
            </>
          )}
        </Box>
      </Box>
    </LinkBox>
  );
};
