import {
  Box,
  TableContainer,
  Th,
  Tr,
  Table,
  Td,
  Thead,
  Tbody,
  Button,
  useDisclosure,
  Input,
  useToast,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddBuildSystem from "./AddBuildSystem";
import { getProducts } from "../redux/actions/productActions.js";

const BuildingTab = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const dispatch = useDispatch();
  const [itemToAdd, setItemToAdd] = useState("");
  const { loading, error, products } = useSelector((state) => state.product);
  const system = [];
  const [items, setItems] = useState([]);
  const [nextIndex, setNextIndex] = useState(1);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  
  useEffect(() => {
    console.log("Updated items:", items);
  }, [items]);

  const addProductToTable = (product) => {
    setItems([...items, { id: nextIndex, name: product.name, brand: product.brand, qty: 1, price: product.price }]);
    setNextIndex(nextIndex + 1); // Tăng giá trị nextIndex cho sản phẩm tiếp theo
    console.log(items);
  };

  const removeProductFromTable = (productId) => {
    const updatedItems = items.filter((product) => product.id !== productId);
    setItems(updatedItems);
  };

  return (
    <Box>
      {/* Nút để mở modal hoặc chuyển đến trang thêm sản phẩm */}

      {/* Bảng hiển thị sản phẩm đã chọn */}
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>STT</Th>
              <Th>Tên Sản Phẩm</Th>
              <Th>Thương hiệu</Th>
              <Th>Số lượng</Th>
              <Th>Giá</Th>
            </Tr>
          </Thead>
          <Tbody>
            {items.map((product) => (
              <Tr key={product.id}>
                <Td>{product.id}</Td>
                <Td>{product.name}</Td>
                <Td>{product.brand}</Td>
                <Td>
                  X <Input size="sm" maxW="50px" defaultValue={product.qty} placeholder="" />
                </Td>
                <Td>{product.price}</Td>
                <Td>
                  <Button variant="outline" onClick={() => removeProductFromTable(product.id)}>
                    <DeleteIcon mr="5px" />
                    Remove
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {/* Component AddBuildSystem sử dụng làm popup */}
      <AddBuildSystem
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        cancelRef={cancelRef}
        itemToAdd={itemToAdd}
        addAction={addProductToTable}
        products={products} // Truyền danh sách sản phẩm vào popup
      />
    </Box>
  );
};

export default BuildingTab;
