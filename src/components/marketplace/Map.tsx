import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface MapProps {
  services?: Array<{
    id: string;
    lat: number;
    lng: number;
    title: string;
    providerName: string;
    providerImage: string;
    rating: number;
    location: string;
    distance: string;
    description?: string;
  }>;
  onMarkerClick?: (serviceId: string) => void;
}

const torontoCoordinates = {
  lng: -79.3832,
  lat: 43.6532,
};

const Map = ({ services = [], onMarkerClick = () => {} }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken =
      "pk.eyJ1IjoiYWFyb256aDkxIiwiYSI6ImNtNndnaDgxdzBob3UybHB2OWVkc2R1M3gifQ.c4eKfTLj5GMMVaX_NVT-yg";

    try {
      const newMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [torontoCoordinates.lng, torontoCoordinates.lat],
        zoom: 12,
        attributionControl: false,
      });

      map.current = newMap;

      newMap.on("load", () => {
        if (services.length > 0) {
          // Calculate bounds
          const bounds = new mapboxgl.LngLatBounds();
          services.forEach((service) => {
            bounds.extend([service.lng, service.lat]);
          });

          // Fit map to bounds with padding
          newMap.fitBounds(bounds, {
            padding: 50,
            maxZoom: 14,
          });
        }

        // Add markers
        services.forEach((service) => {
          const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<div style="padding: 12px; min-width: 200px;">
              <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 12px;">
                <img src="${service.providerImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${service.id}`}" 
                     style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;" 
                     alt="${service.providerName}"/>
                <div>
                  <h3 style="margin: 0 0 4px 0; font-weight: 600;">${service.providerName}</h3>
                  <a href="/provider/${service.providerName?.toLowerCase().replace(/ /g, "-")}" 
                     style="color: #8B5CF6; font-size: 14px; text-decoration: none;">
                    View Profile
                  </a>
                </div>
              </div>
              <div style="display: flex; align-items: center; gap: 4px; margin-bottom: 8px;">
                ${Array(5)
                  .fill(0)
                  .map(
                    (_, i) =>
                      `<svg width="12" height="12" viewBox="0 0 24 24" fill="${i < Math.floor(service.rating || 0) ? "#FFB800" : "#E2E8F0"}">
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"/>
                  </svg>`,
                  )
                  .join("")}
                <span style="margin-left: 4px; font-size: 14px; color: #64748B;">${service.rating?.toFixed(1)}</span>
              </div>
              <div style="font-size: 14px; color: #64748B;">${service.location} · ${service.distance}km away</div>
            </div>`,
          );

          const marker = new mapboxgl.Marker({ color: "#000" })
            .setLngLat([service.lng, service.lat])
            .setPopup(popup)
            .addTo(newMap);

          marker
            .getElement()
            .addEventListener("click", () => onMarkerClick(service.id));
          markers.current.push(marker);
        });
      });
    } catch (error) {
      console.error("Error initializing map:", error);
    }

    return () => {
      markers.current.forEach((marker) => marker.remove());
      markers.current = [];
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [services]);

  return (
    <div className="w-full h-full rounded-lg overflow-hidden border border-gray-200 shadow-lg bg-white">
      <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default Map;
