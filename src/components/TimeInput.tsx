"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "working_hours";

type WorkingHours = {
  start: string; // "08:30"
  end: string; // "18:00"
};

const defaultHours: WorkingHours = {
  start: "09:00",
  end: "18:00",
};

export default function TimeInput({
  onSave,
}: {
  onSave?: (hours: WorkingHours) => void;
}) {
  const [workingHours, setWorkingHours] = useState<WorkingHours>(defaultHours);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setWorkingHours(JSON.parse(saved));
    }
  }, []);

  const handleChange = (key: keyof WorkingHours, value: string) => {
    setWorkingHours((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(workingHours));
    onSave?.(workingHours);
  };

  return (
    <div className="flex flex-col gap-4 max-w-sm w-full p-4 border rounded-xl shadow bg-white">
      <div className="flex justify-between items-center">
        <label className="font-medium">출근 시간</label>
        <input
          type="time"
          value={workingHours.start}
          onChange={(e) => handleChange("start", e.target.value)}
          className="border rounded px-2 py-1"
        />
      </div>
      <div className="flex justify-between items-center">
        <label className="font-medium">퇴근 시간</label>
        <input
          type="time"
          value={workingHours.end}
          onChange={(e) => handleChange("end", e.target.value)}
          className="border rounded px-2 py-1"
        />
      </div>
      <button
        onClick={handleSave}
        className="bg-black text-white py-2 rounded hover:opacity-80"
      >
        저장
      </button>
    </div>
  );
}
