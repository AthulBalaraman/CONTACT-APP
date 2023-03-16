import { Box, Flex, Button } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useState } from "react";
import AddContactBox from "./AddContactBox";
const AddContact = () => {
  const [isOpenAddContactBox, setIsOpenAddContactBox] = useState(false);

  return (
    <Box mt={5}>
      <Box>
        <Flex justify="center">
          <Button
            bg="darkcyan"
            color="white"
            colorScheme="cyan"
            w="full"
            mx="100px"
            fontSize="xl"
            fontWeight="bold"
            onClick={() => {
              console.log(isOpenAddContactBox)
              setIsOpenAddContactBox(!isOpenAddContactBox);
            }}
          >
            <AddIcon w="25px" h="25px" mr="4" />
            Add New Contact
          </Button>
        </Flex>
      </Box>
          {isOpenAddContactBox&&(
            <AddContactBox/>
          )}
    </Box>
  );
};

export default AddContact;
