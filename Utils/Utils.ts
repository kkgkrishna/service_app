import { format } from "date-fns";

export function formatDateForInput(dateStr: string): string {
  if (!dateStr) return "";
  try {
    const localDate = new Date(dateStr);
    return format(localDate, "yyyy-MM-dd'T'HH:mm");
  } catch (err) {
    console.error("Invalid date:", dateStr);
    return "";
  }
}
