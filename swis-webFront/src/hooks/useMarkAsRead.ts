import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient, { setAuthToken } from "../services/APIClient";
interface response{
    success : string;
    message : string;
}
const useMarkAsRead = (id : string) => {
    const apiClient = new APIClient<response>(`notifications/${id}`);
    setAuthToken();
    const queryClient = useQueryClient();
    return useMutation<response , Error>({
            mutationKey: ['MarkAsRead'],
            mutationFn: apiClient.post,
            onSuccess: () => {
                queryClient.invalidateQueries(["notifications"]);
            }
    })
};
export default useMarkAsRead;