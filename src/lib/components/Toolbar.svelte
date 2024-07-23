<script>
    import { FileImage } from 'lucide-svelte';
</script>

<div class="tool-bar">
    <div class="tool-btn active">
        <FileImage size="24"/>
    </div>
</div>

<div class="side-bar">
    <div class="file-browser">
        
    </div>
    <div class="file-uploader">
        <input type="file">
    </div>
</div>


<style>
    .tool-bar {
        position: fixed;
        right: 0;
        top: 0;
        height: 100vh;
        width: 50px;
        background: #e4e4e4;
        z-index: 1000;
    }

    .side-bar {
        position: fixed;
        right: 0;
        top: 0;
        height: 100vh;
        width: 400px;
        background: #cccccc;
        z-index: 100;
    }

    .file-uploader {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 400px;
        background: #e4e4e4;
        padding: 0.7rem;
    }

    .tool-btn {
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .tool-btn:hover {
        cursor: pointer;
        background: #bfbfbf;
    }

    .tool-btn.active {
        background: #cccccc;
    }
</style>