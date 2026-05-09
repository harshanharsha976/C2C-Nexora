export type Technician = {
  id: number;
  name: string;
};

const stored = localStorage.getItem("technicians");

export const technicians: Technician[] = stored
  ? JSON.parse(stored)
  : [
      { id: 1, name: "Punith senior tech" },
      { id: 2, name: "Chandu services tech" },
      { id: 3, name: "Majunath filed tech" },
      { id: 4, name: "Srinath pump tech" },
      { id: 5, name: "Karthik junior tech" },
    ];
