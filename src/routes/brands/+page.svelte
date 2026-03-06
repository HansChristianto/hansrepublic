<script lang="ts">
  import BrandCard from "$lib/components/brands/BrandCard.svelte";
  import Section from "$lib/components/layout/Section.svelte";
  import Input from "$lib/components/ui/Input.svelte";
  import type { Brand, ServiceCategory } from "$lib/types";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  let searchQuery = $state("");
  let selectedService = $state<string | null>(null);

  let filteredBrands = $derived(data.brands.filter((brand: Brand) => {
    const matchesSearch =
      brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      brand.tagline?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesService =
      !selectedService ||
      brand.services.includes(selectedService as ServiceCategory);
    return matchesSearch && matchesService;
  }));

  function handleSearch(e: Event) {
    const target = e.target as HTMLInputElement;
    searchQuery = target.value;
  }

  function handleServiceClick(serviceId: string) {
    selectedService = selectedService === serviceId ? null : serviceId;
  }
</script>

<svelte:head>
  <title>Brands - Hans Republic</title>
</svelte:head>

<Section>
  <div class="container-narrow">
    <h1 class="text-fluid-section text-gray-900 mb-8">Our Brands</h1>

    <div class="mb-8">
      <Input
        placeholder="Search brands..."
        value={searchQuery}
        oninput={handleSearch}
        class="max-w-md"
      />
    </div>

    <div class="flex flex-wrap gap-2 mb-8">
      {#each data.services as service}
        <button
          onclick={() => handleServiceClick(service.id)}
          class="px-4 py-2 rounded-full text-sm font-medium transition-colors {selectedService ===
          service.id
            ? 'bg-primary text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
        >
          {service.label}
        </button>
      {/each}
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each filteredBrands as brand}
        <BrandCard {brand} />
      {/each}
    </div>

    {#if filteredBrands.length === 0}
      <p class="text-center text-gray-500 py-12">
        No brands found matching your criteria.
      </p>
    {/if}
  </div>
</Section>
