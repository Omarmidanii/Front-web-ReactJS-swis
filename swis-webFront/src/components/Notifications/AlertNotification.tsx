import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Flex,
} from "@chakra-ui/react";

interface Props {
  title: string;
  description: string;
  status: "info" | "warning" | "success" | "error" | "loading" | undefined;
  onClose: () => void;
}

const AlertNotification = ({ title, description, status, onClose }: Props) => {
  return (
    <Flex
    position="fixed"
    top="16%"
    left="90%"
    transform="translate(-50%, -50%)"
    width="300px"
    zIndex="9999"
  >
    <Alert status={status} variant="subtle" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center">
      <AlertIcon boxSize="20px" mr={0} />
      <AlertTitle mt={2} mb={1} fontSize="md">{title}</AlertTitle>
      <AlertDescription maxWidth="sm">{description}</AlertDescription>
      <CloseButton position="absolute" right="8px" top="8px" onClick={onClose} />
    </Alert>
  </Flex>
  );
};

export default AlertNotification;
