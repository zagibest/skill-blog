import {
  Button,
  Center,
  chakra,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Card } from "../components/Card";
import DividerWithText from "../components/DividerWithText";
import { Layout } from "../components/Layout";
import { useAuth } from "../contexts/AuthContext";

export default function ForgotPasswordPage() {
  const history = useHistory();
  const { forgotPassword } = useAuth();
  const toast = useToast();

  const [email, setEmail] = useState("");

  return (
    <Layout>
      <Heading textAlign="center" my={12}>
        Нууц үг мартсан
      </Heading>
      <Card maxW="md" mx="auto" mt={4}>
        <chakra.form
          onSubmit={async (e) => {
            e.preventDefault();
            // your login logic here
            try {
              await forgotPassword(email);
              toast({
                description: `${email} руу нууц үгээ шинчлэх линк явууллаа.`,
                status: "success",
                duration: 5000,
                isClosable: true,
              });
            } catch (error) {
              console.log(error.message);
              toast({
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
              });
            }
          }}
        >
          <Stack spacing="6">
            <FormControl id="email">
              <FormLabel>Цахим шуудан</FormLabel>
              <Input
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <Button
              type="submit"
              bg="primary"
              color="white"
              _hover={{ bg: "p9" }}
              size="lg"
              fontSize="md"
            >
              Илгээх
            </Button>
          </Stack>
        </chakra.form>
        <DividerWithText my={6}>ЭСВЭЛ</DividerWithText>
        <Center>
          <Button variant="link" onClick={() => history.push("/login")}>
            Нэвтрэх
          </Button>
        </Center>
      </Card>
    </Layout>
  );
}
