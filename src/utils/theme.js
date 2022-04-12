import { extendTheme } from "@chakra-ui/react";

const CustomTheme = extendTheme({
  colors: {
    primary: "#1f46cf",
    secondary: "#245ce3",
    p1: "#E7EDFC",
    p2: "#CFDCF9",
    p3: "#B8CBF7",
    p4: "#A2BAF4",
    p5: "#8CAAF1",
    p6: "#769AEE",
    p7: "#618AEB",
    p8: "#4C7BE9",
    p9: "#386CE6",
    p11: "#2154CC",
    p12: "#1D4BB6",
    p13: "#19419F",
    p14: "#163888",
    p15: "#122F71",
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
