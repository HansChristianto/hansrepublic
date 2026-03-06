<script lang="ts">
  interface Props {
    variant?: "default" | "secondary" | "outline";
    class?: string;
    children?: any;
  }

  let {
    variant = "default",
    class: className = "",
    children,
  }: Props = $props();

  const variantClasses = {
    default: "bg-gray-100 text-gray-700",
    secondary: "bg-gray-200 text-gray-600",
    outline: "border border-gray-300 text-gray-600",
  };
</script>

<span
  class="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors {variantClasses[
    variant
  ]} {className}"
>
  {#if children}
    {@render children()}
  {/if}
</span>
