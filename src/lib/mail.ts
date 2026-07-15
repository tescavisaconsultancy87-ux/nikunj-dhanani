interface BookingDetails {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  message: string;
  date?: string;
  time?: string;
}

export async function sendBookingEmail(details: BookingDetails) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    console.warn(
      "[Mailer Warning] WEB3FORMS_ACCESS_KEY is missing. Email notifications will be skipped."
    );
    return { success: false, reason: "WEB3FORMS_ACCESS_KEY not configured" };
  }

  try {
    const formattedDate = details.date
      ? new Date(details.date).toLocaleDateString("en-IN", {
          weekday: "short",
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "Not scheduled";

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        name: details.name,
        email: details.email,
        phone: details.phone,
        service: details.serviceType,
        message: details.message,
        booking_date: formattedDate,
        booking_time: details.time || "Not scheduled",
        subject: `New Lead: ${details.serviceType} Consultation Request from ${details.name}`,
        from_name: "Portfolio Booking",
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      console.log("[Mailer Success] Web3Forms email sent successfully:", data);
      return { success: true };
    } else {
      const errorText = await response.text();
      console.error("[Mailer Error] Web3Forms API error:", errorText);
      return { success: false, error: errorText };
    }
  } catch (error) {
    const err = error as Error;
    console.error("[Mailer Error] Failed to send email via Web3Forms:", err.message);
    return { success: false, error: err.message };
  }
}
