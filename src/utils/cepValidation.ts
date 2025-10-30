interface ViaCEPResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

export const fetchAddressByCEP = async (cep: string): Promise<ViaCEPResponse | null> => {
  // Remove caracteres não numéricos
  const cleanCEP = cep.replace(/\D/g, "");

  // Valida se o CEP tem 8 dígitos
  if (cleanCEP.length !== 8) {
    return null;
  }

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cleanCEP}/json/`);
    
    if (!response.ok) {
      return null;
    }

    const data: ViaCEPResponse = await response.json();

    // Verifica se o CEP é válido
    if (data.erro) {
      return null;
    }

    return data;
  } catch (error) {
    console.error("Erro ao buscar CEP:", error);
    return null;
  }
};

// Taxa de entrega baseada no bairro (pode ser expandido)
export const getDeliveryFee = (neighborhood: string): number => {
  const fees: Record<string, number> = {
    "centro": 5.00,
    "jardim": 7.00,
    "vila": 8.00,
    // Adicione mais bairros conforme necessário
  };

  // Normaliza o nome do bairro para busca
  const normalizedNeighborhood = neighborhood.toLowerCase().trim();

  // Verifica se alguma chave do dicionário está contida no nome do bairro
  for (const [key, fee] of Object.entries(fees)) {
    if (normalizedNeighborhood.includes(key)) {
      return fee;
    }
  }

  // Taxa padrão se o bairro não estiver na lista
  return 6.00;
};
