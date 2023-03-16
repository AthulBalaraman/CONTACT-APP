import {Box, Flex, Heading, Image} from "@chakra-ui/react"
const LogoHeading = () => {
  return (
    <Box mt="5">
      <Flex justify="center" alignItems="center">
        <Image src="/logo.jpg" width="60x" height="60px" mr={2} />
        <Heading as="h1"> CONTACT APP</Heading>
      </Flex>
    </Box>
  );
};

export default LogoHeading;
