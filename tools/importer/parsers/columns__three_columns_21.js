export default function parse(element, { document }) {
    // Create header row
    const headerRow = ['Columns'];

    // Extract relevant content from the input element
    const paragraphs = element.querySelectorAll('p');
    const images = element.querySelectorAll('img');
    const headers = element.querySelectorAll('h3 strong');

    // Organize content into table cells
    const contentRow = [];

    // First column content
    const column1 = [headers[0], paragraphs[3], images[0]];
    contentRow.push(column1);

    // Second column content
    const column2 = [paragraphs[0], paragraphs[1]];
    contentRow.push(column2);

    // Third column content
    const column3 = [paragraphs[2]];
    contentRow.push(column3);

    // Combine into table structure
    const tableData = [headerRow, contentRow];

    const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

    // Replace the original element with the new block table
    element.replaceWith(blockTable);
}