"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { BrushIcon } from "lucide-react";
import {
  BACKGROUND_PRESETS,
  useBackgroundStore,
} from "@/store/useBackgroundStore";

export default function BackgroundSelector() {
  const { setBg } = useBackgroundStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <BrushIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {BACKGROUND_PRESETS.map((preset) => (
          <DropdownMenuItem
            key={preset.value}
            onSelect={() => setBg(preset.value)}
          >
            {preset.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
