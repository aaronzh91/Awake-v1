import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface FilterBarProps {
  onFilterChange?: (filters: FilterState) => void;
}

interface FilterState {
  serviceType?: string;
  date?: Date;
  time?: string;
  timeRange?: [number, number];
  priceRange?: string;
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
  { label: "Early Morning (6AM-9AM)", value: "early-morning" },
  { label: "Morning (9AM-12PM)", value: "morning" },
  { label: "Afternoon (12PM-5PM)", value: "afternoon" },
  { label: "Evening (5PM-9PM)", value: "evening" },
];

const priceRanges = [
  { label: "Any Price", value: "any" },
  { label: "$0 - $50", value: "0-50" },
  { label: "$51 - $100", value: "51-100" },
  { label: "$101 - $150", value: "101-150" },
  { label: "$151+", value: "151-plus" },
];

const getCurrentTimeSlot = () => {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 9) return "early-morning";
  if (hour >= 9 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 21) return "evening";
  return "any";
};

const FilterBar = ({ onFilterChange }: FilterBarProps) => {
  const [useTimeRange, setUseTimeRange] = useState(false);
  const [timeRange, setTimeRange] = useState([9, 17]); // 9 AM to 5 PM by default

  const handleServiceTypeChange = (value: string) => {
    onFilterChange?.({ serviceType: value });
  };

  const handleDateChange = (date: Date | undefined) => {
    onFilterChange?.({ date });
  };

  const handleTimeChange = (value: string) => {
    onFilterChange?.({ time: value });
  };

  const handleTimeRangeChange = (value: number[]) => {
    setTimeRange(value);
    onFilterChange?.({ timeRange: value as [number, number] });
  };

  const handlePriceRangeChange = (value: string) => {
    onFilterChange?.({ priceRange: value });
  };

  return (
    <div className="flex gap-4 mb-4 bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-purple-100 shadow-sm">
      <Select
        defaultValue="all-services"
        onValueChange={handleServiceTypeChange}
      >
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

      <DatePicker defaultDate={new Date()} onChange={handleDateChange} />

      {!useTimeRange ? (
        <Select
          defaultValue={getCurrentTimeSlot()}
          onValueChange={handleTimeChange}
        >
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
      ) : (
        <div className="flex-1 flex items-center gap-4">
          <div className="flex-1">
            <Slider
              value={timeRange}
              min={6}
              max={21}
              step={1}
              onValueChange={handleTimeRangeChange}
              className="w-full"
            />
            <div className="flex justify-between mt-2 text-sm text-muted-foreground">
              <span>{timeRange[0]}:00</span>
              <span>{timeRange[1]}:00</span>
            </div>
          </div>
        </div>
      )}

      <Select defaultValue="any" onValueChange={handlePriceRangeChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Price Range" />
        </SelectTrigger>
        <SelectContent>
          {priceRanges.map((range) => (
            <SelectItem key={range.value} value={range.value}>
              {range.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex items-center gap-2">
        <Switch
          checked={useTimeRange}
          onCheckedChange={(checked) => {
            setUseTimeRange(checked);
            if (!checked) {
              handleTimeChange(getCurrentTimeSlot());
            }
          }}
        />
        <Label>Use Time Range</Label>
      </div>
    </div>
  );
};

export default FilterBar;
