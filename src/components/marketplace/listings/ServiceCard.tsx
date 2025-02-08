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
  onBookNow = () => console.log("Book now clicked"),
}: ServiceCardProps) => {
  return (
    <Card className="w-full bg-white hover:shadow-lg transition-shadow overflow-hidden">
      <div className="flex items-center p-6 gap-8">
        {/* Time and Duration */}
        <div className="flex flex-col items-center justify-center min-w-[120px]">
          <p className="text-lg font-semibold">2:00 PM</p>
          <p className="text-sm text-muted-foreground">60 min</p>
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
            <p className="text-sm text-muted-foreground">{providerName}</p>
            <CertifiedBadge tier="gold" />
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{rating}</span>
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
