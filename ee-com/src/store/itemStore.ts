export type Item = {
  id: number;
  name: string;
  price:string;
};

const stored = localStorage.getItem("items");

export const items: Item[] = stored
  ? JSON.parse(stored)
  : [
      { id: 1, name: "RO Purifier" },
      { id: 2, name: "UV Purifier" },
      { id: 3, name: "Miniral Ro System" },
      { id: 4, name: "Aquaguard" },
      { id: 5, name: "BlueWave purifier" },
      { id: 6, name: "AquoTech Ro" },
      { id: 7, name: "SafeWater plus" },
    ];
