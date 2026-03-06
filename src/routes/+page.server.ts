import type { Brand, DigitalProperty } from "$lib/types";
import fs from "fs";
import yaml from "js-yaml";
import path from "path";
import { fileURLToPath } from "url";
import type { PageServerLoad } from "./$types";

// Use import.meta.url for reliable path resolution in both dev and production
const getDataDir = () => {
  // In production (Vercel), files are in the .svelte-kit/output/server directory
  // We need to go up to find the src/lib/data directory
  const baseDir = path.dirname(fileURLToPath(import.meta.url));
  // Go up from .svelte-kit/output/server/entries/pages/_page.server.ts.js
  // to project root
  return path.resolve(baseDir, "../../../../src/lib/data");
};

const brandsPath = path.join(getDataDir(), "brands.json");
const propertiesPath = path.join(getDataDir(), "properties.yaml");

async function loadBrands(): Promise<Brand[]> {
  try {
    const data = await fs.promises.readFile(brandsPath, "utf-8");
    const json = JSON.parse(data);
    const brands: Brand[] = json.brands || json;
    return brands.sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error("Error loading brands:", error);
    console.error("Brands path:", brandsPath);
    return [];
  }
}

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
    console.error("Properties path:", propertiesPath);
    return [];
  }
}

export const load: PageServerLoad = async () => {
  const brands = await loadBrands();
  const properties = await loadProperties();

  return {
    brands,
    properties,
    services: [
      { id: "web-development", label: "Web Development" },
      { id: "digital-marketing", label: "Digital Marketing" },
      { id: "affiliate-marketing", label: "Affiliate Marketing" },
      { id: "e-commerce", label: "E-Commerce" },
      { id: "media", label: "Media" },
    ],
  };
};
