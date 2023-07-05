import { create } from "zustand";
import { RentStore } from "../interface";

const useRent = create<RentStore>((set) => ({
  isExpanded: false,
  onOpen: () => set({ isExpanded: true }),
  onClose: () => set({ isExpanded: false }),
}));

export default useRent;
