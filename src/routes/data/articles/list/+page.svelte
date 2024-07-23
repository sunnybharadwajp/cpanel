<script lang="ts">
    import {articleStore, deleteArticle} from "$lib/stores/ArticleStore";
    import type {ArticleInterface} from "$db/models/Article";
    import {goto} from "$app/navigation";
    import {getDayTime} from "$lib/utilities";


    export let data;


    let records:ArticleInterface[];
    $: records = $articleStore;
    let reset = {};

    let deleteRecord = async (record: ArticleInterface) => {
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

    <div class="spacer-small"></div>

    {#if records.length < 1}
        <p>No articles yet</p>
    {:else}

        <div class="item-grid">
            {#each records as record}
                <div class="grid-cell">{getDayTime(new Date(record.datetime.createdAt)).day}</div>

                <div class="grid-cell time">{getDayTime(new Date(record.datetime.createdAt)).time}</div>

                <div class="grid-cell"><strong>{record.title}</strong></div>

                <div class="operations grid-cell">
                    <span class="clickable" ><a href="/data/articles/{record.slug}">View</a></span>
                    <span class="clickable" ><a href="/data/articles/edit?slug={record.slug}">Edit</a></span>
                    <span class="clickable" on:click={() => deleteRecord(record)}><a href="">Delete</a></span>
                </div>
            {/each}
        </div>
    {/if}

</div>

<style>
    .item-grid {
        display: grid;
        width: 650px;
        grid-template-columns: 1fr 1fr 4fr 2fr;
    }

    .grid-cell {
        padding: 0.4rem 0.7rem;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    .grid-cell.time {
        text-align: center;
    }

    .grid-cell.operations {
        text-align: right;
    }

    .item-grid > div:nth-child(8n+1),
    .item-grid > div:nth-child(8n+2),
    .item-grid > div:nth-child(8n+3),
    .item-grid > div:nth-child(8n+4) {
        background: #e6e6e6;
    }


</style>