import {
  Input,
  useColorModeValue,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

export const SearchBar = () => {
  return (
    <InputGroup w={{ md: "40%", base: "50%" }}>
      <InputLeftElement
        children={<FaSearch color="RGBA(255, 255, 255, 0.48)" />}
      />
      <Input
        placeholder="Хайх"
        _placeholder={{ color: "whiteAlpha.600", fontWeight: "semibold" }}
        _focus={{ borderColor: "green.500" }}
        borderColor="transparent"
        bg={useColorModeValue("green.400", "gray.700")}
        color="whiteAlpha.900"
        fontWeight="semibold"
      />
    </InputGroup>
  );
};
