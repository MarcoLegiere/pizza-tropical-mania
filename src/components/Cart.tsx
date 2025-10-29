import { ShoppingCart, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface DeliveryData {
  name: string;
  phone: string;
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
}

interface CartProps {
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onCheckout: (deliveryData: DeliveryData) => void;
  observations: string;
  onObservationsChange: (value: string) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  deliveryData: DeliveryData;
  onDeliveryDataChange: (field: keyof DeliveryData, value: string) => void;
}

const Cart = ({ 
  items, 
  onRemoveItem, 
  onCheckout, 
  observations, 
  onObservationsChange,
  isOpen,
  onOpenChange,
  deliveryData,
  onDeliveryDataChange
}: CartProps) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  if (items.length === 0) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCheckout(deliveryData);
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => onOpenChange(true)}
          size="lg"
          className="h-16 px-6 rounded-full shadow-2xl gap-3"
        >
          <ShoppingCart className="w-6 h-6" />
          <div className="flex flex-col items-start">
            <span className="text-xs opacity-90">{itemCount} {itemCount === 1 ? "item" : "itens"}</span>
            <span className="text-lg font-bold">R$ {total.toFixed(2)}</span>
          </div>
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <ShoppingCart className="w-6 h-6 text-primary" />
              Finalizar Pedido
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Itens do Pedido */}
            <div>
              <h3 className="font-semibold mb-3">Itens do Pedido</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
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
                        type="button"
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
              <div className="mt-3 pt-3 border-t border-border flex justify-between items-center">
                <span className="font-bold text-lg">Total:</span>
                <span className="text-2xl font-bold text-primary">
                  R$ {total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Observações */}
            <div>
              <Label htmlFor="observations">Observações do Pedido</Label>
              <Textarea
                id="observations"
                placeholder="Ex: sem cebola, sem azeitona, bem assada..."
                value={observations}
                onChange={(e) => onObservationsChange(e.target.value)}
                className="resize-none mt-2"
                rows={2}
              />
            </div>

            {/* Dados de Entrega */}
            <div>
              <h3 className="font-semibold mb-3">Dados de Entrega</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome completo *</Label>
                  <Input
                    id="name"
                    required
                    value={deliveryData.name}
                    onChange={(e) => onDeliveryDataChange('name', e.target.value)}
                    placeholder="Seu nome"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Telefone *</Label>
                  <Input
                    id="phone"
                    required
                    value={deliveryData.phone}
                    onChange={(e) => onDeliveryDataChange('phone', e.target.value)}
                    placeholder="(11) 99999-9999"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="cep">CEP *</Label>
                  <Input
                    id="cep"
                    required
                    value={deliveryData.cep}
                    onChange={(e) => onDeliveryDataChange('cep', e.target.value)}
                    placeholder="00000-000"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="street">Rua *</Label>
                  <Input
                    id="street"
                    required
                    value={deliveryData.street}
                    onChange={(e) => onDeliveryDataChange('street', e.target.value)}
                    placeholder="Nome da rua"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="number">Número *</Label>
                  <Input
                    id="number"
                    required
                    value={deliveryData.number}
                    onChange={(e) => onDeliveryDataChange('number', e.target.value)}
                    placeholder="123"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="complement">Complemento</Label>
                  <Input
                    id="complement"
                    value={deliveryData.complement}
                    onChange={(e) => onDeliveryDataChange('complement', e.target.value)}
                    placeholder="Apto, bloco, etc"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="neighborhood">Bairro *</Label>
                  <Input
                    id="neighborhood"
                    required
                    value={deliveryData.neighborhood}
                    onChange={(e) => onDeliveryDataChange('neighborhood', e.target.value)}
                    placeholder="Nome do bairro"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="city">Cidade *</Label>
                  <Input
                    id="city"
                    required
                    value={deliveryData.city}
                    onChange={(e) => onDeliveryDataChange('city', e.target.value)}
                    placeholder="Nome da cidade"
                    className="mt-2"
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full gap-2 shadow-lg text-lg h-12"
              size="lg"
            >
              <Send className="w-5 h-5" />
              Enviar pedido via WhatsApp
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Cart;
