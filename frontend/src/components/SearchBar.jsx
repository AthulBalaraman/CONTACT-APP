import {Box, Input, InputGroup, InputLeftElement} from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons"
const SearchBar = () => {
  return (
    <Box mx="100px" mt={5}>
    <InputGroup>
      <InputLeftElement
        pointerEvents="none"
        children={<SearchIcon color="gray.300" />}
      />
      <Input
        focusBorderColor="darkcyan"
        type="tel"
        placeholder="Phone number"
      />
    </InputGroup>
  </Box>
  )
}

export default SearchBar
