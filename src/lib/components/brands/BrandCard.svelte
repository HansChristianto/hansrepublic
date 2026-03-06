<script lang="ts">
  import Badge from "$lib/components/ui/Badge.svelte";
  import Button from "$lib/components/ui/Button.svelte";
  import type { Brand } from "$lib/types";
  import { SERVICE_CATEGORY_LABELS } from "$lib/types";

  interface Props {
    brand: Brand;
  }

  let { brand }: Props = $props();
</script>

<a href="/brands/{brand.id}" class="block">
  <div
    class="bg-white rounded-lg border border-border-light overflow-hidden card-hover cursor-pointer h-full"
  >
    <div
      class="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center"
    >
      <span class="text-4xl font-bold text-gray-300"
        >{brand.name.charAt(0)}</span
      >
    </div>

    <div class="p-6">
      <h3 class="text-xl font-bold text-gray-900 mb-2">{brand.name}</h3>
      {#if brand.tagline}
        <p class="text-sm text-gray-500 mb-4">{brand.tagline}</p>
      {/if}

      <div class="flex flex-wrap gap-2 mb-4">
        {#each brand.services as service}
          <Badge variant="secondary">{SERVICE_CATEGORY_LABELS[service]}</Badge>
        {/each}
      </div>

      {#if brand.websiteUrl}
        <Button variant="plain" size="sm" class="pl-0">Visit Website →</Button>
      {/if}
    </div>
  </div>
</a>
