import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";

interface FilterBarProps {
  onFilterChange?: (filters: FilterState) => void;
}

interface FilterState {
  serviceType: string;
  date: Date | undefined;
  time: string;
}

const serviceTypes = [
  { label: "All Services", value: "all-services" },
  { label: "Energy Healing", value: "energy-healing" },
  { label: "Spiritual Coaching", value: "spiritual-coaching" },
  { label: "Meditation", value: "meditation" },
  { label: "Tarot Reading", value: "tarot-reading" },
  { label: "Crystal Healing", value: "crystal-healing" },
  { label: "Sound Therapy", value: "sound-therapy" },
];

const timeSlots = [
  { label: "Any Time", value: "any" },
  { label: "Morning (9AM-12PM)", value: "morning" },
  { label: "Afternoon (12PM-5PM)", value: "afternoon" },
  { label: "Evening (5PM-9PM)", value: "evening" },
];

const getCurrentTimeSlot = () => {
  const hour = new Date().getHours();
  if (hour >= 9 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 21) return "evening";
  return "any";
};

const FilterBar = ({ onFilterChange = () => {} }: FilterBarProps) => {
  return (
    <div className="flex gap-4 mb-6 bg-white p-4 rounded-lg border">
      <Select defaultValue="all-services">
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Service Type" />
        </SelectTrigger>
        <SelectContent>
          {serviceTypes.map((type) => (
            <SelectItem key={type.value} value={type.value}>
              {type.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <DatePicker defaultDate={new Date()} />

      <Select defaultValue={getCurrentTimeSlot()}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Time" />
        </SelectTrigger>
        <SelectContent>
          {timeSlots.map((slot) => (
            <SelectItem key={slot.value} value={slot.value}>
              {slot.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterBar;
