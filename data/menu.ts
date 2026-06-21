export interface MenuItem {
  name: string;
  description: string;
  price: string;
  category: "coffee" | "pastries" | "specials";
}

export const menuItems: MenuItem[] = [
  {
    name: "House Blend",
    description: "Smooth, medium-roast coffee with notes of chocolate and caramel.",
    price: "₱120",
    category: "coffee",
  },
  {
    name: "Matcha Latte",
    description: "Ceremonial-grade matcha whisked with steamed oat milk.",
    price: "₱150",
    category: "coffee",
  },
  {
    name: "Cold Brew",
    description: "Slow-steeped for 18 hours for a bold, silky finish.",
    price: "₱135",
    category: "coffee",
  },
  {
    name: "Spanish Latte",
    description: "Espresso with sweetened condensed milk — rich and creamy.",
    price: "₱140",
    category: "coffee",
  },
  {
    name: "Buttered Pastry",
    description: "Flaky, golden-baked croissant or ensaymada — your choice.",
    price: "₱90",
    category: "pastries",
  },
  {
    name: "Pain au Chocolat",
    description: "Buttery laminated dough filled with dark chocolate.",
    price: "₱110",
    category: "pastries",
  },
  {
    name: "Ube Cheesecake",
    description: "Creamy cheesecake with a Filipino ube twist.",
    price: "₱150",
    category: "pastries",
  },
  {
    name: "Caramel Macchiato",
    description: "Layered espresso with vanilla and housemade caramel.",
    price: "₱160",
    category: "specials",
  },
  {
    name: "Dirty Matcha",
    description: "Matcha latte pulled over a shot of espresso.",
    price: "₱165",
    category: "specials",
  },
  {
    name: "Strawberry Lemonade",
    description: "Fresh-pressed lemonade with muddled strawberries.",
    price: "₱130",
    category: "specials",
  },
];
