import { NextRequest, NextResponse } from "next/server";
import { getAnalytics, logEvent } from "firebase/analytics";
import { app } from "@/lib/firebase";

// Analytics helper function
interface AnalyticsParams {
  [key: string]: string | number | boolean | null | undefined;
}

const logAnalyticsEvent = (eventName: string, params: AnalyticsParams = {}) => {
  // Only log on client-side
  if (typeof window === "undefined") return;

  try {
    const analytics = getAnalytics(app);
    logEvent(analytics, eventName, params);
  } catch (error) {
    console.error("Error logging analytics event:", error);
  }
};

// Handle GET requests
export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } },
): Promise<NextResponse> {
  try {
    const { slug } = params;

    // Log the request to analytics
    logAnalyticsEvent("genkit_api_request", {
      method: "GET",
      slug,
      timestamp: new Date().toISOString(),
    });

    // Handle different slug routes
    switch (slug) {
      case "status":
        return NextResponse.json({ status: "ok", message: "API is running" });
      default:
        return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error in GET handler:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

// Handle POST requests
export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } },
): Promise<NextResponse> {
  try {
    const { slug } = params;
    const body = await req.json();

    // Log the request to analytics
    logAnalyticsEvent("genkit_api_request", {
      method: "POST",
      slug,
      timestamp: new Date().toISOString(),
    });

    // Handle different slug routes
    switch (slug) {
      case "generate":
        // Add your generation logic here
        return NextResponse.json({
          status: "success",
          message: "Generation completed",
          data: body, // Echo back the request data for now
        });

      default:
        return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
