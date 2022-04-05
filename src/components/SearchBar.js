import { Input, useColorModeValue } from "@chakra-ui/react";

export const SearchBar = () => {
  return (
    <Input
      placeholder="Хайх"
      _focus={{ borderColor: "green.500" }}
      w={{ md: "40%", base: "50%" }}
      bg={useColorModeValue("white", "gray.700")}
    />
  );
};
