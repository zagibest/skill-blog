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

export const UserProfile = () => {
  return (
    <LinkBox w="100%">
      <Divider my="3" />
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" justifyContent="space-between">
          <Avatar />
          <Box ml="2">
            <Text fontWeight="bold">Б.Эрдэнээ</Text>
            <Text fontSize="sm">210 нийтлэл</Text>
          </Box>
        </Box>
        <Button>Дагах</Button>
      </Box>
    </LinkBox>
  );
};
