import { Phone, Clock } from "lucide-react";
import logo from "@/assets/logo-bella-vista.png";

const Hero = () => {
  return (
    <header className="relative bg-hero-gradient text-primary-foreground py-20 px-4 overflow-hidden">
      {/* Decorative gold accents */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-accent rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-secondary rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      </div>
      
      <div className="container mx-auto text-center relative z-10">
        {/* Logo elegante */}
        <div className="inline-block mb-8">
          <img 
            src={logo} 
            alt="Bella Vista Logo" 
            className="w-40 h-40 mx-auto drop-shadow-2xl hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg tracking-tight">
          Pizzaria Bella Vista
        </h1>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-lg mb-8">
          <div className="flex items-center gap-3 bg-accent/20 backdrop-blur-sm px-6 py-3 rounded-full border border-accent/30 hover:bg-accent/30 transition-colors">
            <Phone className="w-5 h-5 text-accent" />
            <span className="font-semibold">(11) 93358-6970</span>
          </div>
          
          <div className="flex items-center gap-3 bg-accent/20 backdrop-blur-sm px-6 py-3 rounded-full border border-accent/30 hover:bg-accent/30 transition-colors">
            <Clock className="w-5 h-5 text-accent" />
            <span className="font-semibold">Ter a Dom - 18h às 23h</span>
          </div>
        </div>
        
      </div>
    </header>
  );
};

export default Hero;
