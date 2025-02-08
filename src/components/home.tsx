import React, { useState, useEffect } from "react";
import Map from "./marketplace/Map";
import Header from "./marketplace/Header";
import FilterBar from "./marketplace/FilterBar";
import ServiceGrid from "./marketplace/listings/ServiceGrid";
import ProductGrid from "./marketplace/listings/ProductGrid";
import { fetchReikiHealers } from "@/lib/places";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

interface HomeProps {
  initialTab?: string;
}

const getCurrentTimeSlot = () => {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 9) return "early-morning";
  if (hour >= 9 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 21) return "evening";
  return "any";
};

const Home = ({ initialTab = "services" }: HomeProps) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchQuery, setSearchQuery] = useState("");
  const [allServices, setAllServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [filters, setFilters] = useState({
    serviceType: "all-services",
    date: new Date(),
    time: getCurrentTimeSlot(),
    timeRange: undefined as [number, number] | undefined,
    priceRange: "any",
  });

  useEffect(() => {
    const loadServices = async () => {
      const healers = await fetchReikiHealers();
      setAllServices(healers);
      setFilteredServices(applyFilters(healers, filters));
    };
    loadServices();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Implement search functionality
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleBookService = (serviceId: string) => {
    console.log(`Booking service: ${serviceId}`);
  };

  const handleAddToCart = (productId: string) => {
    console.log(`Adding product to cart: ${productId}`);
  };

  const applyFilters = (services, currentFilters) => {
    return services.filter((service) => {
      // Service Type Filter
      if (
        currentFilters.serviceType &&
        currentFilters.serviceType !== "all-services"
      ) {
        if (
          service.serviceType.toLowerCase().replace(" ", "-") !==
          currentFilters.serviceType
        ) {
          return false;
        }
      }

      // Time Filter
      const hour = parseInt(service.startTime.split(":")[0]);
      if (currentFilters.timeRange) {
        if (
          hour < currentFilters.timeRange[0] ||
          hour > currentFilters.timeRange[1]
        ) {
          return false;
        }
      } else if (currentFilters.time && currentFilters.time !== "any") {
        const isValidTime = (() => {
          switch (currentFilters.time) {
            case "early-morning":
              return hour >= 6 && hour < 9;
            case "morning":
              return hour >= 9 && hour < 12;
            case "afternoon":
              return hour >= 12 && hour < 17;
            case "evening":
              return hour >= 17 && hour < 21;
            default:
              return true;
          }
        })();
        if (!isValidTime) return false;
      }

      // Price Range Filter
      if (currentFilters.priceRange && currentFilters.priceRange !== "any") {
        const price = service.price;
        const isValidPrice = (() => {
          switch (currentFilters.priceRange) {
            case "0-50":
              return price <= 50;
            case "51-100":
              return price > 50 && price <= 100;
            case "101-150":
              return price > 100 && price <= 150;
            case "151-plus":
              return price > 150;
            default:
              return true;
          }
        })();
        if (!isValidPrice) return false;
      }

      return true;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <Header
        onSearch={handleSearch}
        cartItemCount={2}
        notificationCount={3}
        onFilterChange={(newFilters) => {
          const updatedFilters = { ...filters, ...newFilters };
          setFilters(updatedFilters);
          setFilteredServices(applyFilters(allServices, updatedFilters));
        }}
        onTabChange={handleTabChange}
        filters={filters}
      />

      <main className="pt-[4.5rem] bg-gray-50">
        <div className="container mx-auto px-4 lg:px-6">
          <FilterBar
            onFilterChange={(newFilters) => {
              const updatedFilters = { ...filters, ...newFilters };
              setFilters(updatedFilters);
              setFilteredServices(applyFilters(allServices, updatedFilters));
            }}
          />

          {activeTab === "services" ? (
            <div className="flex-1 relative">
              <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={60} minSize={30}>
                  <div className="h-[calc(100vh-180px)] overflow-y-auto">
                    <ServiceGrid
                      services={filteredServices}
                      onBookService={handleBookService}
                    />
                  </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel
                  defaultSize={40}
                  minSize={20}
                  className="hidden xl:block"
                >
                  <div className="h-[calc(100vh-180px)] sticky top-[140px]">
                    <Map
                      services={filteredServices.map((s) => ({
                        id: s.id,
                        lat: s.coordinates.lat,
                        lng: s.coordinates.lng,
                        title: s.title,
                        providerName: s.providerName,
                        providerImage: s.providerImage,
                        rating: s.rating,
                        location: s.location,
                        distance: s.distance,
                        description: s.description,
                      }))}
                      onMarkerClick={(serviceId) =>
                        console.log(`Selected service: ${serviceId}`)
                      }
                    />
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>
          ) : (
            <ProductGrid onAddToCart={handleAddToCart} />
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
