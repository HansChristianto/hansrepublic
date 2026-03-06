import fs from "fs";
import yaml from "js-yaml";
import path from "path";
import type { Brand, DigitalProperty } from "./types";

const brandsPath = path.join(process.cwd(), "src/lib/data/brands.json");
const propertiesPath = path.join(process.cwd(), "src/lib/data/properties.yaml");

export async function loadBrands(): Promise<Brand[]> {
  const data = await fs.promises.readFile(brandsPath, "utf-8");
  const json = JSON.parse(data);
  const brands: Brand[] = json.brands || json;
  return brands.sort((a, b) => a.order - b.order);
}

export async function loadBrandById(id: string): Promise<Brand | undefined> {
  const brands = await loadBrands();
  return brands.find((b) => b.id === id);
}

export async function loadProperties(): Promise<DigitalProperty[]> {
  const data = await fs.promises.readFile(propertiesPath, "utf-8");
  const parsed = yaml.load(data) as { properties?: DigitalProperty[] } | DigitalProperty[];
  const properties = Array.isArray(parsed) ? parsed : (parsed.properties || []);
  return properties;
}

export async function loadPropertiesByBrand(
  brandId: string,
): Promise<DigitalProperty[]> {
  const properties = await loadProperties();
  return properties.filter((p) => p.brandId === brandId);
}
