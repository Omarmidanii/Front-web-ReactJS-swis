import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import AlertNotification from "./AlertNotification";
import { Box } from "@chakra-ui/react";

interface NotificationEvent {
  report: string;
}

interface AlertNotifications {
  title: string;
  description: string;
  status: "info" | "warning" | "success" | "error" | "loading" | undefined;
}

const NotificationComponent: React.FC = () => {
  const [notification, setNotification] = useState<AlertNotifications | null>(null);
  useEffect(() => {
    Pusher.logToConsole = true;

    const pusher = new Pusher("4af6cf65d733e9c47f9d", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("swis");
    const handler = (data: NotificationEvent) => {
      setNotification({
        title: "New Report Exported",
        description: data.report,
        status: "info",
      });
    };

    channel.bind("ReportExported", handler);
    return () => {
      channel.unbind("ReportExported", handler);
      pusher.unsubscribe("swis");
    };
  }, []);

  const handleClose = () => {
    setNotification(null);
  };

  return (
    <Box p={4}>
      {notification && (
        <AlertNotification
          title={notification.title}
          description={notification.description}
          status={notification.status}
          onClose={handleClose}
        />
      )}
    </Box>
  );
};

export default NotificationComponent;
