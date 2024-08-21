import { create } from "zustand";

interface ItemsFilterStor{
    query : string;
    setQuery : (qurey : string) => void;
}

const useItemsFilterStore = create<ItemsFilterStor>()((set) =>({
    query : '',
    setQuery: (query) => set(() => ({query : query}))
}));
export default useItemsFilterStore;