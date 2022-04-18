import {
  Input,
  useColorModeValue,
  InputGroup,
  InputLeftElement,
  Box,
  Link,
  Text,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export const SearchBar = (props) => {
  const { blogData } = useAuth();
  const [filterData, setFilterData] = useState([]);
  const [filterWord, setFilterWord] = useState();

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setFilterWord(event.target.value);
    if (searchWord != "") {
      const newFilter = blogData?.filter((value) => {
        return value.title.toLowerCase().includes(searchWord.toLowerCase());
      });
      setFilterData(newFilter);
    } else {
      const newFilter = [];
      setFilterData(newFilter);
    }
  };

  return (
    <InputGroup w={{ md: "40%", base: "50%" }}>
      <InputLeftElement
        children={<FaSearch color="RGBA(255, 255, 255, 0.48)" />}
      />
      <Input
        placeholder="Хайх"
        _placeholder={{ color: "whiteAlpha.600", fontWeight: "semibold" }}
        _focus={{ borderColor: "p11" }}
        borderColor="transparent"
        // bg={useColorModeValue("green.400", "gray.700")}
        bg="p9"
        color="whiteAlpha.900"
        fontWeight="semibold"
        onChange={handleFilter}
      />

      {filterWord && (
        <Box
          maxH="32"
          overflowY="auto"
          borderBottomRadius="10"
          w="100%"
          position="absolute"
          top="10"
        >
          {filterData?.slice(0, 15).map((value) => {
            return (
              <Link
                href={`/post/${value.id}`}
                _hover={{ textDecor: "none" }}
                key={value.id}
              >
                <Box
                  key={value.id}
                  w="100%"
                  display="flex"
                  justifyContent="space-between"
                  minH="12"
                  borderRadius="none"
                  bg="p8"
                  _hover={{
                    bg: "p9",
                  }}
                >
                  <Text p="2">{value.title} </Text>
                </Box>
              </Link>
            );
          })}
        </Box>
      )}
    </InputGroup>
  );
};
