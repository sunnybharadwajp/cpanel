<script lang="ts">
    import { goto } from "$app/navigation";
    import { slugify } from "$lib/utilities";
    import { Project, ProjectCategory, type ProjectRequest, ProjectState } from '$db/models/Project';
    import { Article } from '$db/models/Article';

    let project = new Project();
    let categories = Object.keys(ProjectCategory);

    let articleSearchText: string = "";

    let submitButtonDisabled: boolean = false;

    let articleSearchResults: Article[] = [];

    const handleSave = () => {
        console.log(project);
    }

    const handleSubmit = () => {
        //slugify
        project.slug = slugify(project.title);

        const newProject: ProjectRequest = project;

        console.log(newProject);
        if (submitButtonDisabled) {
            return;
        }

        submitButtonDisabled = true;

        const response = fetch('/api/projects', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProject),
        });

        response.then((res) => {
            if (res.ok) {
                goto('/data/projects');
            }
        });
    }

    const searchForArticle = async (searchText: string) => {
        // get articles by searchString
        const fetchArticles = await fetch(`/api/articles/search/${searchText}`);
        const response = await fetchArticles.json();
        articleSearchResults = response.data;
    }

    const selectMainArticle = (event: any, article: any) => {
        project.article = article;
        articleSearchResults = [article];
        document.querySelector('.result-item')?.classList.add('selected');
    }


</script>


<div class="form-wrapper">
    <h2>Create a new Project</h2>
    <form>
        <div class="field">
            <label for="title">Title</label>
            <input type="text" id="title" bind:value={project.title} />
        </div>
    
        <div class="field">
            <label for="category">Category</label>
            <select id="category" bind:value={project.category}>
                {#each categories as category}
                    <option value={category}>{category}</option>
                {/each}
            </select>
        </div>
    
        <div class="field">
            <label for="description">Description</label>
            <textarea id="description" bind:value={project.summary}></textarea>
        </div>

        <div class="field">
            <label for="title">Cover Image</label>
            <input type="URL" id="title" bind:value={project.coverImageUrl} />
        </div>
    
        <div class="field">
            <label for="state">State</label>
            <select id="state" bind:value={project.state}>
                {#each Object.keys(ProjectState) as state}
                    <option value={state}>{state}</option>
                {/each}
            </select>
        </div>
    
    <!--    add a search field to search through the article to choose as project.article -->
        <div class="field ">
            <label for="article">Article</label>
            <div class="article-input">
                <input type="text" id="article-search" bind:value={articleSearchText} />
                <button on:click={() => searchForArticle(articleSearchText)}>Search</button>
            </div>
            {#if articleSearchResults.length > 0}
                <ul class="search-results">
                    {#each articleSearchResults as article}
                        <li class="result-item" on:click="{(event) => selectMainArticle(event, article)}">{article.title}</li>
                    {/each}
                    <li class="result-item selected" hidden></li>

                </ul>
            {/if}

        </div>
    
        <div class="button-group">
            <button on:click={handleSave} disabled>Save</button>
            <button  disabled="{submitButtonDisabled}" type="submit" on:click|preventDefault={handleSubmit}>Add Article</button>
        </div>
    </form>
</div>

<style>
    .form-wrapper {
        max-width: 600px;
        
    }

    .article-input {
        display: flex;
        align-items: center;
    }

    .search-results {
        list-style: none;
        padding: 0;
    }

    .result-item {
        padding: 0.5rem;
        border: 1px solid #ccc;
        margin-top: 0.5rem;
    }

    .result-item.selected {
        background-color: #f0f0f0;
    }

    .result-item:hover {
        background-color: #f0f0f0;
        cursor: pointer;
    }
</style>