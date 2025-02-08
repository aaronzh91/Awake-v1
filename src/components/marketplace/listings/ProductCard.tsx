import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart } from "lucide-react";

interface ProductCardProps {
  title?: string;
  description?: string;
  price?: number;
  rating?: number;
  image?: string;
  category?: string;
  onAddToCart?: () => void;
}

const ProductCard = ({
  title = "Crystal Healing Stone",
  description = "Natural amethyst crystal for healing and meditation practices",
  price = 29.99,
  rating = 4.5,
  image = "https://images.unsplash.com/photo-1596516109370-29001ec8ec36",
  category = "Crystals",
  onAddToCart = () => console.log("Add to cart clicked"),
}: ProductCardProps) => {
  return (
    <Card className="w-[280px] h-[380px] bg-white overflow-hidden flex flex-col">
      <CardHeader className="p-0">
        <div className="relative h-40 w-full">
          <img src={image} alt={title} className="w-full h-full object-cover" />
          <Badge
            className="absolute top-2 right-2 bg-primary/90"
            variant="secondary"
          >
            {category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
          {description}
        </p>
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm">{rating}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <span className="text-lg font-bold">${price.toFixed(2)}</span>
        <Button
          onClick={onAddToCart}
          size="sm"
          className="flex items-center gap-2"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
