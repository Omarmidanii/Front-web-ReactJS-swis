import { Box, useDisclosure } from "@chakra-ui/react";
import { AddButton } from "../components/AddButton";
import CustomModal from "../components/Modal";
import ItemsFilter from "../components/Product/ItemsFilter";
import { ProductForm } from "../components/Product/ProductForm";
import { ProductGrid } from "../components/Product/ProductGrid";

export const ProductPage = () => {
    const {isOpen , onOpen , onClose} = useDisclosure();
  return(
    <Box>
    <ItemsFilter />
   <ProductGrid />
   <AddButton onOpen={onOpen} />
   <CustomModal buttonLabel={"Add"}  onClose={onClose} isOpen={isOpen}>
    <ProductForm isEdit={false} ID={1} />
   </CustomModal>
   </Box>
  );
};
