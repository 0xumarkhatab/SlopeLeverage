import { Center, Img, Box, HStack } from "@chakra-ui/react";
import React from "react";
import NavbarItem from "./NavbarItem";
function Navbar() {
  return (
    <Center>
      <HStack
        as="div"
        borderRadius={"20px"}
        bg={"black"}
        color={"white"}
        marginTop={"10vh"}
        width={"300px"}
        height={"60px"}
        padding={"10px"}
      >
        <Img
          borderRadius={"50%"}
          width={"40px"}
          src="https://thumbs.dreamstime.com/b/chain-icon-vector-sign-symbol-isolated-white-background-chain-logo-concept-chain-icon-vector-isolated-white-background-133731775.jpg"
        />
        <HStack
          justify={"space-between"}
          bg={"black"}
          padding={"10px"}
          borderRadius={"20px"}
          width={"100%"}
        >
          <NavbarItem link={"#"} title={"Buy"} />
          <NavbarItem link={"#"} title={"Sell"} />
          <NavbarItem link={"#"} title={"About Us"} />
        </HStack>
      </HStack>
    </Center>
  );
}

export default Navbar;
