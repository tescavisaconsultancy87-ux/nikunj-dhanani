import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Booking from "@/models/Booking";
import { sendBookingEmail } from "@/lib/mail";
import fs from "fs";
import path from "path";

const FALLBACK_FILE_PATH = path.join(process.cwd(), "src/data/bookings.json");

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
      _id: "lead_" + Date.now() + "_" + Math.random().toString(36).substr(2, 6),
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

// POST: Submit a new booking / Quiz lead form
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, serviceType, service, message, notes } = body;

    // Flexible extraction so neither booking form nor quiz leads fail validation
    const leadName = name || "Anonymous Visitor";
    const leadPhone = phone || "";
    const leadEmail = email || "";
    const finalService = serviceType || service || "General Counseling Inquiry";
    const finalMessage = message || notes || "Submitted via 2-Min Stress Check-in Quiz";

    if (!leadPhone && !leadEmail) {
      return NextResponse.json(
        { error: "Please provide a valid phone number or email" },
        { status: 400 }
      );
    }

    const dbBookingData = {
      name: leadName,
      email: leadEmail,
      phone: leadPhone,
      serviceType: finalService,
      message: finalMessage,
    };

    // Fire-and-forget email alert to Nikunj
    sendBookingEmail(dbBookingData).catch((err) =>
      console.log("Email dispatch background notice:", err)
    );

    const { isMock } = await dbConnect();

    if (isMock) {
      const saved = saveFallbackBooking(dbBookingData);
      return NextResponse.json({
        success: true,
        message: "Lead received and saved to local file successfully.",
        data: saved,
        source: "local-file",
      });
    } else {
      const newBooking = await Booking.create(dbBookingData);
      return NextResponse.json({
        success: true,
        message: "Lead received and saved to database successfully.",
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

// GET: Fetch all bookings/leads for Admin Dashboard
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const key = searchParams.get("key") || req.headers.get("x-admin-key");

    const ADMIN_KEY = process.env.ADMIN_KEY || "dhanani_admin_2026";
    if (key !== ADMIN_KEY) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const { isMock } = await dbConnect();

    if (isMock) {
      const bookings = getFallbackBookings();
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
