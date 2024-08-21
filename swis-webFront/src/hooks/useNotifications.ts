import { useQuery } from "@tanstack/react-query";
import APIClient, { setAuthToken } from "../services/APIClient"
import Notificationn from "../entities/Notifications";
interface Notifications{

    notifications : Notificationn[];
}
const useNotifications = () => {
    const apiClient = new APIClient<Notifications>("notifications");
    setAuthToken();
    return useQuery<Notifications , Error>({
        queryKey: ['notification'],
        queryFn: apiClient.get,
    })
};
export default useNotifications;