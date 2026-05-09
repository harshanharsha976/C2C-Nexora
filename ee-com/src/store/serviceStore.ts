export type Service = {
  id: number;
  customer: string;
  product: string;
  issue: string;
  technician?: string; // ✅ add this
  date?: string; // ✅ add this
  status: "Pending" | "Completed";
};

export const services: Service[] = [];
