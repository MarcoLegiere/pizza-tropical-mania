import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ProductCardProps {
  name: string;
  description: string;
  price: number;
  image: string;
  onAddToCart: () => void;
}

const ProductCard = ({ name, description, price, image, onAddToCart }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 text-foreground">{name}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">
            R$ {price.toFixed(2)}
          </span>
          
          <Button
            onClick={onAddToCart}
            size="sm"
            className="gap-1 shadow-lg hover:shadow-xl transition-shadow"
          >
            <Plus className="w-4 h-4" />
            Adicionar
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
