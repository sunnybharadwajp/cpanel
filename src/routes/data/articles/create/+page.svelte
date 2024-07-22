<script lang="ts">
    import { goto } from "$app/navigation";
    import { marked } from "marked";
    import { slugify } from "$lib/utilities";

    // import { addArticle } from '$lib/stores/ArticleStore';
    import {
        Article,
        ArticleCategory,
        type ArticleRequest, ArticleState,
    } from '$db/models/Article';
    import {afterUpdate, onDestroy} from "svelte";

    let article = new Article();
    let categories = Object.keys(ArticleCategory);
    let states = Object.keys(ArticleState)

    let published = "";
    let highlighted = "";
    let previewHTML = "";
    let formValid = false;

    const addTag = (event: any) => {
        event.preventDefault();
        if(event.key === ',') {
            let tag = event.target.value;

            article.tags = [tag.substring(0,tag.length-1).trim(), ...article.tags];
            event.target.value = "";
        }
    }

    function deleteTag(tag: any) {
        article.tags = article.tags.filter((val) => val !== tag)
    }


    const handleSubmit = async () => {
        //slugify
        article.slug = slugify(article.title);


        article.published = published === "Yes";
        article.highlighted = highlighted === "Yes";

        const newArticle: ArticleRequest = article;

        formValid = true;

        if (formValid) {
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
        }

    };

    const handleSave = async() => {

    }

    const updatePreview = async () => {
        previewHTML = await marked.parse(article.content);
    }

    onDestroy(() => {
        //save record
    })
</script>

<form>
    <div class="form-grid">
        <div class="left">
            <div class="field">
                <label for="title">Title</label>
                <input id="title" name="title" type="text" bind:value={article.title}>
            </div>


            <div class="field">
                <label for="summary">Summary</label>
                <textarea id="summary" name="summary" bind:value={article.summary}></textarea>
            </div>
            <div class="field">
                <label for="category">Category</label>
                <select id="category" name="category" bind:value={article.category}>
                    {#each categories as category}
                        <option value="{category}">{category}</option>
                    {/each}
                </select>
            </div>

            <div class="field">
                <label for="state">State</label>
                <select id="state" name="state" bind:value={article.state}>
                    {#each states as state}
                        <option value="{state}">{state}</option>
                    {/each}
                </select>
            </div>

            <div class="field">
                <label for="add-tag">Tags</label>

                <input type="text" on:keyup={(event) => addTag(event)}>
                <div class="existing-tags">
                    {#each article.tags as tag}
                        <span class="tag">{tag}</span>
                        <span class="delete-tag" on:click={() => deleteTag(tag)}>x</span>
                    {/each}
                </div>
            </div>

            <div class="field">
                <label for="image-url">Cover Image URL</label>
                <input id="image-url" name="image-url" bind:value={article.coverImageUrl} type="url" placeholder="Image URL">
            </div>
            <div class="field">
                <label for="published">Published?</label>
                <input type="radio" id="published" name="published" bind:group={article.published} value="Yes"><span>Yes</span>
                <input type="radio" id="published" name="published" bind:group={article.published} value="No" checked><span>No</span>
            </div>

            <div class="field">
                <label for="highlighted">Highlighted?</label>
                <input type="radio" id="highlighted" name="highlighted" bind:group={article.highlighted} value="Yes"><span>Yes</span>
                <input type="radio" id="highlighted" name="highlighted" bind:group={article.highlighted} value="No" checked><span>No</span>
            </div>

            <div class="field">
                <label for="" class="label">Float (0 - 0.99)</label>
                <input type="number" name="float" step="0.01" max="0.99" min="0" class="input" bind:value={article.float} required/>
            </div>
            <div class="field">

            </div>
            <div class="field">
                <button type="submit" on:click|preventDefault={handleSubmit}>Add Article</button>
                <button on:click={updatePreview}>Update Preview</button>
            </div>
            <div class="preview">
                {#if previewHTML}
                    {@html previewHTML}
                    {previewHTML}
                {/if}
            </div>
        </div>
        <div class="right">
            <div class="field">

                <textarea id="content" name="content" bind:value={article.content} placeholder="Drafting..." required></textarea>
            </div>
        </div>
    </div>

</form>




<style>
    .form-grid {
        display: grid;
        grid-template-columns: 1fr 2fr;
    }

    .left, .right {
        padding: 2rem;
    }

    .right {
        padding: 2rem 2rem 2rem 0;
    }

    textarea[id="content"] {
        width: 100%;
        height: calc(100vh - 4rem);
        padding: 1rem;
    }
    .field {
        margin-bottom: 0.6rem;
    }

    label {
        display: block;
        font-weight: bold;
    }

    select {
        min-width: 140px;
    }

    input[type="text"], input[type="number"], input[type="url"], textarea {
        width: 100%;
    }

    input[type="radio"] {
        margin-right: 0.3rem;
    }
</style>