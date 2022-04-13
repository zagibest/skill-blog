import {
  Box,
  ButtonGroup,
  Container,
  Divider,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import * as React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
// import { Logo } from "./Logo";

export const Footer = () => (
  <Box
    as="footer"
    role="contentinfo"
    py={{
      base: "12",
      md: "16",
    }}
    px={{ lg: "20", md: "10", base: "4" }}
  >
    <Divider mb="5" />
    <Stack
      spacing={{
        base: "4",
        md: "5",
      }}
    >
      <Stack justify="space-between" direction="row" align="center">
        <Text fontFamily="heading" fontWeight="semibold" fontSize="xl">
          SkillEd
        </Text>
        <ButtonGroup variant="ghost">
          <IconButton
            as="a"
            href="#"
            aria-label="LinkedIn"
            icon={<FaLinkedin fontSize="1.25rem" />}
          />
          <IconButton
            as="a"
            href="#"
            aria-label="GitHub"
            icon={<FaGithub fontSize="1.25rem" />}
          />
          <IconButton
            as="a"
            href="#"
            aria-label="Twitter"
            icon={<FaTwitter fontSize="1.25rem" />}
          />
        </ButtonGroup>
      </Stack>
      <Text fontSize="sm" color="subtle">
        &copy; {new Date().getFullYear()} Skilled, Inc. All rights reserved.
      </Text>
    </Stack>
  </Box>
);
