import { ShoppingCart, Send, X, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { fetchAddressByCEP } from "@/utils/cepValidation";
import { toast } from "sonner";

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

interface PaymentData {
  method: "dinheiro" | "pix" | "cartao";
  changeFor: string;
}

interface CartProps {
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onCheckout: (deliveryData: DeliveryData, paymentData: PaymentData) => void;
  observations: string;
  onObservationsChange: (value: string) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  deliveryData: DeliveryData;
  onDeliveryDataChange: (field: keyof DeliveryData, value: string) => void;
  paymentData: PaymentData;
  onPaymentDataChange: (field: keyof PaymentData, value: string) => void;
  disabled?: boolean;
  deliveryFee: number;
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
  onDeliveryDataChange,
  paymentData,
  onPaymentDataChange,
  disabled,
  deliveryFee
}: CartProps) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + deliveryFee;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleCEPChange = async (cep: string) => {
    onDeliveryDataChange('cep', cep);
    
    // Busca endereço quando CEP tiver 8 dígitos
    const cleanCEP = cep.replace(/\D/g, "");
    if (cleanCEP.length === 8) {
      toast.loading("Buscando endereço...");
      const addressData = await fetchAddressByCEP(cep);
      toast.dismiss();
      
      if (addressData) {
        onDeliveryDataChange('street', addressData.logradouro);
        onDeliveryDataChange('neighborhood', addressData.bairro);
        onDeliveryDataChange('city', addressData.localidade);
        toast.success("Endereço encontrado!");
      } else {
        toast.error("CEP não encontrado. Preencha manualmente.");
      }
    }
  };

  if (items.length === 0) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCheckout(deliveryData, paymentData);
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
        <Button
          onClick={() => onOpenChange(true)}
          size="lg"
          className="h-16 px-6 rounded-full shadow-premium gap-3 hover:shadow-glow transition-all duration-500 hover:scale-105 active:scale-95 relative overflow-hidden group"
          disabled={disabled}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-shimmer-gradient animate-shimmer" />
          
          <ShoppingCart className="w-6 h-6 relative z-10 group-hover:animate-bounce-in" />
          <div className="flex flex-col items-start relative z-10">
            <span className="text-xs opacity-90 font-elegant transition-all duration-300 group-hover:scale-110">
              {itemCount} {itemCount === 1 ? "item" : "itens"}
            </span>
            <span className="text-lg font-bold font-display transition-all duration-300 group-hover:scale-110">
              R$ {total.toFixed(2)}
            </span>
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
        <div className="mt-3 pt-3 border-t border-border space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Subtotal:</span>
            <span className="font-semibold">R$ {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Taxa de entrega:</span>
            <span className="font-semibold">R$ {deliveryFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-border">
            <span className="font-bold text-lg">Total:</span>
            <span className="text-2xl font-bold text-primary">
              R$ {total.toFixed(2)}
            </span>
          </div>
        </div>
        
        {/* Tempo Estimado */}
        <div className="mt-3 p-3 bg-primary/10 rounded-lg flex items-center justify-center gap-2">
          <Clock className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">
            Tempo estimado de entrega: 40-60 minutos
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

            {/* Forma de Pagamento */}
            <div>
              <h3 className="font-semibold mb-3">Forma de Pagamento</h3>
              <RadioGroup
                value={paymentData.method}
                onValueChange={(value) => onPaymentDataChange('method', value)}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="pix" id="pix" />
                  <Label htmlFor="pix" className="flex-1 cursor-pointer">
                    💳 PIX
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="cartao" id="cartao" />
                  <Label htmlFor="cartao" className="flex-1 cursor-pointer">
                    💳 Cartão (na entrega)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="dinheiro" id="dinheiro" />
                  <Label htmlFor="dinheiro" className="flex-1 cursor-pointer">
                    💵 Dinheiro
                  </Label>
                </div>
              </RadioGroup>

              {paymentData.method === "dinheiro" && (
                <div className="mt-4">
                  <Label htmlFor="changeFor">Precisa de troco para quanto?</Label>
                  <Input
                    id="changeFor"
                    value={paymentData.changeFor}
                    onChange={(e) => onPaymentDataChange('changeFor', e.target.value)}
                    placeholder="R$ 100,00"
                    className="mt-2"
                  />
                </div>
              )}
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
                onChange={(e) => handleCEPChange(e.target.value)}
                placeholder="00000-000"
                className="mt-2"
                maxLength={9}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Digite o CEP para preenchimento automático
              </p>
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
              disabled={disabled}
            >
              <Send className="w-5 h-5" />
              {disabled ? "Loja fechada" : "Enviar pedido via WhatsApp"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Cart;
