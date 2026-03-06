<script lang="ts">
  interface Props {
    class?: string
    children?: any
  }

  let { class: className = '', children }: Props = $props()
</script>

<section class="section-padding {className}">
  {#if children}
    {@render children()}
  {/if}
</section>
