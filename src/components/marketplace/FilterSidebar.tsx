import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Star, MapPin } from "lucide-react";

interface FilterSidebarProps {
  onFilterChange?: (filters: FilterState) => void;
}

interface FilterState {
  priceRange: number[];
  rating: number;
  categories: string[];
  location: string;
}

const FilterSidebar = ({ onFilterChange = () => {} }: FilterSidebarProps) => {
  const defaultFilters: FilterState = {
    priceRange: [0, 500],
    rating: 0,
    categories: [],
    location: "nearby",
  };

  const categories = [
    "Energy Healing",
    "Spiritual Coaching",
    "Meditation",
    "Tarot Reading",
    "Crystal Healing",
    "Sound Therapy",
  ];

  const locations = [
    { id: "nearby", label: "Nearby (within 5 miles)" },
    { id: "local", label: "Local (within 15 miles)" },
    { id: "regional", label: "Regional (within 50 miles)" },
    { id: "online", label: "Online Services" },
  ];

  return (
    <aside className="w-full md:w-[280px] shrink-0 bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-purple-100 shadow-sm">
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="price"
      >
        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="pt-4 px-2">
              <Slider
                defaultValue={[0, 500]}
                max={500}
                step={10}
                className="mb-6"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>$0</span>
                <span>$500+</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="rating">
          <AccordionTrigger>Rating</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {[4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox id={`rating-${rating}`} />
                  <Label
                    htmlFor={`rating-${rating}`}
                    className="flex items-center"
                  >
                    {Array(rating)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    <span className="ml-1">& up</span>
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="categories">
          <AccordionTrigger>Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox id={`category-${category}`} />
                  <Label htmlFor={`category-${category}`}>{category}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="location">
          <AccordionTrigger>Location</AccordionTrigger>
          <AccordionContent>
            <RadioGroup defaultValue="nearby" className="space-y-2">
              {locations.map((location) => (
                <div
                  key={location.id}
                  className="flex items-center space-x-2 py-1"
                >
                  <RadioGroupItem value={location.id} id={location.id} />
                  <Label htmlFor={location.id} className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    {location.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
};

export default FilterSidebar;
