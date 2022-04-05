import {
  Button,
  chakra,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Card } from "../components/Card";
import DividerWithText from "../components/DividerWithText";
import { Layout } from "../components/Layout";
import { useAuth } from "../contexts/AuthContext";
import useMounted from "../hooks/useMounted";

export default function Loginpage() {
  const history = useHistory();
  const { signInWithGoogle, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  // const mounted = useRef(false)
  const location = useLocation();

  // useEffect(() => {
  //   mounted.current = true
  //   return () => {
  //     mounted.current = false
  //   }
  // }, [])

  const mounted = useMounted();

  function handleRedirectToOrBack() {
    // console.log(location?.state)
    history.replace(location.state?.from ?? "/profile");
    // if (location.state) {
    //   history.replace(location.state?.from)
    // } else {
    //   history.replace('/profile')
    // }
  }

  return (
    <Layout>
      <Heading textAlign="center" my={12}>
        Нэвтрэх
      </Heading>
      <Card maxW="md" mx="auto" mt={4}>
        <chakra.form
          onSubmit={async (e) => {
            e.preventDefault();
            if (!email || !password) {
              toast({
                description: "Credentials not valid.",
                status: "error",
                duration: 9000,
                isClosable: true,
              });
              return;
            }
            // your login logic here
            setIsSubmitting(true);
            login(email, password)
              .then((res) => {
                handleRedirectToOrBack();
              })
              .catch((error) => {
                console.log(error.message);
                toast({
                  description: error.message,
                  status: "error",
                  duration: 9000,
                  isClosable: true,
                });
              })
              .finally(() => {
                // setTimeout(() => {
                //   mounted.current && setIsSubmitting(false)
                //   console.log(mounted.current)
                // }, 1000)
                mounted.current && setIsSubmitting(false);
              });
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
            <FormControl id="password">
              <FormLabel>Нууц үг</FormLabel>
              <Input
                name="password"
                type="password"
                autoComplete="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            {/* <PasswordField /> */}
            <Button
              type="submit"
              colorScheme="green"
              size="lg"
              fontSize="md"
              isLoading={isSubmitting}
            >
              Нэвтрэх
            </Button>
          </Stack>
        </chakra.form>
        <HStack justifyContent="space-between" my={4}>
          <Button variant="link">
            <Link to="/forgot-password">Нууц үг мартсан?</Link>
          </Button>
          <Button variant="link" onClick={() => history.push("/register")}>
            Бүртгүүлэх
          </Button>
        </HStack>
        <DividerWithText my={6}>ЭСВЭЛ</DividerWithText>
        <Button
          variant="outline"
          isFullWidth
          colorScheme="green"
          leftIcon={<FaGoogle />}
          onClick={() =>
            signInWithGoogle()
              .then((user) => {
                handleRedirectToOrBack();
                console.log(user);
              })
              .catch((e) => console.log(e.message))
          }
        >
          Google хаягаар нэвтрэх
        </Button>
      </Card>
    </Layout>
  );
}
