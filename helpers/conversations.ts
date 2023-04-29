
export function newConversationName() {
    const date = new Date();
    const name = date
        .toDateString()
        .replace(/\s/g, "") +
        "-" +
        date
            .toLocaleTimeString()
            .replace(":", "-")
            .replace(/\s/g, "")
            .replace(":", "-")
            .replace(/\s/g, "");
    return name
}
