<script lang="ts">
    import { goto } from "$app/navigation";
    // import { addArticle } from '$lib/stores/ArticleStore';
    import type { Article } from '$lib/types';

    let title = '';
    let content = '';
    let type = 'blogpost';
    let imageUrl = '';

    const handleSubmit = async () => {
        const newArticle: Article = { title, content, type, imageUrl };
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
</script>

<form on:submit|preventDefault={handleSubmit}>

    <div class="field">
        <input bind:value={title} placeholder="Title" required />
    </div>
    <div class="field">
        <textarea bind:value={content} placeholder="Content" required></textarea>
    </div>
    <div class="field">
        <select bind:value={type}>
            <option value="blogpost">Blogpost</option>
            <option value="project">Project</option>
            <option value="case study">Case Study</option>
        </select>
    </div>
    <div class="field">
        <input bind:value={imageUrl} placeholder="Image URL" />
    </div>
    <div class="field">

    </div>
    <div class="field">
        <button type="submit">Add Article</button>
    </div>

</form>