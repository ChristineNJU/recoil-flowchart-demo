import { atom } from "recoil";

export const ShowEditState = atom<boolean>({
  key: "editState",
  default: true,
});

export const EditDataState = atom({
  key: "editState",
  default: {
    type: "Input",
    data: {},
  },
});
