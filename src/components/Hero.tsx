import { Phone, Clock } from "lucide-react";
import logo from "@/assets/logo-bella-vista-transparent.png";

const Hero = () => {
  return (
    <header className="relative bg-gradient-animated text-primary-foreground py-20 px-4 overflow-hidden">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-primary/10 animate-gradient-shift" style={{ backgroundSize: "200% 200%" }} />
      
      {/* Decorative gold accents with parallax effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-accent rounded-full blur-3xl animate-float shadow-glow" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-secondary rounded-full blur-3xl animate-float shadow-glow" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/30 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "0.5s" }} />
      </div>
      
      <div className="container mx-auto text-center relative z-10">
        {/* Logo elegante sem fundo */}
        <div className="inline-block mb-8 animate-fade-in">
          <div className="relative">
            {/* Glow effect atrás do logo */}
            <div className="absolute inset-0 bg-accent/30 rounded-full blur-2xl scale-110 animate-pulse-glow" />
            <img 
              src={logo} 
              alt="Pizzaria Bella Vista - Delivery de Pizzas e Esfihas" 
              className="relative w-48 h-48 mx-auto drop-shadow-[0_0_25px_rgba(250,204,21,0.4)] hover:scale-110 hover:drop-shadow-[0_0_35px_rgba(250,204,21,0.6)] transition-all duration-500 hover:rotate-3 filter brightness-110"
            />
          </div>
        </div>
        
        <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg tracking-tight animate-fade-in-up opacity-0" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
          Pizzaria Bella Vista
        </h1>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-lg mb-8 animate-fade-in-up opacity-0" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>
          <div className="glass-effect flex items-center gap-3 px-6 py-3 rounded-full border border-accent/30 hover:border-accent/50 transition-all duration-300 hover:scale-105 hover:shadow-glow group">
            <Phone className="w-5 h-5 text-accent group-hover:animate-bounce-in" />
            <span className="font-elegant font-semibold">(11) 93358-6970</span>
          </div>
          
          <div className="glass-effect flex items-center gap-3 px-6 py-3 rounded-full border border-accent/30 hover:border-accent/50 transition-all duration-300 hover:scale-105 hover:shadow-glow group">
            <Clock className="w-5 h-5 text-accent group-hover:animate-bounce-in" />
            <span className="font-elegant font-semibold">Ter a Dom - 18h às 23h</span>
          </div>
        </div>
        
      </div>
    </header>
  );
};

export default Hero;
