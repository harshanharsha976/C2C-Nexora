export type Customer = {
  id: number;
  name: string;
};

const stored = localStorage.getItem("customers");

export const customers: Customer[] = stored
  ? JSON.parse(stored)
  : [
      { id: 1, name: "hari" },
      { id: 2, name: "Kumar" },
    ];
