import { MapPin, Phone, Instagram } from "lucide-react";
import logo from "@/assets/logo-bella-vista.png";

const Footer = () => {
  return (
    <footer className="bg-card text-card-foreground mt-16 relative overflow-hidden border-t">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Logo e descrição */}
        <div className="flex flex-col items-center mb-10">
          <img src={logo} alt="Bella Vista Logo" className="w-32 h-32 mb-4" />
          <p className="text-center text-sm opacity-80 max-w-md">
            Sabor autêntico italiano com ingredientes frescos e massa artesanal. 
            Uma experiência gastronômica única em cada fatia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Endereço */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-accent/20 rounded-full">
                <MapPin className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-bold text-lg text-accent">Endereço</h3>
            </div>
            <p className="text-sm opacity-90 text-center md:text-left leading-relaxed">
              Rua Exemplo, 123<br />
              Bairro Centro<br />
              São Paulo - SP
            </p>
          </div>

          {/* Contato */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-accent/20 rounded-full">
                <Phone className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-bold text-lg text-accent">Contato</h3>
            </div>
            <a 
              href="tel:+5511933586970" 
              className="text-sm opacity-90 hover:text-accent transition-colors font-semibold"
            >
              (11) 93358-6970
            </a>
            <div className="text-xs opacity-75 text-center mt-1 leading-relaxed">
              <p className="font-semibold mb-1">Horário de atendimento:</p>
              <p>Ter - Dom: 18h às 23h</p>
              <p>Segunda: Fechado</p>
            </div>
          </div>

          {/* Redes Sociais */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-accent/20 rounded-full">
                <Instagram className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-bold text-lg text-accent">Redes Sociais</h3>
            </div>
            <a 
              href="https://instagram.com/pizzariabellavista" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm opacity-90 hover:text-accent transition-colors flex items-center gap-2 group"
            >
              <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
              @pizzariabellavista
            </a>
          </div>
        </div>

        <div className="pt-6 border-t border-primary-foreground/20 text-center">
          <p className="text-xs opacity-75">
            © 2024 Pizzaria Bella Vista. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
