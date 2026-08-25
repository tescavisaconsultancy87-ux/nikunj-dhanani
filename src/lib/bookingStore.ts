import fs from "fs";
import path from "path";

export interface BookingRecord {
  _id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  message: string;
  createdAt: string;
}

// Memory cache initialized with zero mock data
let memoryBookings: BookingRecord[] = [];

const getFilePath = () => {
  return path.join(process.cwd(), "src", "data", "bookings_store.json");
};

// Ensure directory and file exist
const ensureFileExists = () => {
  try {
    const dirPath = path.join(process.cwd(), "src", "data");
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    const filePath = getFilePath();
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify([], null, 2), "utf-8");
    }
  } catch (err) {
    console.log("[BookingStore] File system access warning:", err);
  }
};

export const getLocalBookings = (): BookingRecord[] => {
  try {
    ensureFileExists();
    const filePath = getFilePath();
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, "utf-8");
      const parsed = JSON.parse(fileData);
      if (Array.isArray(parsed)) {
        // Exclude legacy demo items
        memoryBookings = parsed.filter((b: any) => !b._id?.startsWith("demo-lead-"));
      }
    }
  } catch (err) {
    console.log("[BookingStore] Reading local file fallback:", err);
  }
  return memoryBookings;
};

export const saveLocalBooking = (record: BookingRecord): BookingRecord => {
  try {
    memoryBookings = [record, ...memoryBookings.filter((b) => b._id !== record._id)];
    ensureFileExists();
    const filePath = getFilePath();
    fs.writeFileSync(filePath, JSON.stringify(memoryBookings, null, 2), "utf-8");
  } catch (err) {
    console.log("[BookingStore] Writing local file fallback:", err);
  }
  return record;
};

export const deleteLocalBooking = (id: string): boolean => {
  try {
    memoryBookings = memoryBookings.filter((b) => b._id !== id);
    ensureFileExists();
    const filePath = getFilePath();
    fs.writeFileSync(filePath, JSON.stringify(memoryBookings, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.log("[BookingStore] Delete error:", err);
    return false;
  }
};

export const updateLocalBooking = (id: string, update: Partial<BookingRecord>): BookingRecord | null => {
  try {
    let updated: BookingRecord | null = null;
    memoryBookings = memoryBookings.map((b) => {
      if (b._id === id) {
        updated = { ...b, ...update };
        return updated;
      }
      return b;
    });
    ensureFileExists();
    const filePath = getFilePath();
    fs.writeFileSync(filePath, JSON.stringify(memoryBookings, null, 2), "utf-8");
    return updated;
  } catch (err) {
    console.log("[BookingStore] Update error:", err);
    return null;
  }
};
