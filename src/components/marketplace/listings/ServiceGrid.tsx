import React from "react";
import ServiceCard from "./ServiceCard";

interface Service {
  id: string;
  title: string;
  providerName: string;
  providerImage: string;
  serviceType: string;
  rating: number;
  price: number;
  location: string;
  distance: string;
  startTime: string;
  duration: number;
  certificationTier: "gold" | "silver" | "blue" | "unverified";
}

interface ServiceGridProps {
  services?: Service[];
  onBookService?: (serviceId: string) => void;
}

const ServiceGrid = ({
  services = [],
  onBookService = (serviceId: string) =>
    console.log(`Booking service ${serviceId}`),
}: ServiceGridProps) => {
  return (
    <div className="bg-gray-50 p-4 lg:p-6 w-full min-h-full rounded-lg">
      <div className="flex flex-col gap-4">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            title={service.title}
            providerName={service.providerName}
            providerImage={service.providerImage}
            serviceType={service.serviceType}
            rating={service.rating}
            price={service.price}
            location={service.location}
            distance={service.distance}
            startTime={service.startTime}
            duration={service.duration}
            certificationTier={service.certificationTier}
            onBookNow={() => onBookService(service.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ServiceGrid;
