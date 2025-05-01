import { atom } from "recoil";

export const CreateUserAtom = atom<string | null>({
  default: null,
  key: "userAtom",
});
