<script lang="ts">
  import Section from "$lib/components/layout/Section.svelte";
  import Badge from "$lib/components/ui/Badge.svelte";
  import Button from "$lib/components/ui/Button.svelte";
  import { SERVICE_CATEGORY_LABELS, type ServiceCategory } from "$lib/types";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>{data.brand?.name || "Brand"} - Hans Republic</title>
</svelte:head>

{#if data.brand}
  <Section class="!py-0">
    <div class="relative h-[60vh] min-h-[400px] overflow-hidden">
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"
      ></div>
      {#if data.brand.imageUrl}
        <img
          src={data.brand.imageUrl}
          alt={data.brand.name}
          class="w-full h-full object-cover"
        />
      {:else}
        <div
          class="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900"
        ></div>
      {/if}
      <div class="absolute bottom-0 left-0 right-0 z-20 p-8 md:p-16">
        <div class="container-narrow">
          <h1
            class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
          >
            {data.brand.name}
          </h1>
          {#if data.brand.tagline}
            <p class="text-xl md:text-2xl text-white/80">
              {data.brand.tagline}
            </p>
          {/if}
        </div>
      </div>
    </div>
  </Section>

  <Section>
    <div class="container-narrow">
      <div class="max-w-3xl">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">About</h2>
        <p class="text-lg text-gray-600 leading-relaxed mb-8">
          {data.brand.description}
        </p>

        <h2 class="text-2xl font-semibold text-gray-900 mb-4">Services</h2>
        <div class="flex flex-wrap gap-2 mb-8">
          {#each data.brand.services as service}
            <Badge>{SERVICE_CATEGORY_LABELS[service as ServiceCategory]}</Badge>
          {/each}
        </div>

        {#if data.brand.websiteUrl}
          <Button href={data.brand.websiteUrl} size="lg">Visit Website</Button>
        {/if}
      </div>
    </div>
  </Section>
{:else}
  <Section>
    <div class="container-narrow text-center py-12">
      <h1 class="text-2xl font-semibold text-gray-900 mb-4">Brand Not Found</h1>
      <p class="text-gray-600 mb-8">
        The brand you're looking for doesn't exist.
      </p>
      <Button href="/brands">View All Brands</Button>
    </div>
  </Section>
{/if}
