"use client";

import BackgroundSelector from "@/components/BackgroundSelector";
import Countdown from "@/components/Countdown";
import DraggableWrapper from "@/components/DraggableWrapper";
import { Button } from "@/components/ui/button";
import WorkingTimeModal from "@/components/WorkingTimeModal";
import useDarkMode from "@/hooks/useDarkMode";
import { BackgroundType, useBackgroundStore } from "@/store/useBackgroundStore";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  MoonIcon,
  SunIcon,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const { enabled, toggle } = useDarkMode();
  const { bg, setBg } = useBackgroundStore();
  const [showSettings, setShowSettings] = useState(true);

  useEffect(() => {
    const initialBg =
      (localStorage.getItem("background_theme") as BackgroundType) ?? "none";
    setBg(initialBg);
  }, []);

  return (
    <main
      className={
        "relative flex min-h-screen flex-col items-center justify-center transition-colors bg-white dark:bg-black text-black dark:text-white"
      }
    >
      {!!bg && bg !== "none" && (
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={bg}
            alt="배경"
            className="object-fill w-full h-full "
            priority
            unoptimized
            width={1920}
            height={1080}
          />
        </div>
      )}

      <DraggableWrapper>
        <Countdown />
      </DraggableWrapper>

      <div className="fixed right-4 bottom-4 flex flex-col gap-1">
        {showSettings && (
          <div className="flex flex-col gap-1">
            <WorkingTimeModal />
            <BackgroundSelector />
            <Button onClick={toggle}>
              {enabled ? <SunIcon /> : <MoonIcon />}
            </Button>
          </div>
        )}
        <Button onClick={() => setShowSettings((prev) => !prev)}>
          {showSettings ? <ChevronDownIcon /> : <ChevronUpIcon />}
        </Button>
      </div>
    </main>
  );
}
