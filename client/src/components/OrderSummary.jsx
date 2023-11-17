import {
  Button,
  Heading,
  Flex,
  Stack,
  Text,
  useColorMode as mode,
} from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";
import { UseSelector, useSelector } from "react-redux";
import { Link as ReactLink } from "react-router-dom";

const OrderSummary = () => {
  const { subtotal, shipping } = useSelector((state) => state.cart);
  return (
    <Stack
      minWidth="300px"
      spacing="8"
      borderWidth="1px"
      borderColor={mode("cyan.500", "cyan.100")}
      rounded='lg'
      padding='8'
      w='full'
    >
      <Heading size='md'>Order Sumary</Heading>
    </Stack>
  );
};

export default OrderSummary;
