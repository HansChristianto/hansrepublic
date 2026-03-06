import type { Brand } from "$lib/types";
import fs from "fs";
import path from "path";
import type { PageServerLoad } from "./$types";

const brandsPath = path.join(process.cwd(), "src/lib/data/brands.json");

async function loadBrands(): Promise<Brand[]> {
  const data = await fs.promises.readFile(brandsPath, "utf-8");
  const json = JSON.parse(data);
  const brands: Brand[] = json.brands || json;
  return brands;
}

export const load: PageServerLoad = async ({ params }) => {
  const brands = await loadBrands();
  const brand = brands.find((b) => b.id === params.slug);

  return {
    brand: brand || null,
  };
};
