import React, { useState, useEffect } from "react";
import Map from "./marketplace/Map";
import Header from "./marketplace/Header";
import CategoryTabs from "./marketplace/CategoryTabs";
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

const Home = ({ initialTab = "services" }: HomeProps) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchQuery, setSearchQuery] = useState("");
  const [services, setServices] = useState([]);

  useEffect(() => {
    const loadServices = async () => {
      const healers = await fetchReikiHealers();
      setServices(healers);
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

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={handleSearch} cartItemCount={2} notificationCount={3} />

      <main className="pt-20">
        <CategoryTabs onTabChange={handleTabChange} defaultTab={activeTab} />
        <div className="container mx-auto px-4 lg:px-6">
          <FilterBar />

          {activeTab === "services" ? (
            <ResizablePanelGroup direction="horizontal" className="flex-1">
              <ResizablePanel defaultSize={60} minSize={30}>
                <ServiceGrid
                  services={services}
                  onBookService={handleBookService}
                />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel
                defaultSize={40}
                minSize={20}
                className="hidden xl:block"
              >
                <div className="h-[calc(100vh-140px)]">
                  <Map
                    services={services.map((s) => ({
                      id: s.id,
                      lat: s.coordinates.lat,
                      lng: s.coordinates.lng,
                      title: s.title,
                    }))}
                    onMarkerClick={(serviceId) =>
                      console.log(`Selected service: ${serviceId}`)
                    }
                  />
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          ) : (
            <ProductGrid onAddToCart={handleAddToCart} />
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
