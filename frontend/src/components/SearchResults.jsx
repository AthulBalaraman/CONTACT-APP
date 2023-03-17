import {
  Box,
  TableContainer,
  Thead,
  Tr,
  Table,
  Th,
  Tbody,
  Td,
  Button,
  Flex
} from "@chakra-ui/react";
const SearchResults = ({ array, setOpenSearchResults, openSearchResults }) => {
  console.log("ARRAY ++++>>>> ", array);
  if (array.length == 0) {
   array.push({
    name:"No contacts found",
   })
  }
  const handleCloseButton = ()=>{
    setOpenSearchResults(!openSearchResults)
  }
  return (
    <Box mx="5%" pb={5}>
      <TableContainer mx="5%" mt={9}>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Phone </Th>
              <Th>Email</Th>
            </Tr>
          </Thead>
          <Tbody>
            {array.map((item) => (
              <Tr>
                <Td>{item.name}</Td>
                <Td>{item.phoneNumber}</Td>
                <Td>{item.email}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Box mt={3}>
        <Flex justify="center">
          <Button
            bg="red"
            color="white"
            colorScheme="cyan"
            mx="100px"
            fontSize="xl"
            fontWeight="bold"
            onClick={handleCloseButton}
          >
            Close
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default SearchResults;
