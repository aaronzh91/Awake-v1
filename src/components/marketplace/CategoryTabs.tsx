import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Package2, Users } from "lucide-react";

interface CategoryTabsProps {
  onTabChange?: (value: string) => void;
  defaultTab?: string;
}

const CategoryTabs = ({
  onTabChange = () => console.log("Tab changed"),
  defaultTab = "services",
}: CategoryTabsProps) => {
  return (
    <div className="w-full bg-white border-b">
      <div className="container mx-auto px-4 lg:px-6">
        <Tabs
          defaultValue={defaultTab}
          onValueChange={onTabChange}
          className="w-full"
        >
          <TabsList className="grid w-[400px] grid-cols-2">
            <TabsTrigger value="services" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Services
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package2 className="h-4 w-4" />
              Products
            </TabsTrigger>
          </TabsList>
          <TabsContent value="services">
            {/* Content rendered by parent */}
          </TabsContent>
          <TabsContent value="products">
            {/* Content rendered by parent */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CategoryTabs;
