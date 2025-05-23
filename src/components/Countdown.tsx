"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "working_hours";

export default function Countdown() {
  const [remaining, setRemaining] = useState<string | null>(null);

  const calculateRemainingTime = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

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
      const diffMin = Math.floor(diffMs / 1000 / 60);
      const hours = Math.floor(diffMin / 60);
      const minutes = diffMin % 60;
      setRemaining(`${hours}:${minutes}`);
    }
  };

  useEffect(() => {
    calculateRemainingTime(); // 초기 실행
    const interval = setInterval(calculateRemainingTime, 1000 * 30); // 30초마다 업데이트
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="text-md font-semibold text-black dark:text-white">
      {remaining}
    </span>
  );
}
