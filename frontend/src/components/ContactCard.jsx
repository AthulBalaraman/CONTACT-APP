import { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Stack,
  Box,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";
import { PhoneIcon, EmailIcon } from "@chakra-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";

const ContactCard = ({ userID }) => {
  const [isContact, setIsContact] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [contactArray, setContactArray] = useState({});

  const [isName, setIsName] = useState("");
  const [isEmail, setIsEmail] = useState("");
  const [isPhone, setIsPhone] = useState("");

  useEffect(() => {
    const fetchContacts = async (userID) => {
      const myContacts = await axios.get(
        `http://localhost:5000/getMyContacts?id=${userID}`
      );
      setIsContact(myContacts.data);
    };
    fetchContacts(userID);
  }, [userID]);
  const handleDelete = async (contactID) => {
    const response = await axios.delete(
      `http://localhost:5000/deleteContact?id=${contactID}`
    );
    const message = response.data.message;
    Swal.fire("Success", `${message}`, "success");
    window.location.reload();
  };

  const openEdit = async (contactID) => {
    const response = await axios.get(
      `http://localhost:5000/editContact?id=${contactID}`
    )
    setContactArray(response.data);
    console.log("this is edit contactArray ===>> ", contactArray);
    setIsName(contactArray.name);
    setIsEmail(contactArray.email);
    setIsPhone(contactArray.phoneNumber);
    setTimeout(onOpen,500)
    
  };

  const handleEdit = async (contactID) => {
    console.log("this is name", isName);
    console.log("this is phone", isPhone);
    console.log("this is email", isEmail);
    const response = await axios.put(
      `http://localhost:5000/editContact?id=${contactID}&name=${isName}&phone=${isPhone}&email=${isEmail}`
    );
  };
  return (
    <>
      <TableContainer mx="5%" mt={9}>
        <Table variant="striped" colorScheme="teal">
          <TableCaption>Made by Athul Balaraman</TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Phone </Th>
              <Th>Email</Th>
              <Th>Edit</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {isContact.map((item) => (
              <Tr>
                <Td>{item.name}</Td>
                <Td>{item.phoneNumber}</Td>
                <Td>{item.email}</Td>
                <Td>
                  <Button
                    bg="blue"
                    color="white"
                    onClick={() => {
                      openEdit(item._id);
                    }}
                  >
                    Edit
                  </Button>
                </Td>

                <>
                  <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader mx="auto" color="green" as="b">
                        EDIT THIS CONTACT
                      </ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <Stack mx="15%">
                          <Box>
                            <FormLabel>Edit name :</FormLabel>
                            <InputGroup>
                              <InputLeftElement
                                pointerEvents="none"
                                children={<FontAwesomeIcon icon={faPen} />}
                              />
                              <Input
                                type="text"
                                value={isName}
                                onChange={(e) => setIsName(e.target.value)}
                              />
                            </InputGroup>
                          </Box>
                          <Box>
                            <FormLabel>Edit Phone number :</FormLabel>
                            <InputGroup>
                              <InputLeftElement
                                pointerEvents="none"
                                children={<PhoneIcon color="gray.300" />}
                              />
                              <Input
                                type="tel"
                                placeholderTextColor="white"
                                value={isPhone}
                                onChange={(e) => setIsPhone(e.target.value)}
                              />
                            </InputGroup>
                          </Box>
                          <Box>
                            <FormLabel>Edit email :</FormLabel>
                            <InputGroup>
                              <InputLeftElement
                                pointerEvents="none"
                                children={<EmailIcon color="gray.300" />}
                              />
                              <Input
                                type="email"
                                placeholderTextColor="white"
                                value={isEmail}
                                onChange={(e) => setIsEmail(e.target.value)}
                              />
                            </InputGroup>
                          </Box>
                        </Stack>
                      </ModalBody>

                      <ModalFooter>
                        <Button colorScheme="red" mr={3} onClick={onClose}>
                          Close
                        </Button>
                        <Button
                          colorScheme="blue"
                          onClick={() => {
                            handleEdit(item._id);
                          }}
                        >
                          Edit
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </>

                <Td>
                  <Button
                    bg="red"
                    color="white"
                    onClick={() => {
                      handleDelete(item._id);
                    }}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};
export default ContactCard;

//       <FontAwesomeIcon size="2x" icon={faEdit} />
//       <FontAwesomeIcon size="2x" icon={faTrash} />
