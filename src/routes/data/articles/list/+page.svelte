<script lang="ts">
    import {articleStore, deleteArticle} from "$lib/stores/ArticleStore";
    import type {Article} from "$lib/types";
    import {goto} from "$app/navigation";


    export let data;


    let records:Article[];
    $: records = $articleStore;
    let reset = {};

    let deleteRecord = async (record: Article) => {
        try {
            let response = await fetch(`/data/articles/api?id=${record._id}`, { method: 'DELETE'})
            let payload = await response.json();
            deleteArticle(String(record._id));
            console.log(payload.body.message);
        }
        catch (e) {
            console.log("error", e);
        }

    }

</script>

<div class="list" >
    <a href="/data/articles/create">Create new Article</a>

    {#if records.length < 1}
        <p>No articles yet</p>
    {:else}

        {#each records as record}
            <p>
                <strong>{record.title}</strong>

                <span class="clickable" ><a href="/">View</a></span>
                <span class="clickable" ><a href="/">Edit</a></span>
                <span class="clickable" on:click={() => deleteRecord(record)}><a href="">Delete</a></span>
            </p>
        {/each}
    {/if}

</div>