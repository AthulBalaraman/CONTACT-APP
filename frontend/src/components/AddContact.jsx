import {Box,Flex,Button} from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"
import { useEffect } from "react"
const AddContact = () => {
  const addContact = ()=>{
    alert("clicked add contact")
  }
  return (
    <Box mt={5}>
        <Flex justify="center">
          <Button
            bg="darkcyan"
            color="white"
            colorScheme="cyan"
            w="full"
            mx="100px"
            fontSize="xl"
            fontWeight="bold"
            onClick={addContact}
          >
            <AddIcon w="25px" h="25px" mr="4" />
            Add Contact
          </Button>
        </Flex>
      </Box>
  )
}

export default AddContact
