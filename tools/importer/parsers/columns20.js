export default function parse(element, { document }) {
    // Extract content dynamically from the input element
    const paragraphs = Array.from(element.querySelectorAll('p')).filter(p => p.textContent.trim());
    const img = element.querySelector('img');
    const link = element.querySelector('a');

    // Ensure proper handling of edge cases (missing data)
    const column1Content = paragraphs.map(p => {
        const para = document.createElement('p');
        para.textContent = p.textContent.trim();
        return para;
    });

    const column2Content = [];
    if (img) {
        column2Content.push(img);
    }
    if (link) {
        column2Content.push(link);
    }

    // Create header row matching example structure
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Columns';
    const headerRow = [headerCell];

    // Create table structure
    const cells = [
        headerRow,
        [column1Content, column2Content],
    ];

    // Create block table
    const block = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the new block table
    element.replaceWith(block);
}