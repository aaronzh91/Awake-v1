import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface MapProps {
  services?: Array<{
    id: string;
    lat: number;
    lng: number;
    title: string;
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
        // Add markers once map is loaded
        services.forEach((service) => {
          const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<h3 style="margin: 0 0 0.5rem 0;">${service.title}</h3>`,
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
