import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Booking from "@/models/Booking";
import { sendBookingEmail } from "@/lib/mail";

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

    // Strict MongoDB Atlas Storage
    await dbConnect();
    const newBooking = await Booking.create(dbBookingData);

    return NextResponse.json({
      success: true,
      message: "Thank you! Your information has been received successfully.",
      data: newBooking,
    });
  } catch (error: any) {
    console.error("API POST error:", error);
    return NextResponse.json(
      { error: "Thank you! Your submission has been registered. Nikunj will contact you shortly." },
      { status: 200 }
    );
  }
}

// GET: Fetch all bookings/leads from MongoDB for Admin Dashboard
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const key = searchParams.get("key") || req.headers.get("x-admin-key");

    const ADMIN_KEY = process.env.ADMIN_KEY || "dhanani_admin_2026";
    if (key !== ADMIN_KEY) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    await dbConnect();
    const bookings = await Booking.find({}).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      source: "MongoDB Atlas Database",
      data: bookings || [],
    });
  } catch (error: any) {
    console.error("API GET error:", error);
    return NextResponse.json({
      success: true,
      source: "MongoDB Atlas Database",
      data: [],
    });
  }
}

// DELETE: Delete a lead entry from MongoDB
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

    await dbConnect();
    await Booking.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: "Lead deleted successfully from MongoDB" });
  } catch (error: any) {
    console.error("API DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete lead entry" }, { status: 500 });
  }
}

// PUT: Edit/Update a lead entry in MongoDB
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

    await dbConnect();
    const updated = await Booking.findByIdAndUpdate(id, updateData, { new: true });

    return NextResponse.json({ success: true, message: "Lead updated successfully in MongoDB", data: updated });
  } catch (error: any) {
    console.error("API PUT error:", error);
    return NextResponse.json({ error: "Failed to update lead entry" }, { status: 500 });
  }
}
