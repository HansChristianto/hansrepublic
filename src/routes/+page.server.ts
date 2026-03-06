import type { Brand, DigitalProperty } from "$lib/types";
import fs from "fs";
import yaml from "js-yaml";
import path from "path";
import { fileURLToPath } from 'url';
import type { PageServerLoad } from "./$types";

// Get the directory of the current module
const getDataDir = () => {
  // In Vercel/production, we need to use a different approach
  if (process.env.VERCEL) {
    return path.join(process.cwd(), 'src/lib/data');
  }
  return path.join(process.cwd(), 'src/lib/data');
};

const brandsPath = path.join(getDataDir(), 'brands.json');
const propertiesPath = path.join(getDataDir(), 'properties.yaml');

async function loadBrands(): Promise<Brand[]> {
  try {
    const data = await fs.promises.readFile(brandsPath, "utf-8");
    const json = JSON.parse(data);
    const brands: Brand[] = json.brands || json;
    return brands.sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error('Error loading brands:', error);
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
    console.error('Error loading properties:', error);
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
