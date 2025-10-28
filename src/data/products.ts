import pizzaMargherita from "@/assets/pizza-margherita.jpg";
import pizzaCalabresa from "@/assets/pizza-calabresa.jpg";
import pizzaPortuguesa from "@/assets/pizza-portuguesa.jpg";
import pizzaQuatroQueijos from "@/assets/pizza-quatro-queijos.jpg";
import pizzaFrangoCatupiry from "@/assets/pizza-frango-catupiry.jpg";
import pizzaBacon from "@/assets/pizza-bacon.jpg";
import pizzaChocolate from "@/assets/pizza-chocolate.jpg";
import pizzaRomeuJulieta from "@/assets/pizza-romeu-julieta.jpg";
import pizzaBananaCanela from "@/assets/pizza-banana-canela.jpg";
import pizzaPrestigio from "@/assets/pizza-prestigio.jpg";
import esfihaCarne from "@/assets/esfiha-carne.jpg";
import esfihaFrango from "@/assets/esfiha-frango.jpg";
import esfihaQueijo from "@/assets/esfiha-queijo.jpg";
import esfihaCalabresa from "@/assets/esfiha-calabresa.jpg";
import cocaCola from "@/assets/coca-cola-2l.jpg";
import guarana from "@/assets/guarana-2l.jpg";
import sucoLaranja from "@/assets/suco-laranja.jpg";
import aguaMineral from "@/assets/agua-mineral.jpg";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "salgada" | "doce" | "esfiha" | "bebida";
  image: string;
}

export const products: Product[] = [
  // Pizzas Salgadas
  {
    id: "pizza-margherita",
    name: "Margherita",
    description: "Molho de tomate, mussarela, manjericão fresco e azeite",
    price: 45.00,
    category: "salgada",
    image: pizzaMargherita
  },
  {
    id: "pizza-calabresa",
    name: "Calabresa",
    description: "Molho de tomate, mussarela, calabresa fatiada e cebola",
    price: 48.00,
    category: "salgada",
    image: pizzaCalabresa
  },
  {
    id: "pizza-portuguesa",
    name: "Portuguesa",
    description: "Molho de tomate, mussarela, presunto, ovos, cebola, azeitonas e orégano",
    price: 52.00,
    category: "salgada",
    image: pizzaPortuguesa
  },
  {
    id: "pizza-quatro-queijos",
    name: "Quatro Queijos",
    description: "Molho de tomate, mussarela, provolone, gorgonzola e parmesão",
    price: 55.00,
    category: "salgada",
    image: pizzaQuatroQueijos
  },
  {
    id: "pizza-frango-catupiry",
    name: "Frango com Catupiry",
    description: "Molho de tomate, mussarela, frango desfiado e catupiry",
    price: 50.00,
    category: "salgada",
    image: pizzaFrangoCatupiry
  },
  {
    id: "pizza-bacon",
    name: "Bacon",
    description: "Molho de tomate, mussarela, bacon crocante e cebola caramelizada",
    price: 53.00,
    category: "salgada",
    image: pizzaBacon
  },

  // Pizzas Doces
  {
    id: "pizza-chocolate",
    name: "Chocolate",
    description: "Chocolate ao leite derretido com granulado",
    price: 42.00,
    category: "doce",
    image: pizzaChocolate
  },
  {
    id: "pizza-romeu-julieta",
    name: "Romeu e Julieta",
    description: "Mussarela e goiabada derretida",
    price: 40.00,
    category: "doce",
    image: pizzaRomeuJulieta
  },
  {
    id: "pizza-banana-canela",
    name: "Banana com Canela",
    description: "Banana fatiada, canela, açúcar e leite condensado",
    price: 38.00,
    category: "doce",
    image: pizzaBananaCanela
  },
  {
    id: "pizza-prestigio",
    name: "Prestígio",
    description: "Chocolate ao leite e coco ralado",
    price: 44.00,
    category: "doce",
    image: pizzaPrestigio
  },

  // Esfihas
  {
    id: "esfiha-carne",
    name: "Esfiha de Carne",
    description: "Carne moída temperada com cebola e tomate",
    price: 6.50,
    category: "esfiha",
    image: esfihaCarne
  },
  {
    id: "esfiha-frango",
    name: "Esfiha de Frango",
    description: "Frango desfiado temperado com catupiry",
    price: 6.50,
    category: "esfiha",
    image: esfihaFrango
  },
  {
    id: "esfiha-queijo",
    name: "Esfiha de Queijo",
    description: "Mix de queijos derretidos",
    price: 6.00,
    category: "esfiha",
    image: esfihaQueijo
  },
  {
    id: "esfiha-calabresa",
    name: "Esfiha de Calabresa",
    description: "Calabresa moída com cebola e pimentão",
    price: 7.00,
    category: "esfiha",
    image: esfihaCalabresa
  },

  // Bebidas
  {
    id: "coca-cola-2l",
    name: "Coca-Cola 2L",
    description: "Refrigerante Coca-Cola 2 litros",
    price: 12.00,
    category: "bebida",
    image: cocaCola
  },
  {
    id: "guarana-2l",
    name: "Guaraná Antarctica 2L",
    description: "Refrigerante Guaraná 2 litros",
    price: 10.00,
    category: "bebida",
    image: guarana
  },
  {
    id: "suco-laranja",
    name: "Suco de Laranja",
    description: "Suco natural de laranja 500ml",
    price: 8.00,
    category: "bebida",
    image: sucoLaranja
  },
  {
    id: "agua-mineral",
    name: "Água Mineral",
    description: "Água mineral sem gás 500ml",
    price: 4.00,
    category: "bebida",
    image: aguaMineral
  },
];
