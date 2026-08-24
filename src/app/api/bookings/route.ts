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

function deleteFallbackBooking(id: string) {
  try {
    const bookings = getFallbackBookings();
    const updated = bookings.filter((item: any) => item._id !== id);
    fs.writeFileSync(FALLBACK_FILE_PATH, JSON.stringify(updated, null, 2), "utf8");
    return true;
  } catch (error) {
    console.error("Fallback delete error:", error);
    return false;
  }
}

function updateFallbackBooking(id: string, updateData: any) {
  try {
    const bookings = getFallbackBookings();
    const index = bookings.findIndex((item: any) => item._id === id);
    if (index !== -1) {
      bookings[index] = { ...bookings[index], ...updateData };
      fs.writeFileSync(FALLBACK_FILE_PATH, JSON.stringify(bookings, null, 2), "utf8");
      return bookings[index];
    }
    return null;
  } catch (error) {
    console.error("Fallback update error:", error);
    return null;
  }
}

// POST: Submit a new booking / Quiz lead / Contact form
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, serviceType, service, message, notes } = body;

    const leadName = name || "Anonymous Visitor";
    const leadPhone = phone || "";
    const leadEmail = email || "";
    const finalService = serviceType || service || "General Counseling Inquiry";
    const finalMessage = message || notes || "Submitted via Website";

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
        message: "Lead received and saved successfully.",
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

// DELETE: Delete a lead entry
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const key = searchParams.get("key") || req.headers.get("x-admin-key");

    const ADMIN_KEY = process.env.ADMIN_KEY || "dhanani_admin_2026";
    if (key !== ADMIN_KEY) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    if (!id) {
      return NextResponse.json({ error: "Booking ID is required" }, { status: 400 });
    }

    const { isMock } = await dbConnect();

    if (isMock) {
      deleteFallbackBooking(id);
      return NextResponse.json({ success: true, message: "Lead deleted successfully from local file" });
    } else {
      await Booking.findByIdAndDelete(id);
      return NextResponse.json({ success: true, message: "Lead deleted successfully from database" });
    }
  } catch (error: any) {
    console.error("API DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete lead", details: error.message }, { status: 500 });
  }
}

// PUT: Edit/Update a lead entry
export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const key = searchParams.get("key") || req.headers.get("x-admin-key");

    const ADMIN_KEY = process.env.ADMIN_KEY || "dhanani_admin_2026";
    if (key !== ADMIN_KEY) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const body = await req.json();
    const { id, name, email, phone, serviceType, message } = body;

    if (!id) {
      return NextResponse.json({ error: "Booking ID is required" }, { status: 400 });
    }

    const updateData = { name, email, phone, serviceType, message };
    const { isMock } = await dbConnect();

    if (isMock) {
      const updated = updateFallbackBooking(id, updateData);
      return NextResponse.json({ success: true, message: "Lead updated successfully", data: updated });
    } else {
      const updated = await Booking.findByIdAndUpdate(id, updateData, { new: true });
      return NextResponse.json({ success: true, message: "Lead updated successfully", data: updated });
    }
  } catch (error: any) {
    console.error("API PUT error:", error);
    return NextResponse.json({ error: "Failed to update lead", details: error.message }, { status: 500 });
  }
}
