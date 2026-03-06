<script lang="ts">
  import BrandCard from "$lib/components/brands/BrandCard.svelte";
  import Section from "$lib/components/layout/Section.svelte";
  import Button from "$lib/components/ui/Button.svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<Section
  class="min-h-[90vh] flex items-center justify-center text-center relative overflow-hidden"
>
  <div
    class="absolute inset-0 bg-gradient-to-b from-gray-50 to-white -z-10"
  ></div>
  <div class="container-narrow">
    <h1 class="text-fluid-hero text-gray-900 mb-6 animate-fade-in-up">
      Premium Digital
      <br />
      Solutions
    </h1>
    <p
      class="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in-up animate-stagger-1"
    >
      We build exceptional digital experiences through our portfolio of
      specialized brands.
    </p>
    <div
      class="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animate-stagger-2"
    >
      <Button href="/brands" size="lg">Explore Our Brands</Button>
      <Button href="/monitoring" variant="secondary" size="lg"
        >View Dashboard</Button
      >
    </div>
  </div>

  <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
    <svg
      class="w-6 h-6 text-gray-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M19 14l-7 7m0 0l-7-7m7 7V3"
      ></path>
    </svg>
  </div>
</Section>

<Section class="bg-gray-50">
  <div class="container-narrow">
    <div class="text-center mb-12">
      <h2 class="text-fluid-section text-gray-900 mb-4">Our Brands</h2>
      <p class="text-lg text-gray-600 max-w-2xl mx-auto">
        Meet the innovative companies that make up Hans Republic
      </p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each data.brands as brand, index}
        <div
          class="animate-fade-in-up"
          style="animation-delay: {index * 100}ms"
        >
          <BrandCard {brand} />
        </div>
      {/each}
    </div>
  </div>
</Section>

<Section>
  <div class="container-narrow">
    <div class="text-center mb-12">
      <h2 class="text-fluid-section text-gray-900 mb-4">What We Do</h2>
      <p class="text-lg text-gray-600 max-w-2xl mx-auto">
        Comprehensive digital services across multiple disciplines
      </p>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
      {#each data.services as service, index}
        <div
          class="text-center p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors animate-fade-in-up"
          style="animation-delay: {index * 100}ms"
        >
          <div
            class="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center"
          >
            <svg
              class="w-6 h-6 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
          </div>
          <h3 class="font-semibold text-gray-900">{service.label}</h3>
        </div>
      {/each}
    </div>
  </div>
</Section>

<Section class="bg-bg-secondary">
  <div class="container-narrow text-center">
    <h2 class="text-fluid-section text-gray-900 mb-4">Ready to Get Started?</h2>
    <p class="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
      Explore our brands to find the perfect digital solution for your business
      needs.
    </p>
    <Button href="/brands" size="lg">View All Brands</Button>
  </div>
</Section>
