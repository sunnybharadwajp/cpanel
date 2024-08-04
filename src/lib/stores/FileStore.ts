import { writable } from 'svelte/store';
import type { FileInterface } from "$db/models/File";

export let filesStore = writable<FileInterface[]>([]);
