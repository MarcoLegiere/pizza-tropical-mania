import { MapPin, Phone, Instagram, ExternalLink } from "lucide-react";
import logo from "@/assets/logo-bella-vista.png";

const Footer = () => {
  const address = "Rua Exemplo, 123 - Centro, São Paulo - SP";
  const mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1976045384673!2d-46.63350268502207!3d-23.561684784691423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%201578%20-%20Bela%20Vista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1645564382000!5m2!1spt-BR!2sbr";

  return (
    <footer className="bg-card text-card-foreground mt-16 relative overflow-hidden border-t">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Grid com informações e mapa */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Coluna esquerda - Informações */}
          <div className="flex flex-col gap-6">
            {/* Contato */}
            <div className="flex flex-col gap-4 p-8 bg-background/50 rounded-xl border border-accent/20 h-full">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-accent/20 rounded-full">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-bold text-lg text-accent">Contato</h3>
              </div>
              <a 
                href="tel:+5511933586970" 
                className="text-base hover:text-accent transition-colors font-semibold"
              >
                (11) 93358-6970
              </a>
              <div className="text-sm opacity-80 leading-relaxed">
                <p className="font-semibold mb-2 text-foreground">Horário de Funcionamento:</p>
                <p>Terça a Domingo: 18h às 23h</p>
                <p className="text-muted-foreground mt-1">Segunda-feira: Fechado</p>
              </div>
            </div>

            {/* Redes Sociais */}
            <div className="flex flex-col gap-4 p-8 bg-background/50 rounded-xl border border-accent/20 h-full">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-accent/20 rounded-full">
                  <Instagram className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-bold text-lg text-accent">Siga-nos</h3>
              </div>
              <a 
                href="https://instagram.com/pizzariabellavista" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-base hover:text-accent transition-colors flex items-center gap-2 group font-medium"
              >
                <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
                @pizzariabellavista
              </a>
            </div>
          </div>

          {/* Coluna direita - Mapa */}
          <div className="flex flex-col gap-4 p-8 bg-background/50 rounded-xl border border-accent/20">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-accent/20 rounded-full">
                <MapPin className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-bold text-lg text-accent">Nossa Localização</h3>
            </div>
            <div className="relative rounded-lg overflow-hidden shadow-lg border border-accent/10 h-full min-h-[400px]">
              <iframe
                src={mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização Pizzaria Bella Vista"
                className="w-full h-full absolute inset-0"
              />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-accent/20 text-center">
          <p className="text-xs opacity-75">
            © 2024 Pizzaria Bella Vista. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
