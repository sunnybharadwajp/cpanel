<script lang="ts">
    import { goto } from "$app/navigation";
    // import { addArticle } from '$lib/stores/ArticleStore';
    import {
        Article,
        ArticleCategory,
        type ArticleRequest,
    } from '$db/models/Article';
    import {afterUpdate, onDestroy} from "svelte";

    let article = new Article();
    let categories = Object.keys(ArticleCategory);


    const handleSubmit = async () => {
        //slugify
        article.slug = "";
        //markdown
        article.content = "";

        const newArticle: ArticleRequest = article;




        const response = await fetch('/data/articles/api', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newArticle),
        });
        if (response.ok) {
            const data = await response.json();
            // addArticle(data.article);
            goto('/data/articles/list');
        }
    };

    const handleSave = async() => {

    }




    onDestroy(() => {
        //save record
    })
</script>

<form on:submit|preventDefault={handleSubmit}>
    <div class="field">
        <label for="title">Title</label>
        <input id="title" name="title" type="text" bind:value={article.title}>
    </div>


    <div class="field">
        <label for="summary">Summary</label>
        <textarea id="summary" name="summary" bind:value={article.summary}></textarea>
    </div>

    <div class="field">
        <textarea bind:value={article.content} placeholder="Content" required></textarea>
    </div>
    <div class="field">
        <select bind:value={article.category}>
            {#each categories as category}
                <option value="{category}">{category}</option>
            {/each}
        </select>
    </div>
    <div class="field">
        <input bind:value={article.coverImageUrl} placeholder="Image URL" />
    </div>
    <div class="field">

    </div>
    <div class="field">
        <button type="submit">Add Article</button>
    </div>
</form>