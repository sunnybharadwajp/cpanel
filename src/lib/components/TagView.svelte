<script lang="ts">
   import { articleTagStore, refreshArticleTags } from '$lib/stores/TagStore'
   import { onMount } from 'svelte'

   let tagInputValue = ''

   let articleTags = $articleTagStore
   $: articleTags = $articleTagStore
   const createTag = async (e: any) => {
      e.preventDefault()
      try {
         let response = await fetch('/api/articles/tags', {
            method: 'POST',
            body: JSON.stringify({ title: tagInputValue })
         })
         let responseObj = await response.json()
         refreshArticleTags()
         tagInputValue = ''
         console.log(responseObj)
      } catch (error) {
         console.log(error)
      }
   }

   const deleteTag = async (tagId: any) => {
      try {
         let response = await fetch('/api/articles/tags', {
            method: 'DELETE',
            body: JSON.stringify({ _id: tagId })
         })
         let responseObj = await response.json()
         refreshArticleTags()
         console.log(responseObj)
      } catch (error) {
         console.log(error)
      }
   }

   onMount(async () => {
      await refreshArticleTags()
   })
</script>

<h3 class="text-xl font-semibold mb-3">Manage Tags</h3>

<form on:submit={createTag} class="flex">
   <input type="text" name="tag" bind:value={tagInputValue} />
   <button
      type="submit"
      class="inline-block whitespace-nowrap button small rounded-none"
      >Create Tag</button
   >
</form>

<div class="tag-list">
   {#each articleTags as tag}
      <div class="mt-2">
         {tag.title} -
         <button
            class="clickable"
            on:click={() => deleteTag(tag._id)}
            role="button">Delete</button
         >
      </div>
   {/each}
</div>

<style>
   .clickable {
      cursor: pointer;
      text-decoration: underline;
   }
</style>
