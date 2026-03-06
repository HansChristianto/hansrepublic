import type { Brand } from "$lib/types";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import type { PageServerLoad } from "./$types";

// Use import.meta.url for reliable path resolution in both dev and production
const getDataDir = () => {
  const baseDir = path.dirname(fileURLToPath(import.meta.url));
  return path.resolve(baseDir, "../../../../src/lib/data");
};

const brandsPath = path.join(getDataDir(), "brands.json");

async function loadBrands(): Promise<Brand[]> {
  try {
    const data = await fs.promises.readFile(brandsPath, "utf-8");
    const json = JSON.parse(data);
    const brands: Brand[] = json.brands || json;
    return brands;
  } catch (error) {
    console.error("Error loading brands:", error);
    return [];
  }
}

export const load: PageServerLoad = async ({ params }) => {
  const brands = await loadBrands();
  const brand = brands.find((b) => b.id === params.slug);

  return {
    brand: brand || null,
  };
};
