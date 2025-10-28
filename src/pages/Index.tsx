import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import Cart from "@/components/Cart";
import { products } from "@/data/products";
import { toast } from "sonner";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [observations, setObservations] = useState("");

  const handleAddToCart = (productId: string, productName: string, productPrice: number) => {
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

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Seu carrinho está vazio!");
      return;
    }

    const message = cartItems
      .map((item) => `${item.quantity}x ${item.name} - R$ ${(item.price * item.quantity).toFixed(2)}`)
      .join("\n");
    
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const observationsText = observations.trim() ? `\n\n*Observações:*\n${observations.trim()}` : "";
    const whatsappMessage = encodeURIComponent(
      `*Pedido Pizzaria Bella Vista*\n\n${message}\n\n*Total: R$ ${total.toFixed(2)}*${observationsText}`
    );
    
    const phoneNumber = "5511987654321";
    window.open(`https://wa.me/${phoneNumber}?text=${whatsappMessage}`, "_blank");
  };

  const pizzasSalgadas = products.filter((p) => p.category === "salgada");
  const pizzasDoces = products.filter((p) => p.category === "doce");
  const esfihas = products.filter((p) => p.category === "esfiha");
  const bebidas = products.filter((p) => p.category === "bebida");

  return (
    <div className="min-h-screen bg-background pb-32">
      <Hero />
      
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
      />
    </div>
  );
};

export default Index;
