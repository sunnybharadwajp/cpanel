<script>
    export let data;
    const projects = data.projects;
</script>

<a href="/data/projects/create">Create a new Project</a>

<h1>Projects</h1>

{#each projects as project}
    <div class="article">
        <h2>{project.title}</h2>
        <a href="/data/projects/{project.slug}">View</a>
    </div>
{/each}