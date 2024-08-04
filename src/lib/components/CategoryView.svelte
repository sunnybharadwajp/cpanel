<script lang="ts">
  import { articleCategoryStore, refreshArticleCategories } from '$lib/stores/CategoryStore';
	import { onMount } from 'svelte';

  let categoryInputValue = "";
  
  let articleCategories = $articleCategoryStore;
  $: articleCategories = $articleCategoryStore;
  const createCategory = async (e: any) => {
      e.preventDefault();
      try {
          let response = await fetch('/api/articles/categories', {
              method: 'POST',
              body: JSON.stringify({ title: categoryInputValue }),
          });
          let responseObj = await response.json();
          refreshArticleCategories();
          categoryInputValue = "";
          console.log(responseObj);
      } catch (error) {
          console.log(error);
      }
      
  }

  const deleteCategory = async (categoryId: any) => {
    try {
          let response = await fetch('/api/articles/categories', {
              method: 'DELETE',
              body: JSON.stringify({ _id: categoryId}),
          });
          let responseObj = await response.json();
          refreshArticleCategories();
          console.log(responseObj);
      } catch (error) {
          console.log(error);
      }
  }
  
  onMount(async () => {
      await refreshArticleCategories();
  });
</script>

<h3 class="text-xl font-semibold mb-3">Manage Categories</h3>

<form on:submit={createCategory} class="flex">
  <input type="text" name="category" bind:value={categoryInputValue}>
  <button type="submit" class="inline-block whitespace-nowrap px-3 py-1 bg-white">Create Category</button>
</form>

<div class="category-list">
  {#each articleCategories as category}
      <div class="mt-2">{category.title} - <span class="clickable" on:click={() => deleteCategory(category._id)}>Delete</span></div>

  {/each}
</div>

<style>
  .clickable {
    cursor: pointer;
    text-decoration: underline;
  }
</style>