<script lang="ts">
   import { createEventDispatcher } from 'svelte'
   const dispatch = createEventDispatcher()

   let fileForm: HTMLFormElement, fileInput: HTMLInputElement

   import { FileType } from '$db/models/File'
   let fileTypes = Object.keys(FileType)

   let fileSize: number

   import { writable } from 'svelte/store'
   let submitButtonDisabled = writable(true)

   const uploadFile = async () => {
      submitButtonDisabled.set(true)
      let formData = new FormData(fileForm)
      formData.append('file-size', `${fileSize}`)

      try {
         await fetch(fileForm.action, {
            method: 'POST',
            body: formData
         })
         dispatch('fileUploaded')
      } catch (err) {
         console.log(err)
      }
   }

   const handleFileSelect = () => {
      submitButtonDisabled.set(false)

      if (fileInput.files) {
         const file = fileInput.files[0]
         fileSize = Math.round(file.size / 1000)
         console.log(new FormData(fileForm))
      }
   }
</script>

<form
   on:submit|preventDefault={uploadFile}
   method="POST"
   enctype="multipart/form-data"
   action="/api/files"
   bind:this={fileForm}
>
   <div>
      <div class="field">
         <input
            type="file"
            name="file"
            on:change={handleFileSelect}
            bind:this={fileInput}
         />
      </div>
      <div class="field">
         <input type="text" name="title" placeholder="Title" />
      </div>
      <div class="field">
         <input type="text" name="title" placeholder="Comment" />
      </div>
      <div class="field">
         <select name="" id="">
            {#each fileTypes as fileType}
               <option value={fileType}>{fileType}</option>
            {/each}
         </select>
      </div>
   </div>

   <button disabled={$submitButtonDisabled} type="submit">Upload</button>
</form>

<style>
</style>
