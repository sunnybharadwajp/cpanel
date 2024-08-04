<script lang="ts">
    import { goto } from "$app/navigation";
    import { marked } from "marked";
    import { slugify } from "$lib/utilities";

    import {articleTagStore, refreshArticleTags} from '$lib/stores/TagStore';
    import {articleCategoryStore, refreshArticleCategories} from '$lib/stores/CategoryStore';

    // import { addArticle } from '$lib/stores/ArticleStore';
    import {
        Article,
        ArticleCategory,
        type ArticleRequest, ArticleState,
    } from '$db/models/Article';
    import {onMount, onDestroy} from "svelte";

    let article = new Article();
    let categories = Object.keys(ArticleCategory);
    let states = Object.keys(ArticleState);

    let submitButtonDisabled: boolean = false;


    let published = "No";
    let highlighted = "No";
    let previewHTML = "";
    let formValid = false;

    let tagInputValue = "";
    let selectedTags:any = [];

    const toggleTag = (tag: any) => {
        if (selectedTags.includes(tag)) {
            selectedTags = selectedTags.filter((t: any) => t !== tag);
        } else {
            selectedTags = [...selectedTags, tag];
        }
    }


    const handleSubmit = async () => {
        //slugify
        article.slug = slugify(article.title);
        article.tags = selectedTags;
        article.published = published === "Yes";
        article.highlighted = highlighted === "Yes";

        console.log(article);

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
                await goto('/data/articles/list');
            }
        }

    };

    //TODO: Save record and auto save after timeout
    const handleSave = async() => {

    }

    const updatePreview = async () => {
        previewHTML = await marked.parse(article.content);
    }

    onMount(async () => {
        await refreshArticleTags();
        await refreshArticleCategories();
    });

    onDestroy(() => {
        //save record
    })


</script>

<form>
    <div class="form-grid">
        <div class="left">
            <div class="title-bar">
                <h3>Create a new Article</h3>
                <div class="button-group">
                    <button on:click={handleSave} disabled>Save</button>
                    <button  disabled="{submitButtonDisabled}" type="submit" on:click|preventDefault={handleSubmit}>Add Article</button>
                </div>
            </div>
            <div class="spacer-small"></div>
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
                    {#each $articleCategoryStore as category}
                        <option value="{category.title}">{category.title}</option>
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

            
                
                <div class="existing-tags">
                    {#each $articleTagStore as tag}
                        <button 
                            on:click="{() => {toggleTag(tag)}}" 
                            class={`inline-block hover:cursor-pointer mr-4`} 
                            class:text-emerald-600={selectedTags.includes(tag)}
                            class:font-semibold={selectedTags.includes(tag)}
                            role="button">
                            {tag.title}
                        </button>
                    {/each}
                </div>
            </div>

            <div class="field">
                <label for="image-url">Cover Image URL</label>
                <input id="image-url" name="image-url" bind:value={article.coverImageUrl} type="url" placeholder="Image URL">
            </div>
            <div class="field">
                <label for="published">Published?</label>
                <input type="radio" id="published" name="published" bind:group={published} value="Yes"><span>Yes</span>
                <input type="radio" id="published" name="published" bind:group={published} value="No" checked><span>No</span>
            </div>

            <div class="field">
                <label for="highlighted">Highlighted?</label>
                <input type="radio" id="highlighted" name="highlighted" bind:group={highlighted} value="Yes"><span>Yes</span>
                <input type="radio" id="highlighted" name="highlighted" bind:group={highlighted} value="No" checked><span>No</span>
            </div>

            <div class="field">
                <label for="" class="label">Float (0 - 0.99)</label>
                <input type="number" name="float" step="0.01" max="0.99" min="0" class="input" bind:value={article.float} required/>
            </div>
            <div class="field">

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

</style>