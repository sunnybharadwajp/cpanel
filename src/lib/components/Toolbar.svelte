<script lang="ts">
    import { FileImage, Tag, ChartColumnStacked, PanelRightClose, PanelLeftClose   } from 'lucide-svelte';
    import FileUploader from "$lib/components/FileUploader.svelte";
    import FileList from "$lib/components/FileList.svelte";
    import TagView from './TagView.svelte';
    import CategoryView from './CategoryView.svelte';
    import { writable } from 'svelte/store';

    // import {globalActions} from "$lib/stores/global_actions";
    import {onMount} from "svelte";
    import {filesStore} from "$lib/stores/FileStore";

    import { articleTagStore, refreshArticleTags } from '$lib/stores/TagStore';

    onMount(async () => {
        await updateFileList();
    });

    let sidebarActive = writable(true);
    let currentView = writable("files");

    
    let categoryInputValue = "";

    const updateFileList = async() => {
        let response = await fetch('/api/files');
        let responseObj = await response.json();
        filesStore.set(responseObj.body.response);
        console.log("files updated");
    }

    const toggleSidebar = () => {
        sidebarActive.set(!$sidebarActive);
    }

    const manageFiles = () => {
        if(!$sidebarActive) {
            toggleSidebar();
        }
        currentView.set("files");
    }

    const manageTags = () => {
        if(!$sidebarActive) {
            toggleSidebar();
        }
        currentView.set("tags");
        console.log("manage tags");
    }

    const manageCategories = () => {
        if(!$sidebarActive) {
            toggleSidebar();
        }
        currentView.set("categories");
        console.log("manage categories");
    }


</script>

<div class="tool-bar">
    <div class="tool-btn"  on:click={manageFiles}>
        <FileImage color={($currentView === 'files' && $sidebarActive) ? 'red' : 'white'} size="18"/>
    </div>
    <div class="tool-btn"  on:click={manageTags}>
        <Tag color={($currentView === 'tags' && $sidebarActive) ? 'red' : 'white'} size="18"/>
    </div>
    <div class="tool-btn"  on:click={manageCategories}>
        <ChartColumnStacked color={($currentView === 'categories' && $sidebarActive) ? 'red' : 'white'}  size="18"/>
    </div>

    {#if $sidebarActive}
    <div class="tool-btn" on:click={toggleSidebar}>
        <PanelRightClose size="18" />
    </div>
        
    {:else}
    <div class="tool-btn" on:click={toggleSidebar}>
        <PanelLeftClose size="18" />
    </div>
    {/if}

</div>


<div class="side-bar" class:active={$sidebarActive}>
    <div class="side-bar-content">
        {#if $sidebarActive}
            {#if $currentView == "files"}
                <div class="sidebar-view files">
                    <h3>Manage Files</h3>
                    <div class="file-browser">
                        <FileList on:fileUploaded={updateFileList}/>
                    </div>
                
                    <div class="file-uploader">
                        <FileUploader on:fileUploaded={updateFileList}/>
                    </div>
                </div>
            {/if}
            {#if $currentView == "tags"}
                <div class="sidebar-view tags">
                    <TagView />
                </div>
            {/if}
            {#if $currentView == "categories"}
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
        width: 40px;
        background: #e4e4e4;
        z-index: 1000;
    }

    .side-bar {
        position: fixed;
        right: 0;
        top: 0;
        display: none;
        height: 100vh;
        width: 0;
        padding-right: 40px;
        background: #e4e4e4;
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
        background: #e4e4e4;
        padding: 0.7rem 50px 0.7rem 0.7rem;
    }

    .tool-btn {
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .tool-btn:hover {
        cursor: pointer;
        background: #bfbfbf;
    }

    .tool-btn.active {
        background: #2c2c2c;
        color: white;
    }
</style>