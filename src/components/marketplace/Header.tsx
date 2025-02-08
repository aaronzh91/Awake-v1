import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ShoppingCart, Bell } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface HeaderProps {
  onSearch?: (query: string) => void;
  cartItemCount?: number;
  notificationCount?: number;
  categories?: { title: string; items: { title: string; href: string }[] }[];
}

const Header = ({
  onSearch = () => {},
  cartItemCount = 0,
  notificationCount = 0,
  categories = [
    {
      title: "Services",
      items: [
        { title: "Energy Healing", href: "#" },
        { title: "Spiritual Coaching", href: "#" },
        { title: "Meditation Classes", href: "#" },
      ],
    },
    {
      title: "Products",
      items: [
        { title: "Crystals", href: "#" },
        { title: "Meditation Tools", href: "#" },
        { title: "Wellness Items", href: "#" },
      ],
    },
  ],
}: HeaderProps) => {
  return (
    <header className="w-full h-20 bg-white border-b border-gray-200 px-4 lg:px-6 flex items-center justify-between fixed top-0 z-50">
      <div className="flex items-center gap-8">
        <h1 className="text-2xl font-bold">Marketplace</h1>

        <NavigationMenu>
          <NavigationMenuList>
            {categories.map((category) => (
              <NavigationMenuItem key={category.title}>
                <NavigationMenuTrigger>{category.title}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4">
                    {category.items.map((item) => (
                      <li key={item.title}>
                        <NavigationMenuLink asChild>
                          <a
                            href={item.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            {item.title}
                          </a>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex items-center gap-6 flex-1 max-w-xl mx-auto">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search for services or products..."
            className="pl-10"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {cartItemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </Button>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </Button>
        <Button>Sign In</Button>
      </div>
    </header>
  );
};

export default Header;
