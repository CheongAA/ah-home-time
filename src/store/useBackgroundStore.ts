import { create } from "zustand";

export type BackgroundType =
  | "none"
  | "/bg/vscode.png"
  | "/bg/excel.png"
  | "/bg/figma.png"
  | string;

interface BackgroundState {
  bg: BackgroundType;
  setBg: (value: BackgroundType) => void;
}

export const BACKGROUND_PRESETS: { value: BackgroundType; label: string }[] = [
  { value: "none", label: "배경 없음" },
  { value: "/ah-home-time/bg/vscode.png", label: "VSCode" },
  { value: "/ah-home-time/bg/excel.png", label: "엑셀" },
  { value: "/ah-home-time/bg/figma.png", label: "피그마" },
  { value: "/ah-home-time/bg/error.png", label: "에러" },
];

export const useBackgroundStore = create<BackgroundState>((set) => {
  return {
    bg: "none",
    setBg: (value) => {
      if (typeof window !== "undefined") {
        localStorage.setItem("background_theme", value);
      }
      set({ bg: value });
    },
  };
});
