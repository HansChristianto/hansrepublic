import type { DigitalProperty, MonitoringSummary } from "$lib/types";
import propertiesYaml from "$lib/data/properties.yaml?raw";
import yaml from "js-yaml";
import type { PageServerLoad } from "./$types";

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

export const load: PageServerLoad = async () => {
  const properties = await loadProperties();

  const summary: MonitoringSummary = {
    total: properties.length,
    online: properties.filter((p) => p.status === "online").length,
    offline: properties.filter((p) => p.status === "offline").length,
    unknown: properties.filter((p) => p.status === "unknown").length,
  };

  return {
    properties,
    summary,
    lastUpdated: new Date().toISOString(),
  };
};
