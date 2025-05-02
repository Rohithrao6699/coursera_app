import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "recoil-persist", // Key in localStorage/sessionStorage
  storage: localStorage, // Can use sessionStorage if needed
});

export const CreateUserAtom = atom<string | null>({
  default: null,
  key: "userAtom",
  effects_UNSTABLE: [persistAtom],
});
