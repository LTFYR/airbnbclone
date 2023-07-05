import { create } from "zustand";
import { LoginStore } from "../interface";

const useLogin = create<LoginStore>((set) => ({
  isExpanded: false,
  onOpen: () => set({ isExpanded: true }),
  onClose: () => set({ isExpanded: false }),
}));

export default useLogin;
