import brandsData from "$lib/data/brands.json";
import type { Brand } from "$lib/types";
import type { PageServerLoad } from "./$types";

async function loadBrands(): Promise<Brand[]> {
  try {
    const brands = brandsData.brands || brandsData;
    return brands as Brand[];
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
