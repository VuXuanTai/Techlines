import { Box, Image, Text, Badge, Flex, IconButton, Skeleton } from '@chakra-ui/react';
import {BiExpand} from 'react-icons/bi';
import React from 'react'
import { addToFavorites, removeFromFavorites } from '../redux/actions/productActions';
import { useSelector, useDispatch } from 'react-redux';
import {MdOutlineFavorite, MdOutlineFavoriteBorder} from 'react-icons/md';

const ProductCard = ({product, loading}) => {
    const dispatch = useDispatch();
    const {favorites} = useSelector((state) => state.product)


  return (
    <Skeleton isLoaded={!loading} _hover={{size: '1.5'}}>
        <Box 
            _hover={{transform: 'scale(1.08)', transitionDuration: '0.5s'}}
            borderWidth = '1px'
            overflow = 'hidden'
            p='4'
            shadow='md'>
            <Image src={product.images[0]} fallbackSrc='https://via.placeholder.com/150' alt={product.name} height='200px'/>
            {product.stock <5 ? (
                <Badge colorScheme='yellow'>only {product.stock} left</Badge>
            ) : product.stock < 1 ? (
                <Badge colorScheme='red'>Sold out</Badge>
            ) : (<Badge colorScheme='green'>In Stock</Badge>
            )}
            {product.productIsNew && (
                <Badge ml={2} colorScheme='purple'>\
                    New
                </Badge>
            )}
            <Text noOfLines={1} fontSize='xl' fontWeight='semibold' mt='2'>
                {product.brand} {' '} {product.name}
            </Text>
            <Text noOfLines={1} fontSize='md' color='gray.600'>
                {product.subtitle}
            </Text>
            <Flex justify='space-between' alignItems='center' mt='2'>
                <Badge colorScheme='cyan'>{product.category}</Badge>
                <Text fontSize='xl' fontWeight='semibold' color='cyan.600'>
                    {product.price} VND
                </Text>
            </Flex>
            <Flex>
                <IconButton icon={<BiExpand size='20' />} colorScheme='cyan' size='sm' />
            </Flex>
            
        </Box>
    </Skeleton>
  )
}

export default ProductCard;