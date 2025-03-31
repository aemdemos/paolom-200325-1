export default function parse(element, { document }) {
    // Extract relevant content
    const paragraphs = Array.from(element.querySelectorAll('p')).filter(p => p.textContent.trim() !== '');
    const image = element.querySelector('img');

    // Create rows for the table
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Columns';
    const headerRow = [headerCell];

    const firstColumnContent = document.createElement('div');
    paragraphs.slice(0, 4).forEach(p => firstColumnContent.appendChild(p.cloneNode(true)));

    const secondColumnContent = document.createElement('div');
    if (image) {
        const clonedImage = image.cloneNode(true);
        secondColumnContent.appendChild(clonedImage);
    }
    paragraphs.slice(4).forEach(p => secondColumnContent.appendChild(p.cloneNode(true)));

    // Ensure no duplication of content
    secondColumnContent.querySelectorAll('img').forEach((img, index) => {
        if (index > 0) {
            img.remove();
        }
    });

    // Build the table structure
    const cells = [
        headerRow,
        [firstColumnContent, secondColumnContent]
    ];

    const blockTable = WebImporter.DOMUtils.createTable(cells, document);

    // Replace original element
    element.replaceWith(blockTable);
}