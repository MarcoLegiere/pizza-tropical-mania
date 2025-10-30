import { MapPin, Phone, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t border-border mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Endereço */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2 text-primary">
              <MapPin className="w-5 h-5" />
              <h3 className="font-semibold">Endereço</h3>
            </div>
            <p className="text-sm text-muted-foreground text-center md:text-left">
              Rua Exemplo, 123<br />
              Bairro Centro<br />
              São Paulo - SP
            </p>
          </div>

          {/* Contato */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 text-primary">
              <Phone className="w-5 h-5" />
              <h3 className="font-semibold">Telefone</h3>
            </div>
            <a 
              href="tel:+5511933586970" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              (11) 93358-6970
            </a>
            <p className="text-xs text-muted-foreground mt-2">
              Horário de atendimento:<br />
              Ter - Dom: 18h às 23h<br />
              Segunda: Fechado
            </p>
          </div>

          {/* Redes Sociais */}
          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="flex items-center gap-2 text-primary">
              <Instagram className="w-5 h-5" />
              <h3 className="font-semibold">Redes Sociais</h3>
            </div>
            <a 
              href="https://instagram.com/pizzariabellavista" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
            >
              <Instagram className="w-4 h-4" />
              @pizzariabellavista
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            © 2024 Pizzaria Bella Vista. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
