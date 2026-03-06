<script lang="ts">
  interface Props {
    variant?: "primary" | "secondary" | "plain";
    size?: "sm" | "md" | "lg";
    href?: string;
    disabled?: boolean;
    onclick?: () => void;
    class?: string;
    children?: any;
  }

  let {
    variant = "primary",
    size = "md",
    href,
    disabled = false,
    onclick,
    class: className = "",
    children,
  }: Props = $props();

  const baseClasses =
    "inline-flex items-center justify-center whitespace-nowrap rounded-full font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  const variantClasses = {
    primary:
      "bg-primary text-white hover:bg-primary-hover hover:shadow-md active:scale-[0.98]",
    secondary:
      "bg-gray-100 text-gray-900 hover:bg-gray-200 active:scale-[0.98]",
    plain: "text-primary hover:text-primary-hover hover:underline",
  };

  const sizeClasses = {
    sm: "h-8 px-4 text-sm",
    md: "h-10 px-6 text-base",
    lg: "h-12 px-8 text-lg",
  };
</script>

{#if href}
  <a
    {href}
    class="{baseClasses} {variantClasses[variant]} {sizeClasses[
      size
    ]} {className}"
  >
    {#if children}
      {@render children()}
    {/if}
  </a>
{:else}
  <button
    {onclick}
    {disabled}
    class="{baseClasses} {variantClasses[variant]} {sizeClasses[
      size
    ]} {className}"
  >
    {#if children}
      {@render children()}
    {/if}
  </button>
{/if}
