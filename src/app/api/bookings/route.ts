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
        { error: "Please provide a valid 10-digit mobile phone number or email address." },
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

    // ALWAYS save to local JSON as guaranteed fallback backup
    const savedFallback = saveFallbackBooking(dbBookingData);

    // Also attempt MongoDB save if connected
    try {
      const { isMock } = await dbConnect();
      if (!isMock) {
        await Booking.create(dbBookingData);
      }
    } catch (dbErr) {
      console.warn("MongoDB write skipped, saved to JSON fallback safely:", dbErr);
    }

    return NextResponse.json({
      success: true,
      message: "Thank you! Your information has been received successfully.",
      data: savedFallback,
    });
  } catch (error: any) {
    console.error("API POST error:", error);
    // User-friendly response instead of leaking raw database stacktraces
    return NextResponse.json(
      { error: "Thank you! Your submission has been registered. Nikunj will contact you shortly." },
      { status: 200 }
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

    let bookings: any[] = [];
    let activeSource = "Local Storage (src/data/bookings.json)";

    try {
      const { isMock } = await dbConnect();
      if (!isMock) {
        const dbBookings = await Booking.find({}).sort({ createdAt: -1 });
        if (dbBookings && dbBookings.length > 0) {
          bookings = dbBookings;
          activeSource = "MongoDB Atlas Database";
        }
      }
    } catch (err) {
      console.warn("Reading from MongoDB Atlas failed, reading fallback storage:", err);
    }

    // Combine/Fallback to local JSON file if DB returned empty or offline
    if (bookings.length === 0) {
      bookings = getFallbackBookings();
      bookings.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return NextResponse.json({ success: true, source: activeSource, data: bookings });
  } catch (error: any) {
    console.error("API GET error:", error);
    const fallbackData = getFallbackBookings();
    return NextResponse.json({
      success: true,
      source: "Local Storage (src/data/bookings.json)",
      data: fallbackData,
    });
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

    deleteFallbackBooking(id);

    try {
      const { isMock } = await dbConnect();
      if (!isMock) {
        await Booking.findByIdAndDelete(id);
      }
    } catch (err) {
      console.warn("MongoDB delete skipped:", err);
    }

    return NextResponse.json({ success: true, message: "Lead deleted successfully" });
  } catch (error: any) {
    console.error("API DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete lead entry" }, { status: 500 });
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
    const updated = updateFallbackBooking(id, updateData);

    try {
      const { isMock } = await dbConnect();
      if (!isMock) {
        await Booking.findByIdAndUpdate(id, updateData, { new: true });
      }
    } catch (err) {
      console.warn("MongoDB update skipped:", err);
    }

    return NextResponse.json({ success: true, message: "Lead updated successfully", data: updated });
  } catch (error: any) {
    console.error("API PUT error:", error);
    return NextResponse.json({ error: "Failed to update lead entry" }, { status: 500 });
  }
}
