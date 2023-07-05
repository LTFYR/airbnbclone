import { create } from "zustand";
import { RegisterStore } from "../interface";

const useRegister = create<RegisterStore>((set) => ({
  isExpanded: false,
  onOpen: () => set({ isExpanded: true }),
  onClose: () => set({ isExpanded: false }),
}));

export default useRegister;
