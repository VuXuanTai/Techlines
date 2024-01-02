import { Box, Stack, Wrap, WrapItem, Button, Alert, AlertIcon, AlertTitle, Center } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard.jsx";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../redux/actions/productActions.js";
import { Link } from "react-router-dom";

const BrandScreen = () => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const renderBrandProducts = (brandName) => {
    const filteredProducts = products.filter((product) => product.brand === brandName).slice(0, 5);

    return (
      <Box m="15px" border="1px" borderColor="gray.200" padding="15px" key={brandName}>
        <Stack>
          <Button
            as={Link}
            to={`/products/brand/${brandName}`} // Sử dụng brandName làm phần của đường dẫn
            textAlign="center"
            fontWeight="bold"
            fontSize="lg"
          >
            {brandName}
          </Button>
          <Wrap spacing="30px" justify="center" mx={{ base: "12", md: "20", lg: "32" }}>
            {error ? (
              <Alert status="error">
                <AlertIcon />
                <AlertTitle>We are sorry!</AlertTitle>
              </Alert>
            ) : (
              filteredProducts.map((product) => (
                <WrapItem key={product.id}>
                  <Center w="250px" h="450pz">
                    <ProductCard product={product} loading={loading} />
                  </Center>
                </WrapItem>
              ))
            )}
          </Wrap>
        </Stack>
      </Box>
    );
  };

  return (
    <>
      {products.length >= 1 && (
        <>
          {renderBrandProducts("VCONNEX")}
          {renderBrandProducts("LUMI")}
          {renderBrandProducts("HUNONIC")}
        </>
      )}
    </>
  );
};

export default BrandScreen;
