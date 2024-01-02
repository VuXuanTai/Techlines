import { Box, Wrap, WrapItem, Center, Button, Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard.jsx";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductsByBrand } from "../redux/actions/productActions.js";
import { Link, useParams, useNavigate } from "react-router-dom";


const BrandProductsScreen = () => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.product);
  const { brandName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProductsByBrand(brandName));
  }, [dispatch, brandName]);

  const goBack = () => {
    navigate(-1); // Sử dụng navigate để quay lại trang trước
  };

  return (
    <Box
      bg="white"
      p="6"
      borderRadius="lg"
      boxShadow="lg"
      mx="auto"
      mt="8"
      maxW={{ base: "90%", md: "80%", lg: "60%" }}
    >
      {error ? (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>We are sorry! Something went wrong.</AlertTitle>
        </Alert>
      ) : (
        <>
          <Wrap spacing="4" justify="space-between" align="center" mb="4">
            <Button onClick={goBack} fontSize="xl" fontWeight="bold" colorScheme="teal" size="lg" _hover={{ bg: "teal.700" }}>
              Go Back
            </Button>
            <Button
              as={Link}
              to={`/products/brand/${brandName}`}
              fontSize="xl"
              fontWeight="bold"
              colorScheme="teal"
              size="lg"
              _hover={{ bg: "teal.700" }}
            >
              {brandName}
            </Button>
          </Wrap>
          <Wrap spacing="4" justify="center">
            {products.map((product) => (
              <WrapItem key={product.id} flex="0 0 calc(33.3333% - 1rem)" margin="0.5rem">
                <Center>
                  <ProductCard product={product} loading={loading} />
                </Center>
              </WrapItem>
            ))}
          </Wrap>
        </>
      )}
    </Box>
  );
};

export default BrandProductsScreen;
