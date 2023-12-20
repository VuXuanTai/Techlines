import { Box, Center, Wrap, WrapItem, Button, Alert, AlertIcon, AlertTitle, Text, Stack, Flex } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard.jsx";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../redux/actions/productActions";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

const HotDealsScreen = () => {
  const dispatch = useDispatch();
  const { loading, error, products, pagination, favoritesToggled } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts(1));
  }, [dispatch]);

  const paginationButtonClick = (page) => {
    dispatch(getProducts(page));
  };

  const displayedProducts = products.slice(0, 5);

  return (
    <>
      {products.length >= 1 && (
        <Box mx="auto" p={{ base: "0", lg: "12" }} maxH="500px">
          <Stack alignItems="center" mb="5px">
            <Text fontWeight="extrabold" fontSize="20px">
              SmartPhone
            </Text>
          </Stack>

          <Wrap
            spacing="30px"
            justify="center"
            mx={{ base: "12", md: "20", lg: "32" }}
            borderTop="1px"
            paddingTop="10px"
            borderBottom="1px"
            paddingBottom="10px"
            borderColor="gray.200"
          >
            {error ? (
              <Alert status="error">
                <AlertIcon />
                <AlertTitle>We are sorry!</AlertTitle>
              </Alert>
            ) : (
              displayedProducts.map(
                (product) =>
                  product.category === "Smartphone" && (
                    <WrapItem key={product.id}>
                      <Center w="250px" h="450pz">
                        <ProductCard product={product} loading={loading} />
                      </Center>
                    </WrapItem>
                  )
              )
            )}
          </Wrap>
        </Box>
      )}

      {products.length >= 1 && (
        <Box>
          <Box mx="auto" p={{ base: "0", lg: "12" }} maxH="500px">
            <Stack alignItems="center" mb="5px">
              <Text fontWeight="extrabold">PC</Text>
            </Stack>

            <Wrap spacing="30px" justify="center" minHeight="80vh" mx={{ base: "12", md: "20", lg: "32" }}>
              {error ? (
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle>We are sorry!</AlertTitle>
                </Alert>
              ) : (
                displayedProducts.map((product) => (
                  <WrapItem key={product.id}>
                    <Center w="250px" h="450pz">
                      <ProductCard product={product} loading={loading} />
                    </Center>
                  </WrapItem>
                ))
              )}
            </Wrap>
          </Box>
          {!favoritesToggled && <Wrap spacing="10px" justify="center" p="5"></Wrap>}
        </Box>
      )}
    </>
  );
};

export default HotDealsScreen;
