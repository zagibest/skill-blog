import { extendTheme } from "@chakra-ui/react";

const CustomTheme = extendTheme({
  colors: {
    // Primary: "#03205b",
    Primary: "#3C2244",
    // Primary: "#fffce7",
    Secondary: "#FF6270",
    Background: "#F5F5F5",
    // Background: "#FFF",
    // Background: "#03205b",
    Custom_teal: "#80E9E4",
    newColor: "#03205b",
  },

  fonts: {
    heading: "Rubik",
    body: "Nunito",
  },

  breakpoints: {
    sm: "40em",
    md: "52em",
    lg: "64em",
    xl: "80em",
  },
});

export default CustomTheme;
