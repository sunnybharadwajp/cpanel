export function slugify(title: string) {
    return title
        .toLowerCase()                        // Convert to lowercase
        .trim()                               // Trim whitespace from both ends
        .replace(/[^a-z0-9 -]/g, '')          // Remove non-alphanumeric characters (except spaces and hyphens)
        .replace(/\s+/g, '-')                 // Replace spaces with hyphens
        .replace(/-+/g, '-');                 // Replace multiple hyphens with a single hyphen
}


export function getDayTime(dateObj: Date){
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = months[dateObj.getMonth()];
    const date = dateObj.getDate();
    const year = dateObj.getFullYear();
    const hour = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    // Pad the minute with a leading zero if needed
    const paddedMinutes = minutes < 10 ? "0" + minutes : minutes;
    // Return the formatted string
    return {
        month,
        date,
        hour,
        minutes: paddedMinutes,
        day: `${month} ${date}`,
        time: `${hour}:${paddedMinutes}`,
        fullIST: `${month} ${date}, ${year} - ${hour}:${paddedMinutes} IST`,
        dateObj: dateObj,
    };
}
