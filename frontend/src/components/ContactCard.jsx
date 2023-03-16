import {Box,Flex, Stack, Text} from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
const ContactCard = () => {
  return (
    <Box bg="darkcyan" mx="100px" mt={5} borderRadius="xl" p={5}>
    <Flex justify="space-around">
      <Flex>
        <FontAwesomeIcon size="2x" icon={faUser} />
      </Flex>
      <Stack textColor="white">
        <Text>Dummy name</Text>
        <Text>dummy@gmail.com</Text>
      </Stack>
      <Flex>
        <FontAwesomeIcon size="2x" icon={faEdit} />
        <FontAwesomeIcon size="2x" icon={faTrash} />
      </Flex>
    </Flex>
  </Box>
  )
}

export default ContactCard
