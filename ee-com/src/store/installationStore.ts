// store/installationStore.ts

export type Installation = {
  id: number;
  customer: string;
  product: string;
  technician: string;
  date: string;
  status: "Pending" | "Completed";
};

// ✅ Safe load function
const loadInstallations = (): Installation[] => {
  try {
    const data = localStorage.getItem("installations");

    if (!data) return [];

    return JSON.parse(data);
  } catch (error) {
    console.error("Error loading installations:", error);
    return [];
  }
};

// ✅ Export global array
export const installations: Installation[] = loadInstallations();
