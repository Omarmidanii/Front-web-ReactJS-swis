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
  List,
  ListItem,
  Spinner,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Error } from "../components/Error";
import useNotifications from "../hooks/useNotifications";
import { IoIosNotifications } from "react-icons/io";
import Mycolor, { MyDarkColor } from "../constants";
import React, { useState } from "react";
import useLanguage from "../stores/LanguageStore";
import useMarkAsRead from "../hooks/useMarkAsRead";

const NotificationsPage = () => {
  const { data, isLoading, error, refetch } = useNotifications();
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();
  const colorr = colorMode === "light" ? Mycolor : MyDarkColor;
  const btnRef = React.useRef(null);
  const lng = useLanguage((s) => s.lng);
  const [ID, setID] = useState<string>("");
  const markone = useMarkAsRead(ID);
  
  if (isLoading) return <Spinner />;
  if (error) return <Error message={error.message} />;
  return (
    <>
      <IconButton
        aria-label=""
        icon={<IoIosNotifications size={"30px"} color="white" />}
        bgColor={colorr}
        _hover={{ bg: "red.500" }}
        onClick={() => {
          if (onOpen) onOpen();
        }}
      />
      <Drawer
        isOpen={isOpen}
        placement={lng == "en" ? "right" : "left"}
        onClose={onClose}
        finalFocusRef={btnRef}
        size={"md"}
      >
        <DrawerOverlay />
        <DrawerContent m={5} borderRadius={20}>
          <DrawerCloseButton />
          <DrawerHeader bgColor={Mycolor} color={"white"}>
            <Text textAlign={"center"}>{t("Notifications")}</Text>
          </DrawerHeader>
          <DrawerBody bgColor={Mycolor} overflowY={"auto"} maxHeight={"100vh"}>
            <Divider borderWidth={"2px"} />
            <List m={10} maxH={"540px"} overflowY={"auto"}>
              {data.notifications.map((noti, index) => (
                <Box
                  p={2}
                  m={2}
                  h={"60px"}
                  key={index}
                  borderRadius={20}
                  borderWidth="1px"
                >
                  <ListItem>
                    <HStack justifyContent={"space-between"}>
                      <Text textAlign={"center"} textColor={"white"}>
                        {noti.data?.name}
                      </Text>
                      <Button
                        onClick={() => {
                          setID(noti.id);
                          refetch();
                          markone.mutate();
                        }}
                        disabled={noti.read_at !== null}
                        colorScheme={noti.read_at === null ? "blue" : "green"}
                        borderRadius={20}
                      >
                        {noti.read_at === null ? "Mark AS Read" : "Read"}
                      </Button>
                    </HStack>
                  </ListItem>
                </Box>
              ))}
            </List>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NotificationsPage;
