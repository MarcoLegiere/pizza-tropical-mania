export const isStoreOpen = (): boolean => {
  // Temporariamente liberado para testes
  return true;
  
  /* Horário de funcionamento real:
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 = Domingo, 1 = Segunda, etc.
  const hours = now.getHours();
  
  // Segunda-feira está fechado
  if (dayOfWeek === 1) {
    return false;
  }
  
  // Terça a Domingo: 18h às 23h
  return hours >= 18 && hours < 23;
  */
};
