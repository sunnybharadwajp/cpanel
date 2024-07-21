import { start_mongo } from "$db/mongo";

start_mongo().then(() => {
    console.log("MongoDB Started");
}).catch(e => console.error(e));