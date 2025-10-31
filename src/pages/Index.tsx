import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import Cart from "@/components/Cart";
import ClosedBanner from "@/components/ClosedBanner";
import Footer from "@/components/Footer";
import { products } from "@/data/products";
import { toast } from "sonner";
import { isStoreOpen } from "@/utils/storeHours";
import { getDeliveryFee } from "@/utils/cepValidation";

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

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [observations, setObservations] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const storeIsOpen = isStoreOpen();
  const [deliveryFee, setDeliveryFee] = useState(6.00); // Taxa padrão
  const [deliveryData, setDeliveryData] = useState<DeliveryData>({
    name: "",
    phone: "",
    cep: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
  });
  
  const [paymentData, setPaymentData] = useState<PaymentData>({
    method: "pix",
    changeFor: "",
  });

  // Atualiza taxa de entrega quando o bairro muda
  useEffect(() => {
    if (deliveryData.neighborhood) {
      const fee = getDeliveryFee(deliveryData.neighborhood);
      setDeliveryFee(fee);
    }
  }, [deliveryData.neighborhood]);

  const handleAddToCart = (productId: string, productName: string, productPrice: number) => {
    if (!storeIsOpen) {
      toast.error("Desculpe, a loja está fechada no momento!");
      return;
    }
    
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === productId);
      
      if (existingItem) {
        toast.success("Quantidade atualizada no carrinho!");
        return prev.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      toast.success("Item adicionado ao carrinho!");
      return [...prev, { id: productId, name: productName, price: productPrice, quantity: 1 }];
    });
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => {
      const item = prev.find((item) => item.id === productId);
      
      if (item && item.quantity > 1) {
        return prev.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      
      toast.info("Item removido do carrinho");
      return prev.filter((item) => item.id !== productId);
    });
  };

  const handleDeliveryDataChange = (field: keyof DeliveryData, value: string) => {
    setDeliveryData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePaymentDataChange = (field: keyof PaymentData, value: string) => {
    setPaymentData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCheckout = (deliveryInfo: DeliveryData, paymentInfo: PaymentData) => {
    if (!storeIsOpen) {
      toast.error("Desculpe, a loja está fechada no momento!");
      return;
    }
    
    if (cartItems.length === 0) {
      toast.error("Seu carrinho está vazio!");
      return;
    }

    const message = cartItems
      .map((item) => `${item.quantity}x ${item.name} - R$ ${(item.price * item.quantity).toFixed(2)}`)
      .join("\n");
    
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const total = subtotal + deliveryFee;
    const observationsText = observations.trim() ? `\n\n*Observações do Pedido:*\n${observations.trim()}` : "";
    
    const deliveryAddress = `${deliveryInfo.street}, ${deliveryInfo.number}${deliveryInfo.complement ? ` - ${deliveryInfo.complement}` : ""}\n${deliveryInfo.neighborhood}, ${deliveryInfo.city}\nCEP: ${deliveryInfo.cep}`;
    
    const paymentMethod = paymentInfo.method === "pix" ? "PIX" : 
                         paymentInfo.method === "cartao" ? "Cartão (na entrega)" : 
                         "Dinheiro";
    const changeInfo = paymentInfo.method === "dinheiro" && paymentInfo.changeFor 
      ? `\nTroco para: ${paymentInfo.changeFor}` 
      : "";
    
    const whatsappMessage = encodeURIComponent(
      `*Pedido Pizzaria Bella Vista*\n\n${message}\n\n*Subtotal: R$ ${subtotal.toFixed(2)}*\n*Taxa de Entrega: R$ ${deliveryFee.toFixed(2)}*\n*Total: R$ ${total.toFixed(2)}*${observationsText}\n\n*Forma de Pagamento:*\n${paymentMethod}${changeInfo}\n\n*Dados de Entrega:*\nNome: ${deliveryInfo.name}\nTelefone: ${deliveryInfo.phone}\nEndereço: ${deliveryAddress}\n\n*Tempo estimado: 40-60 minutos*`
    );
    
    // Abre WhatsApp diretamente
    const whatsappUrl = `https://wa.me/5511933586970?text=${whatsappMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    
    // Mostra notificação de confirmação
    toast.success("🎉 Pedido enviado para o WhatsApp!", {
      description: "Aguarde a confirmação da pizzaria. Em breve você receberá o retorno!",
      duration: 5000,
    });
    
    // Limpa o carrinho e fecha o modal após enviar
    setCartItems([]);
    setObservations("");
    setDeliveryData({
      name: "",
      phone: "",
      cep: "",
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
    });
    setPaymentData({
      method: "pix",
      changeFor: "",
    });
    setIsCartOpen(false);
  };

  const pizzasSalgadas = products.filter((p) => p.category === "salgada");
  const pizzasDoces = products.filter((p) => p.category === "doce");
  const esfihas = products.filter((p) => p.category === "esfiha");
  const bebidas = products.filter((p) => p.category === "bebida");

  return (
    <div className="min-h-screen bg-background pb-32">
      <Hero />
      {!storeIsOpen && <ClosedBanner />}
      
      <main className="container mx-auto px-4 py-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-foreground">
          Conheça nosso menu
        </h2>
        
        <Tabs defaultValue="salgada" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="salgada" className="text-sm md:text-base">
              🍕 Pizzas Salgadas
            </TabsTrigger>
            <TabsTrigger value="doce" className="text-sm md:text-base">
              🍰 Pizzas Doces
            </TabsTrigger>
            <TabsTrigger value="esfiha" className="text-sm md:text-base">
              🥟 Esfihas
            </TabsTrigger>
            <TabsTrigger value="bebida" className="text-sm md:text-base">
              🥤 Bebidas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="salgada">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pizzasSalgadas.map((product) => (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  image={product.image}
                  onAddToCart={() => handleAddToCart(product.id, product.name, product.price)}
                  disabled={!storeIsOpen}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="doce">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pizzasDoces.map((product) => (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  image={product.image}
                  onAddToCart={() => handleAddToCart(product.id, product.name, product.price)}
                  disabled={!storeIsOpen}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="esfiha">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {esfihas.map((product) => (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  image={product.image}
                  onAddToCart={() => handleAddToCart(product.id, product.name, product.price)}
                  disabled={!storeIsOpen}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bebida">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bebidas.map((product) => (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  image={product.image}
                  onAddToCart={() => handleAddToCart(product.id, product.name, product.price)}
                  disabled={!storeIsOpen}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Cart
        items={cartItems}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
        observations={observations}
        onObservationsChange={setObservations}
        isOpen={isCartOpen}
        onOpenChange={setIsCartOpen}
        deliveryData={deliveryData}
        onDeliveryDataChange={handleDeliveryDataChange}
        paymentData={paymentData}
        onPaymentDataChange={handlePaymentDataChange}
        disabled={!storeIsOpen}
        deliveryFee={deliveryFee}
      />
      
      <Footer />
    </div>
  );
};

export default Index;
