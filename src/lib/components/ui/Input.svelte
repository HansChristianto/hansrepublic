<script lang="ts">
  interface Props {
    type?: string;
    value?: string;
    placeholder?: string;
    oninput?: (e: Event) => void;
    class?: string;
  }

  let {
    type = "text",
    value = $bindable(""),
    placeholder = "",
    oninput,
    class: className = "",
  }: Props = $props();
</script>

<input
  {type}
  bind:value
  {placeholder}
  {oninput}
  class="flex h-12 w-full border-b border-gray-300 bg-transparent px-4 py-2 text-base text-gray-900 placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-0 transition-colors disabled:cursor-not-allowed disabled:opacity-50 {className}"
/>
