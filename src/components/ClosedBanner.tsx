import { AlertCircle } from "lucide-react";

const ClosedBanner = () => {
  return (
    <div className="bg-black text-white py-4 px-4">
      <div className="container mx-auto flex items-center justify-center gap-3">
        <AlertCircle className="w-6 h-6 text-red-500" />
        <p className="text-lg font-semibold">
          Loja fechada no momento. Horário de funcionamento: Terça a Domingo, das 18h às 23h
        </p>
      </div>
    </div>
  );
};

export default ClosedBanner;
