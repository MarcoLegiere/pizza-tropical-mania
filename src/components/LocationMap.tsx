import { MapPin } from "lucide-react";

const LocationMap = () => {
  // Coordenadas de exemplo - você pode alterar para o endereço real da pizzaria
  const address = "Rua Exemplo, 123 - Centro, São Paulo - SP";
  const mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1976045384673!2d-46.63350268502207!3d-23.561684784691423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%201578%20-%20Bela%20Vista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1645564382000!5m2!1spt-BR!2sbr";

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Nossa Localização
            </h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Venha nos visitar ou faça seu pedido para delivery! Estamos prontos para servir você.
          </p>
        </div>

        {/* Map Container */}
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-card">
            <div className="aspect-video w-full">
              <iframe
                src={mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização Pizzaria Bella Vista"
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Address Info */}
          <div className="mt-6 text-center p-6 bg-card rounded-xl border">
            <p className="text-lg font-semibold text-foreground mb-2">
              {address}
            </p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
            >
              <MapPin className="w-4 h-4" />
              Abrir no Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;