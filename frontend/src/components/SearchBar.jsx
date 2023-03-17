import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  InputRightAddon,
  Flex,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useState } from "react";
import SearchResults from "./SearchResults";
import axios from "axios";
const SearchBar = ({ userID }) => {
  const [isSearch, setIsSearch] = useState("");
  const [openSearchResults, setOpenSearchResults] = useState(true);
  const [isSearchResult, setIsSearchResult] = useState([]);
  const handleSearch = async (searchValue) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/search?searchId=${searchValue}&&userID=${userID}`
      );
      console.log("This response from search", response);
      const emailResults = response.data.emailResults;
      const phoneResults = response.data.phoneResults;

      if (emailResults.length == 0) {
        setIsSearchResult(phoneResults);
      } else if (phoneResults.length == 0) {
        setIsSearchResult(emailResults);
      }
      setOpenSearchResults(!openSearchResults);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Box mx="100px" mt={5}>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.300" />}
          />
          <Input
            focusBorderColor="darkcyan"
            type="tel"
            placeholder="Enter phone number or email "
            value={isSearch}
            onChange={(e) => setIsSearch(e.target.value)}
          />
          <InputRightAddon
            children={
              <Button
                onClick={() => {
                  handleSearch(isSearch);
                }}
              >
                Search
              </Button>
            }
          />
        </InputGroup>
      </Box>
      {!openSearchResults && (
        <SearchResults
          array={isSearchResult}
          setOpenSearchResults={setOpenSearchResults}
          openSearchResults={openSearchResults}
        />
      )}
    </>
  );
};

export default SearchBar;
