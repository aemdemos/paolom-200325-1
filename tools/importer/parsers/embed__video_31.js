export default function parse(element, { document }) {
    // Validate element and document
    if (!element || !document) {
        throw new Error('Invalid input: element and document are required');
    }

    // Extract relevant information dynamically from the element
    const imageElement = element.querySelector('img');
    const image = imageElement ? imageElement.cloneNode(true) : null;

    const linkElement = element.querySelector('a[href]');
    const link = linkElement ? document.createElement('a') : null;
    
    if (link) {
        link.href = linkElement.href;
        link.textContent = linkElement.href;
    }

    // Verify the extracted elements are properly handled
    const contentCell = [];
    if (image) contentCell.push(image);
    if (link) contentCell.push(link);

    // Ensure the table structure conforms to the example
    const headerRow = [document.createElement('strong')];
    headerRow[0].textContent = 'Embed';

    const contentRow = [contentCell];

    if (contentRow.length === 0) {
        throw new Error('No content extracted from element');
    }

    const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

    // Replace the original element
    element.replaceWith(table);
}