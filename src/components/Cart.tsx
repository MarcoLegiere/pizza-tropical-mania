import { ShoppingCart, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartProps {
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
  observations: string;
  onObservationsChange: (value: string) => void;
}

const Cart = ({ items, onRemoveItem, onCheckout, observations, onObservationsChange }: CartProps) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-2xl z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-primary" />
            <span className="font-bold text-lg">Meu Pedido</span>
            <Badge variant="secondary" className="ml-2">
              {itemCount} {itemCount === 1 ? "item" : "itens"}
            </Badge>
          </div>
          
          <span className="text-2xl font-bold text-primary">
            R$ {total.toFixed(2)}
          </span>
        </div>
        
        <div className="space-y-2 mb-3 max-h-32 overflow-y-auto">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-muted/50 rounded-lg px-3 py-2"
            >
              <div className="flex-1">
                <span className="font-medium text-sm">{item.name}</span>
                <span className="text-muted-foreground text-xs ml-2">
                  x{item.quantity}
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="font-semibold text-sm">
                  R$ {(item.price * item.quantity).toFixed(2)}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveItem(item.id)}
                  className="h-6 w-6 p-0 hover:bg-destructive/20"
                >
                  <X className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mb-3">
          <Textarea
            placeholder="Observações (ex: sem cebola, sem azeitona...)"
            value={observations}
            onChange={(e) => onObservationsChange(e.target.value)}
            className="resize-none"
            rows={2}
          />
        </div>
        
        <Button
          onClick={onCheckout}
          className="w-full gap-2 shadow-lg text-lg h-12"
          size="lg"
        >
          <Send className="w-5 h-5" />
          Enviar pedido via WhatsApp
        </Button>
      </div>
    </div>
  );
};

export default Cart;
