import type { Brand, DigitalProperty } from "$lib/types";
import fs from "fs";
import yaml from "js-yaml";
import path from "path";
import type { PageServerLoad } from "./$types";

const brandsPath = path.join(process.cwd(), "src/lib/data/brands.json");
const propertiesPath = path.join(process.cwd(), "src/lib/data/properties.yaml");

async function loadBrands(): Promise<Brand[]> {
  const data = await fs.promises.readFile(brandsPath, "utf-8");
  const json = JSON.parse(data);
  const brands: Brand[] = json.brands || json;
  return brands.sort((a, b) => a.order - b.order);
}

async function loadProperties(): Promise<DigitalProperty[]> {
  const data = await fs.promises.readFile(propertiesPath, "utf-8");
  const parsed = yaml.load(data) as
    | { properties?: DigitalProperty[] }
    | DigitalProperty[];
  const properties = Array.isArray(parsed) ? parsed : parsed.properties || [];
  return properties;
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
