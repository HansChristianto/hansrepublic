<script lang="ts">
  import Section from "$lib/components/layout/Section.svelte";
  import Badge from "$lib/components/ui/Badge.svelte";
  import Button from "$lib/components/ui/Button.svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  function getStatusColor(status: string): string {
    switch (status) {
      case "online":
        return "bg-status-online";
      case "offline":
        return "bg-status-offline";
      default:
        return "bg-status-unknown";
    }
  }

  function getStatusLabel(status: string): string {
    switch (status) {
      case "online":
        return "Online";
      case "offline":
        return "Offline";
      default:
        return "Unknown";
    }
  }

  function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleString();
  }
</script>

<svelte:head>
  <title>Monitoring Dashboard - Hans Republic</title>
</svelte:head>

<Section>
  <div class="container-narrow">
    <div
      class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8"
    >
      <div>
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Monitoring Dashboard
        </h1>
        <p class="text-gray-600">
          Last updated: {formatDate(data.lastUpdated)}
        </p>
      </div>
      <Button href="/monitoring" variant="secondary">
        <svg
          class="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        Refresh
      </Button>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div class="bg-gray-50 rounded-lg p-6">
        <div class="text-3xl font-bold text-gray-900 mb-1">
          {data.summary.total}
        </div>
        <div class="text-sm text-gray-600">Total Properties</div>
      </div>
      <div class="bg-gray-50 rounded-lg p-6">
        <div class="flex items-center gap-2 mb-1">
          <span class="w-2 h-2 rounded-full bg-status-online"></span>
          <span class="text-3xl font-bold text-gray-900"
            >{data.summary.online}</span
          >
        </div>
        <div class="text-sm text-gray-600">Online</div>
      </div>
      <div class="bg-gray-50 rounded-lg p-6">
        <div class="flex items-center gap-2 mb-1">
          <span class="w-2 h-2 rounded-full bg-status-offline"></span>
          <span class="text-3xl font-bold text-gray-900"
            >{data.summary.offline}</span
          >
        </div>
        <div class="text-sm text-gray-600">Offline</div>
      </div>
      <div class="bg-gray-50 rounded-lg p-6">
        <div class="flex items-center gap-2 mb-1">
          <span class="w-2 h-2 rounded-full bg-status-unknown"></span>
          <span class="text-3xl font-bold text-gray-900"
            >{data.summary.unknown}</span
          >
        </div>
        <div class="text-sm text-gray-600">Unknown</div>
      </div>
    </div>

    <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="bg-gray-50 border-b border-gray-200">
              <th
                class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3"
                >Property</th
              >
              <th
                class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3"
                >Type</th
              >
              <th
                class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3"
                >Brand</th
              >
              <th
                class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3"
                >Status</th
              >
              <th
                class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3"
                >Last Checked</th
              >
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            {#each data.properties as property}
              <tr class="hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4">
                  <div class="flex flex-col">
                    <a
                      href={property.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-sm font-medium text-gray-900 hover:text-primary transition-colors"
                    >
                      {property.name}
                    </a>
                    <span class="text-xs text-gray-500">{property.url}</span>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <Badge>{property.type}</Badge>
                </td>
                <td class="px-6 py-4 text-sm text-gray-600">
                  {property.brandId}
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center gap-2">
                    <span
                      class="w-2 h-2 rounded-full {getStatusColor(
                        property.status,
                      )}"
                    ></span>
                    <span class="text-sm text-gray-600"
                      >{getStatusLabel(property.status)}</span
                    >
                  </div>
                </td>
                <td class="px-6 py-4 text-sm text-gray-600">
                  {formatDate(property.lastChecked)}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>

      {#if data.properties.length === 0}
        <div class="text-center py-12">
          <p class="text-gray-500">No properties to display.</p>
        </div>
      {/if}
    </div>
  </div>
</Section>
