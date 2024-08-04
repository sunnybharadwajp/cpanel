<script lang="ts">
   import {
      Article,
      ArticleCategory,
      ArticleState,
      type ArticleInterface,
      type ArticleRequest
   } from '$db/models/Article'
   import { onMount, onDestroy } from 'svelte'
   import { goto } from '$app/navigation'
   let published: string, highlighted: string

   onMount(() => {
      published = article.published ? 'Yes' : 'No'
      highlighted = article.highlighted ? 'Yes' : 'No'
   })

   export let data
   let article: ArticleInterface = data.article
   let categories = Object.keys(ArticleCategory)
   let states = Object.keys(ArticleState)

   let submitButtonDisabled: boolean = false

   const addTag = (event: any) => {
      event.preventDefault()
      if (event.key === ',') {
         let tag = event.target.value
         article.tags = [
            tag.substring(0, tag.length - 1).trim(),
            ...article.tags
         ]
         event.target.value = ''
      }
   }

   function deleteTag(tag: any) {
      article.tags = article.tags.filter((val: any) => val !== tag)
   }

   const handleSave = async () => {}

   const handleSubmit = async () => {
      submitButtonDisabled = true
      article.published = published === 'Yes'
      article.highlighted = highlighted === 'Yes'
      let id = article._id
      delete article._id

      const updatedArticle: ArticleRequest = article
      const response = await fetch(`/data/articles/api?id=${id}`, {
         method: 'PUT',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(updatedArticle)
      })
      if (response.ok) {
         const responseData = await response.json()
         await goto('/data/articles/list')
      }
   }
</script>

<form>
   <div class="form-grid">
      <div class="left">
         <div class="title-bar">
            <h3>Create a new Article</h3>
            <div class="button-group">
               <button on:click={handleSave} disabled>Save</button>
               <button
                  disabled={submitButtonDisabled}
                  type="submit"
                  on:click|preventDefault={handleSubmit}>Update Article</button
               >
            </div>
         </div>
         <div class="spacer-small"></div>
         <div class="field">
            <label for="title">Title</label>
            <input
               id="title"
               name="title"
               type="text"
               bind:value={article.title}
            />
         </div>

         <div class="field">
            <label for="summary">Summary</label>
            <textarea id="summary" name="summary" bind:value={article.summary}
            ></textarea>
         </div>
         <div class="field">
            <label for="category">Category</label>
            <select id="category" name="category" bind:value={article.category}>
               {#each categories as category}
                  <option value={category}>{category}</option>
               {/each}
            </select>
         </div>

         <div class="field">
            <label for="state">State</label>
            <select id="state" name="state" bind:value={article.state}>
               {#each states as state}
                  <option value={state}>{state}</option>
               {/each}
            </select>
         </div>

         <div class="field">
            <label for="add-tag">Tags</label>

            <input type="text" on:keyup={(event) => addTag(event)} />
            <div class="existing-tags">
               {#each article.tags as tag}
                  <span class="tag">{tag}</span>
                  <span class="delete-tag" on:click={() => deleteTag(tag)}
                     >x</span
                  >
               {/each}
            </div>
         </div>

         <div class="field">
            <label for="image-url">Cover Image URL</label>
            <input
               id="image-url"
               name="image-url"
               bind:value={article.coverImageUrl}
               type="url"
               placeholder="Image URL"
            />
         </div>
         <div class="field">
            <label for="published">Published?</label>
            <input
               type="radio"
               id="published"
               name="published"
               bind:group={published}
               value="Yes"
            /><span>Yes</span>
            <input
               type="radio"
               id="published"
               name="published"
               bind:group={published}
               value="No"
               checked
            /><span>No</span>
         </div>

         <div class="field">
            <label for="highlighted">Highlighted?</label>
            <input
               type="radio"
               id="highlighted"
               name="highlighted"
               bind:group={highlighted}
               value="Yes"
            /><span>Yes</span>
            <input
               type="radio"
               id="highlighted"
               name="highlighted"
               bind:group={highlighted}
               value="No"
               checked
            /><span>No</span>
         </div>

         <div class="field">
            <label for="" class="label">Float (0 - 0.99)</label>
            <input
               type="number"
               name="float"
               step="0.01"
               max="0.99"
               min="0"
               class="input"
               bind:value={article.float}
               required
            />
         </div>
         <div class="field"></div>
      </div>
      <div class="right">
         <div class="field">
            <textarea
               id="content"
               name="content"
               bind:value={article.content}
               placeholder="Drafting..."
               required
            ></textarea>
         </div>
      </div>
   </div>
</form>
