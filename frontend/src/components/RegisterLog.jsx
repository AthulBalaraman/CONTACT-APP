import { useState} from "react";
import { useNavigate } from "react-router-dom";
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
  FormLabel
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faKey } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";

const RegisterLog = () => {
  const [isName, setIsName] = useState("");
  const [isPassword, setIsPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate()
  const handleRegister = async () => {
    try {
      const registerDetails = {
        username: isName,
        password: isPassword,
      };
      const response = await axios.post("http://localhost:5000/register", registerDetails);
      const message = response.data.message;
      Swal.fire("Success", `${message}`, "success");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async () => {
    try {
      const loginDetails = {
        username: isName,
        password: isPassword,
      };
      const response = await axios.post("http://localhost:5000/login", loginDetails);
      const message = response.data.message;
      const userID = response.data.userID
      Swal.fire("Success", `${message}`, "success");
      navigate('/home',{state:{userID}})
    } catch (error) {
      console.log(error);
    }
  };

  const resetState = () => {
    setIsRegister(!isRegister);
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
                  My Contact App
                </Heading>
              </Flex>
            </Box>

            <Stack mx="15%">
              <Box>
                <FormLabel>Enter username :</FormLabel>
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
                <FormLabel>Enter Password :</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<FontAwesomeIcon icon={faKey} />}
                  />
                  <Input
                    type="password"
                    placeholder="Email"
                    placeholderTextColor="white"
                    value={isPassword}
                    onChange={(e) => setIsPassword(e.target.value)}
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
                  onClick={isRegister ?  handleLogin:handleRegister }
                >
                  {isRegister ? "Login" : "Register"}
                </Button>
              </Flex>
            </Box>
            {isRegister && (
              <Box mb={5}>
                <Flex justify="center">
                  <Button
                    bg="white"
                    color="black"
                    colorScheme="cyan"
                    mx="100px"
                    fontSize="xl"
                    fontWeight="bold"
                    onClick={resetState}
                  >
                    Click here to create account
                  </Button>
                </Flex>
              </Box>
            )}
            {!isRegister && (
              <Box mb={5}>
                <Flex justify="center">
                  <Button
                    bg="white"
                    color="black"
                    colorScheme="cyan"
                    mx="100px"
                    fontSize="xl"
                    fontWeight="bold"
                    onClick={resetState}
                  >
                    Click Here to Login
                  </Button>
                </Flex>
              </Box>
            )}
          </Box>
        </Flex>
      </FormControl>
    </Box>
  );
};

export default RegisterLog;
