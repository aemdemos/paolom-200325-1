export default function parse(element, { document }) {
  // Helper to create elements with text content
  const createElementWithText = (tagName, text) => {
    const el = document.createElement(tagName);
    el.textContent = text;
    return el;
  };

  // Create header row with exact match
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns';
  const headerRow = [headerCell];

  // Extract content dynamically
  const sections = element.querySelectorAll('h3');
  const paragraphs = element.querySelectorAll('p');

  // Combine headings and content into side-by-side columns
  const columnCells = [
    createElementWithText('h3', sections[0]?.textContent?.trim() || ''),
    createElementWithText('p', paragraphs[0]?.textContent?.trim() || ''),
    createElementWithText('h3', sections[1]?.textContent?.trim() || ''),
    createElementWithText('p', paragraphs[2]?.textContent?.trim() || ''),
    createElementWithText('h3', sections[2]?.textContent?.trim() || ''),
    createElementWithText('p', paragraphs[4]?.textContent?.trim() || ''),
  ];

  const tableData = [headerRow, columnCells];
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(block);
}