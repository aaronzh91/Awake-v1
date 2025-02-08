import React from "react";
import ProductCard from "./ProductCard";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  category: string;
}

interface ProductGridProps {
  products?: Product[];
  onAddToCart?: (productId: string) => void;
}

const ProductGrid = ({
  products = [
    {
      id: "1",
      title: "Amethyst Crystal",
      description: "Natural amethyst crystal for healing and meditation",
      price: 29.99,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1596516109370-29001ec8ec36",
      category: "Crystals",
    },
    {
      id: "2",
      title: "Meditation Cushion",
      description: "Comfortable zafu cushion for meditation practice",
      price: 45.99,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597",
      category: "Meditation",
    },
    {
      id: "3",
      title: "Sage Bundle",
      description: "White sage smudging bundle for energy cleansing",
      price: 12.99,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5",
      category: "Herbs",
    },
    {
      id: "4",
      title: "Tarot Deck",
      description: "Rider-Waite-Smith tarot deck with guidebook",
      price: 24.99,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1633436375795-12b3b339712f",
      category: "Divination",
    },
  ],
  onAddToCart = (productId: string) => console.log(`Add to cart: ${productId}`),
}: ProductGridProps) => {
  return (
    <div className="bg-gray-50 p-4 lg:p-6 w-full min-h-full rounded-lg">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 lg:gap-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            description={product.description}
            price={product.price}
            rating={product.rating}
            image={product.image}
            category={product.category}
            onAddToCart={() => onAddToCart(product.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
