// Function to convert markdown to HTML
export function markdownToHtml(markdown: string): string {
    // Convert headers
    markdown = markdown.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    markdown = markdown.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    markdown = markdown.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Convert bold text
    markdown = markdown.replace(/\*\*(.*)\*\*/gim, '<b>$1</b>');

    // Convert images
    markdown = markdown.replace(/!\[(.*?)\]\((.*?)\)/gim, '<img alt="$1" src="$2" />');

    // Convert links
    markdown = markdown.replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2">$1</a>');

    // Convert tables
    markdown = markdown.replace(/^\|(.+)\|\s*\n\|(?:\s*:?-+:?\s*\|)+\s*\n((?:\|.*\|.*\n?)*)/gim, (match, headerRow, bodyRows) => {
        const headerHtml = headerRow.split('|').map((header: string) => `<th>${header.trim()}</th>`).join('');
        const bodyHtml = bodyRows.trim().split('\n').map((row: string) => {
            return '<tr>' + row.split('|').map((cell: string) => `<td>${cell.trim()}</td>`).join('') + '</tr>';
        }).join('');
        return `<table><thead><tr>${headerHtml}</tr></thead><tbody>${bodyHtml}</tbody></table>`;
    });

    // Convert paragraphs
    markdown = markdown.replace(/^\s*(\n)?(.+?)(\n|$)/gim, (match, p1, p2) => {
        const trimmed = p2.trim();
        if (trimmed.startsWith('<h') || trimmed.startsWith('<img') || trimmed.startsWith('<table') || trimmed.startsWith('<b') || trimmed.startsWith('<a')) {
            return trimmed;
        }
        return `<p>${trimmed}</p>`;
    });

    return markdown.trim();
}
