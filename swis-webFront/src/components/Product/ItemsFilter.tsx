import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  IconButton,
  Input,
  Select,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaFilter } from "react-icons/fa";
import useLanguage from "../../stores/LanguageStore";
import Mycolor from "../../constants";
import { SelectSector } from "./SelectSector";
import { SelectUnit } from "./SelectUnit";
import { useQueryBuilder } from "@cgarciagarcia/react-query-builder";
import useItemsFilterStore from "../../stores/ItemsFilterStore";

const ItemsFilter = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);
  const { t } = useTranslation();
  const lng = useLanguage((s) => s.lng);
  const { colorMode } = useColorMode();
  const [sector, setSctor] = useState<string>("");
  const [unit, setUnit] = useState<string>("");
  const [minSize, setMinSize] = useState<number>(0);
  const [maxSize, setMaxSize] = useState<number>(1000000000);
  const [minWeight, setMinWeight] = useState<number>(0);
  const [maxWeight, setMaxWeight] = useState<number>(1000000000);
  const [minQuantity, setMinQuantity] = useState<number>(0);
  const [maxQuantity, setMaxQuantity] = useState<number>(1000000000);
  const [minCreated, setMinCreated] = useState<string>('01-01-1900');
  const [maxCreated, setMaxCreated] = useState<string>('01-01-2100');
  const [sort, setSort] = useState<string>('name');
  const {setQuery} = useItemsFilterStore();
  const baseConfig = {};
  const builder = useQueryBuilder(baseConfig);
  const handleSubmit = () => {
    builder.clearFilters().clearSorts();
    if(sector){
        builder.filter('sector' , sector);
    }
    if(unit){
        builder.filter('unit' , unit);
    }
    builder.filter('size' , [minSize , maxSize]);
    builder.filter('weight' , [minWeight , maxWeight]);
    builder.filter('quantity' , [minQuantity , maxQuantity]);
    builder.filter('between' , [minCreated , maxCreated]);
    builder.sort(`${sort}`);
    setQuery(builder.build());
    console.log(builder.build());
  }
  const sizeofinput = "150px";
  return (
    <>
      <IconButton
        ref={btnRef}
        icon={<FaFilter />}
        bgColor={colorMode === "dark" ? "black" : "white"}
        onClick={() => {
          if (onOpen) {
            onOpen();
          }
        }}
        aria-label="Open Drawer"
      >
        <Text>{t("Filter")}</Text>
      </IconButton>
      <Drawer
        isOpen={isOpen}
        placement={lng == "en" ? "right" : "left"}
        onClose={onClose}
        finalFocusRef={btnRef}
        size={"md"}
      >
        <DrawerOverlay />
        <DrawerContent m={5}>
          <DrawerCloseButton />
          <DrawerHeader bgColor={Mycolor} color={"white"}>
            <Text textAlign={"center"}>{t("Filter Items")}</Text>
          </DrawerHeader>
            <Divider borderWidth={"2px"} />
          <DrawerBody bgColor={Mycolor} overflowY={"auto"} maxHeight={"100vh"} alignContent={'center'}>
            <Box p={2}>
              <SelectSector selectSector={setSctor} />
            </Box>
            <Box p={2}>
              <SelectUnit selectUnit={setUnit} />
            </Box>
            <HStack p={2}>
              <Text color={"white"} pr={8}>
                {t("Size")}:
              </Text>
              <Input
                type="number"
                w={sizeofinput}
                placeholder="MinSize"
                textColor={"white"}
                onChange={(e) => setMinSize(Number(e.target.value))}
              />
              <Input
                type="number"
                w={sizeofinput}
                placeholder="MaxSize"
                textColor={"white"}
                onChange={(e) => setMaxSize(Number(e.target.value))}
              />
            </HStack>
            <HStack p={2}>
              <Text color={"white"} pr={3}>
                {t("Weight")}:
              </Text>
              <Input
                type="number"
                w={sizeofinput}
                placeholder="MinWeight"
                textColor={"white"}
                onChange={(e) => setMinWeight(Number(e.target.value))}
              />
              <Input
                type="number"
                w={sizeofinput}
                placeholder="MaxWeight"
                textColor={"white"}
                onChange={(e) => setMaxWeight(Number(e.target.value))}
              />
            </HStack>
            <HStack p={2}>
              <Text color={"white"}>{t("Quantity")}:</Text>
              <Input
                type="number"
                w={sizeofinput}
                textColor={"white"}
                placeholder="MinQuantity"
                onChange={(e) => setMinQuantity(Number(e.target.value))}
              />
              <Input
                type="number"
                w={sizeofinput}
                textColor={"white"}
                placeholder="MaxQuantity"
                onChange={(e) => setMaxQuantity(Number(e.target.value))}
              />
            </HStack>
            <HStack p={2}>
              <Text color={"white"} pr={2}>
                {t("Created")}:
              </Text>
              <Input
                type="date"
                w={sizeofinput}
                textColor={"white"}
                placeholder="startDate"
                onChange={(e) => setMinCreated(e.target.value)}
              />
              <Input
                type="date"
                w={sizeofinput}
                textColor={"white"}
                placeholder="endDate"
                onChange={(e) => setMaxCreated(e.target.value)}
              />
            </HStack>
            <Select
              placeholder="Sort By :"
              onChange={(e) => {setSort(e.target.value)}}
              borderRadius={"20"}
              width={"full"}
              color="gray.400"
            >
              <option value={"name"}>{t("Name")}</option>
              <option value={"size"}>{t("Size")}</option>
              <option value={"weight"}>{t("Weight")}</option>
              <option value={"quantity"}>{t("Quantity")}</option>
              <option value={"created_at"}>{t("created_at")}</option>
            </Select>
            <HStack w={"full"} p={2}>
              <Button colorScheme="blue" w={"full"} onClick={(e) => {e.stopPropagation();handleSubmit()}}>
                {t("Filter")}
              </Button>
              <Button colorScheme="gray" w={"full"} onClick={(e) => {e.stopPropagation();builder.clearFilters().clearSorts(); setQuery(builder.build());}}>
                {t("Reset")}
              </Button>
            </HStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ItemsFilter;
