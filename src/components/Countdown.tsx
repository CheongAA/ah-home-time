"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "working_hours";

export default function Countdown() {
  const [remaining, setRemaining] = useState<string | null>(null);

  const calculateRemainingTime = () => {
    let saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      saved = JSON.stringify({ start: "09:00", end: "18:00" });
      localStorage.setItem(STORAGE_KEY, saved);
    }

    const { end } = JSON.parse(saved) as { end: string };
    if (!end) return;

    const now = new Date();
    const [endHour, endMinute] = end.split(":").map(Number);
    const endTime = new Date();
    endTime.setHours(endHour, endMinute, 0, 0);

    const diffMs = endTime.getTime() - now.getTime();

    if (diffMs <= 0) {
      setRemaining("퇴근 완료 🎉");
    } else {
      const diffSec = Math.floor(diffMs / 1000);
      const hours = Math.floor(diffSec / 3600);
      const minutes = Math.floor((diffSec % 3600) / 60);
      const seconds = diffSec % 60;
      setRemaining(
        `${hours}:${String(minutes).padStart(2, "0")}:${String(
          seconds
        ).padStart(2, "0")}`
      );
    }
  };

  useEffect(() => {
    calculateRemainingTime(); // 초기 실행
    const interval = setInterval(calculateRemainingTime, 1000); // 1초마다 업데이트
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="text-md font-semibold text-black dark:text-white">
      {remaining}
    </span>
  );
}
