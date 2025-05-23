"use client";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import TimeInput from "@/components/TimeInput";
import { useState } from "react";
import { ClockIcon } from "lucide-react";
import { Button } from "./ui/button";

export default function WorkingTimeModal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <ClockIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>출퇴근 시간 설정</DialogTitle>
        </DialogHeader>
        <TimeInput onSave={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
