import React, { useState, useRef } from "react";
import { Button, Stack, Center, Modal, ModalOverlay, ModalContent, ModalBody, ModalFooter, ModalCloseButton, Box, IconButton } from "@chakra-ui/react";
import Slider from "react-slick";
import ProductCard from "../components/ProductCard";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const AddBuildSystem = ({ isOpen, onOpen, onClose, cancelRef, addAction, products }) => {
  const [brand, setBrand] = useState("LUMI");
  const sliderRef = useRef(null);

  const onAddProduct = (product) => {
    addAction(product);
    onClose();
  };

  const handleBrandChange = (selectedBrand) => {
    setBrand(selectedBrand);
  };

  const slickSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5, // Điều chỉnh số lượng hiển thị
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handlePrev = () => {
    sliderRef.current.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current.slickNext();
  };

  return (
    <>
      <Button colorScheme="teal" onClick={onOpen}>
        Add Product
      </Button>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} initialFocusRef={cancelRef}>
        <ModalOverlay />
        <ModalContent maxW="1300px" borderRadius="8px">
          <ModalCloseButton color="gray.600" _focus={{ outline: "none" }} />
          <ModalBody>
            <Stack direction="row" spacing={4} mb={4}>
              {["LUMI", "VCONNEX"].map((buttonBrand) => (
                <Button
                  key={buttonBrand}
                  colorScheme={brand === buttonBrand ? "teal" : "gray"}
                  onClick={() => handleBrandChange(buttonBrand)}
                >
                  {buttonBrand}
                </Button>
              ))}
            </Stack>

            <Slider ref={sliderRef} {...slickSettings}>
              {products
                .filter((product) => product.brand === brand)
                .map((product) => (
                  <Box key={product.id} w="100%" h="100%" borderRadius="8px" overflow="hidden" boxShadow="md">
                    <Center>
                      <ProductCard product={product} />
                    </Center>
                    <Center>
                      <Button colorScheme="teal" onClick={() => onAddProduct(product)} mt={3} size="sm">
                        Add to System
                      </Button>
                    </Center>
                  </Box>
                ))}
            </Slider>
            <Center mt={4}>
              <IconButton
                icon={<ChevronLeftIcon />}
                colorScheme="teal"
                aria-label="Previous"
                onClick={handlePrev}
                mr={2}
              />
              <IconButton
                icon={<ChevronRightIcon />}
                colorScheme="teal"
                aria-label="Next"
                onClick={handleNext}
              />
            </Center>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddBuildSystem;
