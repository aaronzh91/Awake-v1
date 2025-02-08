import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import CertifiedBadge from "../CertifiedBadge";

interface ServiceCardProps {
  title?: string;
  providerName?: string;
  providerImage?: string;
  serviceType?: string;
  rating?: number;
  price?: number;
  description?: string;
  startTime?: string;
  duration?: number;
  onBookNow?: () => void;
}

const ServiceCard = ({
  title = "Spiritual Healing Session",
  providerName = "Sarah Johnson",
  providerImage = "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
  serviceType = "Energy Healing",
  rating = 4.8,
  price = 85,
  description = "Holistic healing session focusing on chakra alignment and energy balancing.",
  startTime = "14:00",
  duration = 60,
  onBookNow = () => console.log("Book now clicked"),
}: ServiceCardProps) => {
  return (
    <Card className="w-full bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all hover:bg-white/90 overflow-hidden border-purple-100">
      <div className="flex items-center p-6 gap-8">
        {/* Time and Duration */}
        <div className="flex flex-col items-center justify-center min-w-[120px]">
          <p className="text-lg font-semibold">
            {startTime
              ? new Date(`2024-01-01T${startTime}`).toLocaleTimeString([], {
                  hour: "numeric",
                  minute: "2-digit",
                })
              : "2:00 PM"}
          </p>
          <p className="text-sm text-muted-foreground">{duration || 60} min</p>
        </div>

        {/* Provider Photo */}
        <Avatar className="h-16 w-16">
          <AvatarImage src={providerImage} alt={providerName} />
          <AvatarFallback>
            {providerName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>

        {/* Service & Provider Info */}
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-1">{title}</h3>
          <div className="flex items-center gap-2 mb-2">
            <a
              href={`/provider/${providerName.toLowerCase().replace(/ /g, "-")}`}
              className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
            >
              {providerName}
            </a>
            <CertifiedBadge tier="gold" />
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{rating?.toFixed(1)}</span>
          </div>
        </div>

        {/* Location */}
        <div className="min-w-[140px] text-sm">
          <p className="font-medium">Downtown Toronto</p>
          <p className="text-muted-foreground">2.3 km away</p>
        </div>

        {/* Price & Book Button */}
        <div className="flex flex-col items-end gap-2 min-w-[120px]">
          <Button onClick={onBookNow} className="w-full">
            ${price} Reserve
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ServiceCard;
