import { Phone, Clock } from "lucide-react";

const Hero = () => {
  return (
    <header className="relative bg-hero-gradient text-primary-foreground py-16 px-4 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-secondary rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      </div>
      
      <div className="container mx-auto text-center relative z-10">
        <div className="inline-block mb-6">
          <div className="w-24 h-24 mx-auto bg-primary-foreground rounded-full flex items-center justify-center shadow-2xl mb-4">
            <span className="text-5xl">🍕</span>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
          Pizzaria Bella Vista
        </h1>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-lg mb-6">
          <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <Phone className="w-5 h-5" />
            <span className="font-semibold">(11) 98765-4321</span>
          </div>
          
          <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <Clock className="w-5 h-5" />
            <span className="font-semibold">Ter a Dom - 18h às 23h</span>
          </div>
        </div>
        
        <p className="text-xl md:text-2xl opacity-95 max-w-2xl mx-auto">
          Sabor autêntico, massa artesanal e ingredientes frescos
        </p>
      </div>
    </header>
  );
};

export default Hero;
