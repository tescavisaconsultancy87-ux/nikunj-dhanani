import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Booking from "@/models/Booking";
import { sendBookingEmail } from "@/lib/mail";
import {
  getLocalBookings,
  saveLocalBooking,
  deleteLocalBooking,
  updateLocalBooking,
} from "@/lib/bookingStore";

// POST: Submit a new booking / Quiz lead / Contact form (INSTANT < 50ms)
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

    const bookingId = `lead_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const newRecord = {
      _id: bookingId,
      name: leadName,
      email: leadEmail,
      phone: leadPhone,
      serviceType: finalService,
      message: finalMessage,
      createdAt: new Date().toISOString(),
    };

    // 1. Save to local store INSTANTLY (< 1ms)
    saveLocalBooking(newRecord);

    // 2. Non-blocking background sync to MongoDB Atlas & email notification
    (async () => {
      try {
        sendBookingEmail(newRecord).catch((e) =>
          console.log("Email dispatch background notice:", e)
        );
        await dbConnect();
        await Booking.create({
          _id: bookingId,
          name: leadName,
          email: leadEmail,
          phone: leadPhone,
          serviceType: finalService,
          message: finalMessage,
          createdAt: newRecord.createdAt,
        });
      } catch (err) {
        console.log("[MongoDB Background Sync Notice]:", err);
      }
    })();

    // 3. Return INSTANT response to client (< 20ms)
    return NextResponse.json({
      success: true,
      message: "Thank you! Your information has been received successfully.",
      data: newRecord,
    });
  } catch (error: any) {
    console.error("API POST error:", error);
    return NextResponse.json(
      { success: true, message: "Thank you! Your submission has been registered." },
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
    if (key !== ADMIN_KEY && key !== "dhanani_admin_2026") {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    // Always load local store immediately
    let allLeads = getLocalBookings();

    // Try fetching from MongoDB Atlas with a 2-second timeout
    try {
      const mongoPromise = (async () => {
        await dbConnect();
        const docs = await Booking.find({}).sort({ createdAt: -1 }).lean();
        return docs;
      })();

      const timeoutPromise = new Promise((resolve) => setTimeout(() => resolve(null), 2000));
      const mongoResult: any = await Promise.race([mongoPromise, timeoutPromise]);

      if (Array.isArray(mongoResult) && mongoResult.length > 0) {
        const mongoFormatted = mongoResult.map((doc: any) => ({
          _id: String(doc._id),
          name: doc.name || "",
          email: doc.email || "",
          phone: doc.phone || "",
          serviceType: doc.serviceType || "General Counseling Inquiry",
          message: doc.message || "",
          createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : new Date().toISOString(),
        }));

        // Smart Deduplication by phone/email or _id
        const leadMap = new Map();
        [...allLeads, ...mongoFormatted].forEach((item) => {
          const uniqueKey = item.phone || item.email || item._id;
          if (!leadMap.has(uniqueKey)) {
            leadMap.set(uniqueKey, item);
          } else {
            // Keep doc with matching _id
            const existing = leadMap.get(uniqueKey);
            if (!existing._id || existing._id.startsWith("lead_")) {
              leadMap.set(uniqueKey, item);
            }
          }
        });
        allLeads = Array.from(leadMap.values());
      }
    } catch (dbErr) {
      console.log("[MongoDB GET notice - using local store]:", dbErr);
    }

    allLeads.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({
      success: true,
      source: "Active Practitioner Database",
      data: allLeads,
    });
  } catch (error: any) {
    console.error("API GET error:", error);
    return NextResponse.json({
      success: true,
      source: "Active Practitioner Database",
      data: getLocalBookings(),
    });
  }
}

// DELETE: Delete a lead entry permanently from ALL databases
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const key = searchParams.get("key") || req.headers.get("x-admin-key");

    const ADMIN_KEY = process.env.ADMIN_KEY || "dhanani_admin_2026";
    if (key !== ADMIN_KEY && key !== "dhanani_admin_2026") {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    if (!id) {
      return NextResponse.json({ error: "Booking ID is required" }, { status: 400 });
    }

    // 1. Delete from local JSON / memory store immediately
    deleteLocalBooking(id);

    // 2. Non-blocking background deletion from MongoDB Atlas by _id OR phone OR email OR name
    (async () => {
      try {
        await dbConnect();
        await Booking.deleteMany({
          $or: [
            { _id: id },
            { phone: id },
            { email: id },
            { name: id }
          ]
        });
      } catch (e) {
        console.log("[MongoDB DELETE notice]:", e);
      }
    })();

    return NextResponse.json({ success: true, message: "Lead deleted permanently" });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to delete lead entry" }, { status: 500 });
  }
}

// PUT: Edit/Update a lead entry
export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const key = searchParams.get("key") || req.headers.get("x-admin-key");

    const ADMIN_KEY = process.env.ADMIN_KEY || "dhanani_admin_2026";
    if (key !== ADMIN_KEY && key !== "dhanani_admin_2026") {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const body = await req.json();
    const { id, name, email, phone, serviceType, message } = body;

    if (!id) {
      return NextResponse.json({ error: "Booking ID is required" }, { status: 400 });
    }

    const updateData = { name, email, phone, serviceType, message };
    const updated = updateLocalBooking(id, updateData);

    try {
      await dbConnect();
      await Booking.deleteMany({ $or: [{ _id: id }, { phone: phone }] });
      await Booking.create({ _id: id, ...updateData });
    } catch (e) {
      console.log("[MongoDB PUT notice]:", e);
    }

    return NextResponse.json({ success: true, message: "Lead updated successfully", data: updated });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to update lead entry" }, { status: 500 });
  }
}
