import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Booking from "@/models/Booking";
import fs from "fs";
import path from "path";

const FALLBACK_FILE_PATH = path.join(process.cwd(), "src/data/bookings.json");

// Save booking to a JSON file if MongoDB is unavailable
function saveFallbackBooking(bookingData: any) {
  try {
    const dir = path.dirname(FALLBACK_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    let bookings = [];
    if (fs.existsSync(FALLBACK_FILE_PATH)) {
      const fileData = fs.readFileSync(FALLBACK_FILE_PATH, "utf8");
      try {
        bookings = JSON.parse(fileData);
      } catch (e) {
        bookings = [];
      }
    }

    const newBooking = {
      ...bookingData,
      _id: "fb_" + Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    };

    bookings.push(newBooking);
    fs.writeFileSync(FALLBACK_FILE_PATH, JSON.stringify(bookings, null, 2), "utf8");
    return newBooking;
  } catch (error) {
    console.error("Fallback storage error:", error);
    return null;
  }
}

// Retrieve bookings from local JSON file
function getFallbackBookings() {
  try {
    if (fs.existsSync(FALLBACK_FILE_PATH)) {
      const fileData = fs.readFileSync(FALLBACK_FILE_PATH, "utf8");
      return JSON.parse(fileData);
    }
  } catch (error) {
    console.error("Fallback reading error:", error);
  }
  return [];
}

// POST: Submit a new booking / contact form
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, serviceType, message } = body;

    // Simple validation
    if (!name || !email || !phone || !serviceType || !message) {
      return NextResponse.json(
        { error: "Please fill in all fields" },
        { status: 400 }
      );
    }

    const dbBookingData = { name, email, phone, serviceType, message };

    const { isMock } = await dbConnect();

    if (isMock) {
      const saved = saveFallbackBooking(dbBookingData);
      return NextResponse.json({
        success: true,
        message: "Your message is received. You will be contacted back shortly.",
        data: saved,
        source: "local-file",
      });
    } else {
      const newBooking = await Booking.create(dbBookingData);
      return NextResponse.json({
        success: true,
        message: "Your message is received. You will be contacted back shortly.",
        data: newBooking,
        source: "mongodb",
      });
    }
  } catch (error: any) {
    console.error("API POST error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}

// GET: Fetch all bookings (Protected by simple key check)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const key = searchParams.get("key") || req.headers.get("x-admin-key");

    // Simple password key verification
    const ADMIN_KEY = process.env.ADMIN_KEY || "dhanani_admin_2026";
    if (key !== ADMIN_KEY) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const { isMock } = await dbConnect();

    if (isMock) {
      const bookings = getFallbackBookings();
      // Sort bookings by newest first
      bookings.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      return NextResponse.json({ success: true, source: "local-file", data: bookings });
    } else {
      const bookings = await Booking.find({}).sort({ createdAt: -1 });
      return NextResponse.json({ success: true, source: "mongodb", data: bookings });
    }
  } catch (error: any) {
    console.error("API GET error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
