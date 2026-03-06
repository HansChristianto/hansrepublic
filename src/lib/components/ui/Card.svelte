<script lang="ts">
  interface Props {
    hover?: boolean;
    class?: string;
    children?: any;
  }

  let { hover = false, class: className = "", children }: Props = $props();
</script>

<div
  class="bg-white rounded-lg border border-border-light overflow-hidden {hover
    ? 'card-hover cursor-pointer'
    : ''} {className}"
>
  {#if children}
    {@render children()}
  {/if}
</div>
