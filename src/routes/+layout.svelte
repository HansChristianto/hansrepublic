<script lang="ts">
  import Footer from "$lib/components/layout/Footer.svelte";
  import Header from "$lib/components/layout/Header.svelte";
  import "../app.css";

  let { children } = $props();
</script>

<svelte:head>
  <title>Hans Republic</title>
  <meta
    name="description"
    content="Premium Digital Solutions - Hans Republic Corporate Portfolio"
  />
</svelte:head>

<div class="min-h-screen flex flex-col">
  <Header />
  <main class="flex-1">
    {@render children()}
  </main>
  <Footer />
</div>
