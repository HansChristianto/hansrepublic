import type { Brand, DigitalProperty } from "$lib/types";
import brandsData from "$lib/data/brands.json";
import propertiesYaml from "$lib/data/properties.yaml?raw";
import yaml from "js-yaml";
import type { PageServerLoad } from "./$types";

// Use static imports which are more reliable in serverless
async function loadBrands(): Promise<Brand[]> {
  try {
    const brands = brandsData.brands || brandsData;
    return (brands as Brand[]).sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error('Error loading brands:', error);
    return [];
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
