import type { DigitalProperty, MonitoringSummary } from "$lib/types";
import fs from "fs";
import yaml from "js-yaml";
import path from "path";
import { fileURLToPath } from "url";
import type { PageServerLoad } from "./$types";

// Use import.meta.url for reliable path resolution in both dev and production
const getDataDir = () => {
  const baseDir = path.dirname(fileURLToPath(import.meta.url));
  return path.resolve(baseDir, "../../../../src/lib/data");
};

const propertiesPath = path.join(getDataDir(), "properties.yaml");

async function loadProperties(): Promise<DigitalProperty[]> {
  try {
    const data = await fs.promises.readFile(propertiesPath, "utf-8");
    const parsed = yaml.load(data) as
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
