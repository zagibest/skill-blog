import { Input, useColorModeValue } from "@chakra-ui/react";

export const SearchBar = () => {
  return (
    <Input
      placeholder="Хайх"
      _placeholder={{ color: "whiteAlpha.600", fontWeight: "semibold" }}
      _focus={{ borderColor: "green.500" }}
      w={{ md: "40%", base: "50%" }}
      borderColor="transparent"
      bg={useColorModeValue("green.400", "gray.700")}
      color="whiteAlpha.900"
      fontWeight="semibold"
    />
  );
};
