import { format, isValid } from "date-fns";

// Date Formatting Utility
export function formatDateForInput(dateStr: string): string {
  if (!dateStr?.trim()) return "";
  const date = new Date(dateStr);
  return isValid(date) ? format(date, "yyyy-MM-dd'T'HH:mm") : "";
}

// State/City Data
export const stateCityMap: Record<string, string[]> = {
  Maharashtra: ["Mumbai", "Pune", "Nagpur"],
  Delhi: ["New Delhi", "Noida", "Gurgaon"],
  Karnataka: ["Bangalore", "Mysore", "Hubli"],
  // Add more states and cities as needed
  TamilNadu: ["Chennai", "Coimbatore", "Madurai"],
  WestBengal: ["Kolkata", "Howrah", "Durgapur"],
  UttarPradesh: [
    "Lucknow",
    "Kanpur Nagar",
    "Agra",
    "Varanasi",
    "Allahabad",
    "Meerut",
    "Ghaziabad",
    "Noida",
    "Aligarh",
    "Bareilly",
    "Moradabad",
    "Saharanpur",
    "Gorakhpur",
    "Faizabad",
    "Jhansi",
    "Mathura",
    "Firozabad",
    "Ayodhya",
    "Rampur",
    "Shahjahanpur",
    "Muzaffarnagar",
    "Etawah",
    "Mirzapur",
    "Bulandshahr",
    "Sambhal",
    "Amroha",
    "Hardoi",
    "Fatehpur",
    "Raebareli",
    "Orai",
    "Sitapur",
    "Bahraich",
    "Modinagar",
    "Unnao",
    "Jaunpur",
    "Lalitpur",
    "Hathras",
    "Banda",
    "Pilibhit",
    "Barabanki",
    "Khurja",
    "Gonda",
    "Mainpuri",
    "Lakhimpur",
    "Etah",
    "Deoria",
    "Sultanpur",
    "Azamgarh",
    "Bijnor",
    "Basti",
    "Chandausi",
    "Akbarpur",
    "Ballia",
    "Mubarakpur",
    "Tanda",
    "Shamli",
    "Najibabad",
  ],
};

export const getPermissions = (): string[] => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("permissions") || "[]");
  }
  return [];
};

export const states = Object.keys(stateCityMap);

// Optional: Helper function to get cities by state
export function getCitiesByState(state: string): string[] {
  return stateCityMap[state] || [];
}

// Get all UP cities
const upCities = getCitiesByState("UttarPradesh");
// console.log(upCities);
// Returns: ["Lucknow", "Kanpur", "Agra", ...]

// Get all available states
// console.log(states);
// Returns: ["Maharashtra", "Delhi", ..., "UttarPradesh"]

// utils/auth.ts

export function decodeToken(token: string) {
  try {
    const payloadBase64 = token.split(".")[1];
    const decodedPayload = atob(payloadBase64);
    return JSON.parse(decodedPayload);
  } catch (error) {
    console.error("Invalid token format", error);
    return null;
  }
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("auth_token");
}

export function getUserFromToken(): any | null {
  const token = getToken();
  if (!token) return null;
  return decodeToken(token);
}

export function formatDateTime(input: string): { date: string; time: string } {
  const date = new Date(input);

  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();

  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;

  return {
    date: `${day} ${month} ${year}`,
    time: `${String(hour12).padStart(2, "0")}:${minutes} ${ampm}`,
  };
}
