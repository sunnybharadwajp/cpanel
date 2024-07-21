import {writable} from "svelte/store";
import type {Article} from "$lib/types";


export let Articles = writable([]);

