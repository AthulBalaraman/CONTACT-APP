import {
  Box,
  Flex,
  Heading,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { AddIcon, PhoneIcon, EmailIcon } from "@chakra-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2'


const AddContactBox = ({userID}) => {
  const [isName, setIsName] = useState("");
  const [isEmail, setIsEmail] = useState("");
  const [isPhone, setIsPhone] = useState("");
  console.log("This is useIF from addcontact box button funtion", userID)
  const addContact = async (e) => {
    try {
      e.preventDefault();
      console.log("This is useIF from addcontact box button funtion", userID)
      const contactDetails = {
        name: isName,
        phoneNumber: isPhone,
        email: isEmail,
        userID: userID
      };
      console.log("This is contactDettails", contactDetails);
      const response = await axios.post(
        "http://localhost:5000/addContact",
        contactDetails
      );
      const message = response.data.message
      Swal.fire('Success', `${message}`, 'success')

    } catch (error) {
      console.log("this is error from frontend", error.message);
    }
  };

  return (
    <Box>
      <FormControl>
        <Flex justify="center">
          <Box
            bg="darkcyan"
            color="white"
            colorScheme="cyan"
            w="full"
            mx="100px"
            fontSize="xl"
            fontWeight="bold"
            mt={5}
            borderRadius="xl"
          >
            <Box>
              <Flex>
                <Heading mx="auto" as="h5" p={5}>
                  Please Fill The Form
                </Heading>
              </Flex>
            </Box>

            <Stack mx="15%">
              <Box>
                <FormLabel>Enter Phone number :</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<PhoneIcon color="gray.300" />}
                  />
                  <Input
                    type="tel"
                    placeholder="Phone number"
                    placeholderTextColor="white"
                    value={isPhone}
                    onChange={(e) => setIsPhone(e.target.value)}
                  />
                </InputGroup>
              </Box>
              <Box>
                <FormLabel>Enter name :</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<FontAwesomeIcon icon={faPen} />}
                  />
                  <Input
                    type="text"
                    placeholder="Name"
                    placeholderTextColor="white"
                    value={isName}
                    onChange={(e) => setIsName(e.target.value)}
                  />
                </InputGroup>
              </Box>
              <Box>
                <FormLabel>Enter email :</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<EmailIcon color="gray.300" />}
                  />
                  <Input
                    type="email"
                    placeholder="Email"
                    placeholderTextColor="white"
                    value={isEmail}
                    onChange={(e) => setIsEmail(e.target.value)}
                  />
                </InputGroup>
              </Box>
            </Stack>
            <Box m={5}>
              <Flex justify="center">
                <Button
                  bg="navajowhite"
                  color="black"
                  colorScheme="cyan"
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
          </Box>
        </Flex>
      </FormControl>
    </Box>
  );
};

export default AddContactBox;
