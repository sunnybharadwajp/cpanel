<script lang="ts">
   import '../app.css'
   import Toolbar from '$lib/components/Toolbar.svelte'
</script>

<div class="app">
   <Toolbar />
   <div class="page-content">
      <slot />
   </div>
</div>

<style>
   .app {
      position: relative;
   }
</style>
