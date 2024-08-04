<script lang="ts">
    import { marked } from "marked";
    import {onMount} from "svelte";
    let previewHTML:any;

    export let data;
    const article = data.article;

    const updatePreview = async (content: string) => {
        const renderer = new marked.Renderer();
        console.log(article);

        renderer.heading = (data) => {
            const text = data.text;
            const level = data.depth;
            const id = String(text.toLowerCase().replace(/[^\w]+/g, '-'));
            return `<h${level} id="${id}">${text}</h${level}>`;
        };

        marked.setOptions({
            renderer: renderer,
        });

        // Run marked
        previewHTML = marked(content);
    }


    onMount(async () => {
        updatePreview(article.content);
    })
</script>

{@html previewHTML}