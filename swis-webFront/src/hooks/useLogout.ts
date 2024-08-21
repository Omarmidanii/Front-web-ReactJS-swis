import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/APIClient"

const useLogout = () =>{
    const apiClient = new APIClient<{}>("logout");
    return useMutation({
        mutationKey: ['logout'],
        mutationFn: (data) => apiClient.post({}),
    })
};
export default useLogout;