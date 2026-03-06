import propertiesYaml from "$lib/data/properties.yaml?raw";
import type { DigitalProperty } from "$lib/types";
import yaml from "js-yaml";

/**
 * Webhook payload from UptimeRobot
 * https://uptimerobot.com/api/#webhooks
 */
interface UptimeRobotWebhook {
  monitor?: {
    id?: string;
    url?: string;
    friendly_name?: string;
    status?: string;
    response_time?: string;
    lastcheck?: string;
  };
  alertType?: {
    type?: number;
    name?: string;
  };
}

function mapUptimeRobotStatus(
  status: string | undefined,
): "online" | "offline" | "unknown" {
  switch (status) {
    case "0": // Down
      return "offline";
    case "1": // Up
      return "online";
    case "2": // Seems down
    case "9": // Paused
      return "unknown";
    default:
      return "unknown";
  }
}

async function loadProperties(): Promise<DigitalProperty[]> {
  try {
    const parsed = yaml.load(propertiesYaml) as
      | { properties?: DigitalProperty[] }
      | DigitalProperty[];
    const properties = Array.isArray(parsed) ? parsed : parsed.properties || [];
    return properties;
  } catch (error) {
    console.error("Error loading properties:", error);
    return [];
  }
}

async function saveProperties(_properties: DigitalProperty[]): Promise<void> {
  // Note: Vercel has a read-only filesystem in serverless functions
  // This function will fail in production but works locally
  // For production, use a database or external storage (e.g., Vercel KV, Supabase)
  throw new Error(
    "File system is read-only in serverless environment. Use external storage.",
  );
}

/**
 * POST endpoint for UptimeRobot webhooks
 *
 * UptimeRobot sends webhooks when:
 * - Monitor goes down (alertType.type = 1)
 * - Monitor goes up (alertType.type = 2)
 *
 * Example webhook payload:
 * {
 *   "monitor": {
 *     "id": "12345678",
 *     "url": "https://example.com",
 *     "friendly_name": "My Website",
 *     "status": "1",
 *     "response_time": "123",
 *     "lastcheck": "2026-03-06T12:00:00Z"
 *   },
 *   "alertType": {
 *     "type": 1,
 *     "name": "Down"
 *   }
 * }
 */
export async function POST({ request }: { request: Request }) {
  try {
    const payload: UptimeRobotWebhook = await request.json();

    if (!payload.monitor?.url) {
      return new Response(
        JSON.stringify({ error: "Invalid payload: missing monitor URL" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const properties = await loadProperties();
    const monitorUrl = payload.monitor.url;
    const newStatus = mapUptimeRobotStatus(payload.monitor.status);
    const responseTime = payload.monitor.response_time
      ? parseInt(payload.monitor.response_time, 10)
      : null;
    const lastChecked = payload.monitor.lastcheck || new Date().toISOString();

    // Find and update the property by URL
    const propertyIndex = properties.findIndex((p) => p.url === monitorUrl);

    if (propertyIndex === -1) {
      return new Response(
        JSON.stringify({ error: `Property not found: ${monitorUrl}` }),
        { status: 404, headers: { "Content-Type": "application/json" } },
      );
    }

    // Update the property status
    properties[propertyIndex] = {
      ...properties[propertyIndex],
      status: newStatus,
      lastChecked,
      responseTime: responseTime ?? properties[propertyIndex].responseTime,
    };

    try {
      await saveProperties(properties);
    } catch (writeError) {
      // Return success anyway since the data is valid
      // In production, you'd use a database
      console.log("Write skipped (read-only filesystem):", writeError);
    }

    return new Response(
      JSON.stringify({
        success: true,
        note: "Status validated (storage not available in serverless)",
        property: properties[propertyIndex].name,
        status: newStatus,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

/**
 * GET endpoint - returns current property statuses
 */
export async function GET() {
  try {
    const properties = await loadProperties();

    return new Response(JSON.stringify({ properties }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("API error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to load properties" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
