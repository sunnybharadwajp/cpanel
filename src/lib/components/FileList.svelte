<script lang="ts">
    import type {File, FileInterface} from "$db/models/File";
    import { Trash2, FileCog  } from 'lucide-svelte';
    import { filesStore } from "$lib/stores/FileStore";
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    import {onMount} from "svelte";
    let files: FileInterface[] = [];
    $: files = $filesStore;

    onMount(async () => {
        await updateFileList();
    });

    const updateFileList = async() => {
        let response = await fetch('/api/files');
        let responseObj = await response.json();
        filesStore.set(responseObj.body.response)
    }



    const deleteFile = async (file: any) => {
        try {
            const response = await fetch(`/api/files?url=${file.url}`, { method: 'DELETE'});
            const payload = await response.json();
            dispatch('fileUploaded');
            // console.log(payload);
        } catch (err) {
            console.log(err);
        }
    }
</script>

<div class="file-list">
    <div class="file-grid">
        {#each files as file}
            <div class="file-grid-cell file-name">
                <a href="{file.url}" target="_blank">{file.title}</a>
            </div>
            <div class="file-grid-cell file-size text-center">
                <div>{file.size}</div>
            </div>

            <div class="file-grid-cell file-actions">
<!--                <div class="button" on:click={retrieveFile}><FileCog size="18"/></div>-->

                <button class="button" on:click={() => deleteFile(file)} aria-label="Delete file"><Trash2 size="18"/></button>
            </div>
        {/each}
    </div>
</div>

<style>
    .file-list {
        padding: 1rem;
    }

    .file-grid {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr;
        grid-row-gap: 0.6rem;
    }

    .file-actions {
        display: flex;
        justify-content: center;
    }

    .file-actions .button {
        margin: 0 0.2rem;
    }



</style>


