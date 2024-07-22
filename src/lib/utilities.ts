export function slugify(title: string) {
    return title
        .toLowerCase()                        // Convert to lowercase
        .trim()                               // Trim whitespace from both ends
        .replace(/[^a-z0-9 -]/g, '')          // Remove non-alphanumeric characters (except spaces and hyphens)
        .replace(/\s+/g, '-')                 // Replace spaces with hyphens
        .replace(/-+/g, '-');                 // Replace multiple hyphens with a single hyphen
}