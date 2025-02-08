import { Shield } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CertifiedBadgeProps {
  tier?: "gold" | "silver" | "blue" | "unverified";
}

const tierConfig = {
  gold: {
    bgColor: "bg-yellow-100",
    iconColor: "text-yellow-600",
    fillColor: "fill-yellow-200",
    label: "Gold Provider",
  },
  silver: {
    bgColor: "bg-gray-100",
    iconColor: "text-gray-600",
    fillColor: "fill-gray-200",
    label: "Silver Provider",
  },
  blue: {
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
    fillColor: "fill-blue-200",
    label: "Certified Provider",
  },
  unverified: {
    bgColor: "bg-red-100",
    iconColor: "text-red-600",
    fillColor: "fill-red-200",
    label: "Unverified Provider",
  },
};

const CertifiedBadge = ({ tier = "blue" }: CertifiedBadgeProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div
            className={`flex items-center justify-center ${tierConfig[tier].bgColor} rounded-full p-1`}
          >
            <Shield
              className={`h-4 w-4 ${tierConfig[tier].iconColor} ${tierConfig[tier].fillColor}`}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm">{tierConfig[tier].label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CertifiedBadge;
