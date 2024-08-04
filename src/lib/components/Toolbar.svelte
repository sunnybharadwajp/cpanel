<script lang="ts">
   import {
      FileImage,
      Tag,
      ChartColumnStacked,
      PanelRightClose,
      PanelLeftClose
   } from 'lucide-svelte'
   import FileUploader from '$lib/components/FileUploader.svelte'
   import FileList from '$lib/components/FileList.svelte'
   import TagView from './TagView.svelte'
   import CategoryView from './CategoryView.svelte'
   import { writable } from 'svelte/store'

   // import {globalActions} from "$lib/stores/global_actions";
   import { onMount } from 'svelte'
   import { filesStore } from '$lib/stores/FileStore'

   import { articleTagStore, refreshArticleTags } from '$lib/stores/TagStore'

   onMount(async () => {
      await updateFileList()
   })

   let sidebarActive = writable(false)
   let currentView = writable('files')

   let categoryInputValue = ''

   const updateFileList = async () => {
      let response = await fetch('/api/files')
      let responseObj = await response.json()
      filesStore.set(responseObj.body.response)
      console.log('files updated')
   }

   const toggleSidebar = () => {
      sidebarActive.set(!$sidebarActive)
   }

   const manageFiles = () => {
      if (!$sidebarActive) {
         toggleSidebar()
      }
      currentView.set('files')
   }

   const manageTags = () => {
      if (!$sidebarActive) {
         toggleSidebar()
      }
      currentView.set('tags')
      console.log('manage tags')
   }

   const manageCategories = () => {
      if (!$sidebarActive) {
         toggleSidebar()
      }
      currentView.set('categories')
      console.log('manage categories')
   }
</script>

<div class="tool-bar">
   <button
      class="tool-btn"
      class:active={$currentView === 'files' && $sidebarActive}
      on:click={manageFiles}
      type="button"
   >
      <FileImage size="18" />
   </button>
   <button
      class="tool-btn"
      class:active={$currentView === 'tags' && $sidebarActive}
      on:click={manageTags}
      type="button"
   >
      <Tag size="18" />
   </button>
   <button
      class="tool-btn"
      class:active={$currentView === 'categories' && $sidebarActive}
      on:click={manageCategories}
      type="button"
   >
      <ChartColumnStacked size="18" />
   </button>

   {#if $sidebarActive}
      <button
         class="tool-btn"
         on:click={toggleSidebar}
         type="button"
         aria-label="Toggle Sidebar"
      >
         <PanelRightClose size="18" />
      </button>
   {:else}
      <button
         class="tool-btn"
         on:click={toggleSidebar}
         type="button"
         aria-label="Toggle Sidebar"
      >
         <PanelLeftClose size="18" />
      </button>
   {/if}
</div>

<div class="side-bar" class:active={$sidebarActive}>
   <div class="side-bar-content">
      {#if $sidebarActive}
         {#if $currentView == 'files'}
            <div class="sidebar-view files">
               <h3>Manage Files</h3>
               <div class="file-browser">
                  <FileList on:fileUploaded={updateFileList} />
               </div>

               <div class="file-uploader">
                  <FileUploader on:fileUploaded={updateFileList} />
               </div>
            </div>
         {/if}
         {#if $currentView == 'tags'}
            <div class="sidebar-view tags">
               <TagView />
            </div>
         {/if}
         {#if $currentView == 'categories'}
            <div class="sidebar-view categories">
               <CategoryView />
            </div>
         {/if}
      {/if}
   </div>
</div>

<style>
   .tool-bar {
      position: fixed;
      right: 0;
      top: 0;
      height: 100vh;
      width: var(--sidebar-width);

      background: var(--color-background);
      border-left: 2px solid #e4e4e421;
      z-index: 1000;
   }

   .side-bar {
      position: fixed;
      right: 0;
      top: 0;
      display: none;
      height: 100vh;
      width: 0;
      padding-right: var(--sidebar-width);
      background: var(--color-background-alt);
      z-index: 100;
   }

   .side-bar.active {
      display: block;
      width: 400px;
   }

   .sidebar-view {
      padding: 1rem;
   }

   .file-uploader {
      position: fixed;
      right: 0;
      bottom: 0;
      width: 400px;
      background: #e4e4e421;
      padding: 0.9rem var(--sidebar-width) 0.9rem 0.9rem;
   }

   .tool-btn {
      width: var(--sidebar-width);
      height: var(--sidebar-width);
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0.5;
      transition: all 0.1s ease-in-out;
   }

   .tool-btn:hover {
      cursor: pointer;
      background: var(--color-background-alt);
      opacity: 1;
   }

   .tool-btn.active {
      background: var(--color-background-alt);
      color: white;
      opacity: 1;
   }
</style>
