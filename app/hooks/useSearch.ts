import { create } from "zustand";
import { SearchStore } from "../interface";

const useSearch = create<SearchStore>((set) => ({
  isExpanded: false,
  onOpen: () => set({ isExpanded: true }),
  onClose: () => set({ isExpanded: false }),
}));

export default useSearch;
