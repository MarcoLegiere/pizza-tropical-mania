import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ProductCardProps {
  name: string;
  description: string;
  price: number;
  image: string;
  onAddToCart: () => void;
  disabled?: boolean;
}

const ProductCard = ({ name, description, price, image, onAddToCart, disabled }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden group shadow-elegant hover:shadow-premium transition-all duration-500 hover:scale-[1.03] animate-fade-in-up opacity-0 hover:-translate-y-1">
      <div className="aspect-square overflow-hidden bg-muted relative">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 group-hover:brightness-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      
      <div className="p-5">
        <h3 className="font-display font-bold text-lg mb-2 text-foreground group-hover:text-primary transition-colors duration-300">{name}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">{description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary font-display">
            R$ {price.toFixed(2)}
          </span>
          
          <Button
            onClick={onAddToCart}
            size="sm"
            className="gap-1 shadow-lg hover:shadow-glow transition-all duration-300 hover:scale-105 active:scale-95"
            disabled={disabled}
          >
            <Plus className="w-4 h-4" />
            {disabled ? "Fechado" : "Adicionar"}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
