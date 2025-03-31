export default function parse(element, { document }) {
    // Helper function to extract text content
    const extractText = (el) => el ? el.textContent.trim() : '';

    // Extract relevant content
    const subtitle = extractText(element.querySelector('h4.hero-header-subtitle'));
    const title = extractText(element.querySelector('h1.hero-header-title'));

    // Create a table structure
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Table (no header)';
    const headerRow = [headerCell];

    const cells = [
        headerRow,            // Header row (denoting block type, bolded)
        [subtitle],           // Row for subtitle
        [title]               // Row for title
    ];

    // Create the block table
    const block = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the new block
    element.replaceWith(block);
}