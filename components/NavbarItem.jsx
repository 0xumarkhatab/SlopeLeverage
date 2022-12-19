import { Box, Link } from "@chakra-ui/react";
import React from "react";

function NavbarItem({ link, title }) {
  return (
    <Box color={"white"}>
      <Link href={link}>{title}</Link>
    </Box>
  );
}

export default NavbarItem;
