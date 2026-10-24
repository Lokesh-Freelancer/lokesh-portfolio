import { NextResponse } from "next/server";

interface ContactPayload {
  mode?: "inquiry" | "audit";
  name?: string;
  email?: string;
  projectType?: string;
  budget?: string;
  message?: string;
  storeUrl?: string;
  contact?: string;
  concern?: string;
  notes?: string;
}

export async function POST(request: Request) {
  try {
    const body: ContactPayload = await request.json();
    const mode = body.mode || "inquiry";

    // Handle Free Audit Mode
    if (mode === "audit") {
      const storeUrl = (body.storeUrl || "").trim();
      const contact = (body.contact || "").trim();
      const concern = (body.concern || "General Store Health").trim();
      const notes = (body.notes || "").trim();

      if (!storeUrl) {
        return NextResponse.json(
          { success: false, error: "Please enter your store URL." },
          { status: 400 }
        );
      }
      if (!contact) {
        return NextResponse.json(
          { success: false, error: "Please enter your email or WhatsApp number." },
          { status: 400 }
        );
      }

      const auditData = {
        storeUrl,
        contact,
        concern,
        notes,
        timestamp: new Date().toISOString(),
      };

      console.log("[New Free Store Audit Request]", auditData);

      const web3formsKey = process.env.WEB3FORMS_ACCESS_KEY || "6d6f4bc4-52d0-4206-bc7e-1db790d7954f";
      if (web3formsKey) {
        try {
          await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              access_key: web3formsKey,
              subject: `⚡ Free Shopify Store Audit Request: ${storeUrl}`,
              from_name: "Lokesh Portfolio - Audit Request",
              to_email: "lokeshprajapati000@gmail.com",
              "Store URL": storeUrl,
              "Contact (Email/WhatsApp)": contact,
              "Main Focus": concern,
              "Notes": notes || "None",
              message: `New Free Shopify Store Audit Request\n\nStore URL: ${storeUrl}\nContact: ${contact}\nMain Concern: ${concern}\nNotes: ${notes || "None"}`,
            }),
          });
        } catch (fwErr) {
          console.error("[Web3Forms Audit Forwarding Error]", fwErr);
        }
      }

      return NextResponse.json({
        success: true,
        message: `Thank you! I will review ${storeUrl} and send your free audit to ${contact} within 24h.`,
      });
    }

    // Handle Project Inquiry Mode
    const { name, email, projectType, budget, message } = body;

    // Basic validation
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { success: false, error: "Please enter your name." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { success: false, error: "Please enter a short project message." },
        { status: 400 }
      );
    }

    const cleanData = {
      name: name.trim().slice(0, 100),
      email: email.trim().slice(0, 120),
      projectType: (projectType || "Custom Shopify Store").slice(0, 80),
      budget: (budget || "Not specified").slice(0, 50),
      message: message.trim().slice(0, 2500),
      timestamp: new Date().toISOString(),
    };

    // Log inquiry for traceability in dev/production logs
    console.log("[New Project Inquiry Received]", cleanData);

    // Forward to Web3Forms if access key is available
    const web3formsKey = process.env.WEB3FORMS_ACCESS_KEY || "6d6f4bc4-52d0-4206-bc7e-1db790d7954f";
    if (web3formsKey) {
      try {
        const externalRes = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: web3formsKey,
            subject: `New Shopify Inquiry from ${cleanData.name} (${cleanData.projectType})`,
            from_name: "Lokesh Portfolio",
            to_email: "lokeshprajapati000@gmail.com",
            replyto: cleanData.email,
            name: cleanData.name,
            email: cleanData.email,
            "Project Type": cleanData.projectType,
            "Estimated Budget": cleanData.budget,
            message: cleanData.message,
          }),
        });

        const externalJson = await externalRes.json();
        if (!externalRes.ok || !externalJson.success) {
          console.error("[Web3Forms Forwarding Error]", externalJson);
        }
      } catch (fwErr) {
        console.error("[Web3Forms Forwarding Exception]", fwErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Thank you! Your project inquiry has been received. Expect a response within 12–24 hours.",
    });
  } catch (err) {
    console.error("[Contact API Error]", err);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred. Please reach out directly via WhatsApp or email." },
      { status: 500 }
    );
  }
}
