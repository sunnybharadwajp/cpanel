<script lang="ts">
    import { marked } from "marked";
    import {onMount} from "svelte";
    let previewHTML = ""

    export let data;
    const article = data.article;

    onMount(async () => {
         previewHTML = await marked.parse(article.content);
    })
</script>

{@html previewHTML}